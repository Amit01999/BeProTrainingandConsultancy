import { Types } from 'mongoose';
import {
  UserModel,
  CourseModel,
  ApplicationModel,
  ContactModel,
  EnrollmentModel,
  type ICourse,
} from './models';
import type {
  User,
  InsertUser,
  Course,
  InsertCourse,
  UpdateCourseRequest,
  Application,
  InsertApplication,
  Contact,
  InsertContact,
  Enrollment,
  EnrollmentStatus,
  EnrollmentWithRefs,
  SubmitPayment,
} from '@shared/schema';
import { generateUniqueCourseSlug, toSlug } from './utils/slug';
import { deleteFromCloudinary } from './utils/cloudinary';

function isValidObjectId(value: string): boolean {
  return Types.ObjectId.isValid(value) && /^[a-f\d]{24}$/i.test(value);
}

function mapEnrollment(e: any): Enrollment {
  return {
    _id: String(e._id),
    id: String(e._id),
    userId:
      e.userId && typeof e.userId === 'object' && '_id' in e.userId
        ? String(e.userId._id)
        : String(e.userId),
    courseId:
      e.courseId && typeof e.courseId === 'object' && '_id' in e.courseId
        ? String(e.courseId._id)
        : String(e.courseId),
    transactionId: e.transactionId ?? null,
    senderNumber: e.senderNumber ?? null,
    amount: typeof e.amount === 'number' ? e.amount : null,
    screenshotUrl: e.screenshotUrl ?? null,
    screenshotPublicId: e.screenshotPublicId ?? null,
    status: e.status,
    notes: e.notes ?? null,
    paidAt: e.paidAt ? new Date(e.paidAt).toISOString() : null,
    verifiedAt: e.verifiedAt ? new Date(e.verifiedAt).toISOString() : null,
    verifiedBy: e.verifiedBy ? String(e.verifiedBy) : null,
    createdAt: e.createdAt
      ? new Date(e.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: e.updatedAt ? new Date(e.updatedAt).toISOString() : undefined,
  };
}

function mapEnrollmentWithRefs(e: any): EnrollmentWithRefs {
  const base = mapEnrollment(e);
  const courseDoc = e.courseId && typeof e.courseId === 'object' ? e.courseId : null;
  const userDoc = e.userId && typeof e.userId === 'object' ? e.userId : null;

  return {
    ...base,
    course: courseDoc ? mapCourse(courseDoc) : ({} as Course),
    user: userDoc
      ? {
          _id: String(userDoc._id),
          id: String(userDoc._id),
          username: userDoc.username,
          fullName: userDoc.fullName,
          email: userDoc.email ?? null,
          phone: userDoc.phone ?? null,
        }
      : ({} as EnrollmentWithRefs['user']),
  };
}

function mapCourse(c: ICourse & { _id: unknown; createdAt?: Date; updatedAt?: Date }): Course {
  return {
    _id: String(c._id),
    id: String(c._id),
    slug: c.slug,
    title: c.title,
    titleBn: c.titleBn ?? null,
    category: c.category,
    programTags: c.programTags ?? [],
    level: c.level ?? null,
    duration: c.duration ?? null,
    fee: c.fee ?? null,
    originalPrice: c.originalPrice ?? 0,
    discountedPrice: c.discountedPrice ?? 0,
    description: c.description ?? null,
    descriptionBn: c.descriptionBn ?? null,
    imageUrl: c.imageUrl ?? null,
    imagePublicId: c.imagePublicId ?? null,
    gradientFrom: c.gradientFrom ?? null,
    gradientTo: c.gradientTo ?? null,
    icon: c.icon ?? null,
    features: c.features ?? [],
    details: c.details ?? [],
    isFeatured: c.isFeatured ?? false,
    createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: c.updatedAt?.toISOString(),
  };
}

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Course operations
  getCourses(category?: string): Promise<Course[]>;
  getCourseBySlugOrId(slugOrId: string): Promise<Course | undefined>;
  getCourseById(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, updates: UpdateCourseRequest): Promise<Course>;
  deleteCourse(id: string): Promise<void>;

  // Application operations
  createApplication(app: InsertApplication): Promise<Application>;
  getApplications(): Promise<(Application & { course: Course; user?: User })[]>;
  getUserApplications(
    userId: string
  ): Promise<(Application & { course: Course })[]>;
  updateApplicationStatus(id: string, status: string): Promise<Application>;

  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;

  // Enrollment operations
  // Idempotent: creates an `initiated` record, or returns the existing one.
  initiateEnrollment(
    userId: string,
    courseId: string,
  ): Promise<{ enrollment: Enrollment; created: boolean }>;
  findEnrollmentByUserCourse(
    userId: string,
    courseId: string,
  ): Promise<Enrollment | undefined>;
  submitEnrollmentPayment(
    id: string,
    userId: string,
    data: SubmitPayment,
  ): Promise<Enrollment>;
  getUserEnrollments(
    userId: string,
    status?: EnrollmentStatus,
  ): Promise<EnrollmentWithRefs[]>;
  getEnrollments(status?: EnrollmentStatus): Promise<EnrollmentWithRefs[]>;
  getEnrollment(id: string): Promise<EnrollmentWithRefs | undefined>;
  updateEnrollmentStatus(
    id: string,
    status: EnrollmentStatus,
    verifiedBy?: string,
    notes?: string,
  ): Promise<EnrollmentWithRefs>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    // Tolerate stale/invalid session ids — passport's deserializeUser must
    // never surface a CastError to the request pipeline.
    if (!id || !isValidObjectId(id)) return undefined;
    const user = await UserModel.findById(id).lean();
    if (!user) return undefined;
    return {
      _id: String(user._id),
      id: String(user._id),
      username: user.username,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      email: user.email ?? null,
      phone: user.phone ?? null,
      createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ username }).lean();
    if (!user) return undefined;
    return {
      _id: String(user._id),
      id: String(user._id),
      username: user.username,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      email: user.email ?? null,
      phone: user.phone ?? null,
      createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const created = await UserModel.create(insertUser as any);
    return {
      _id: String(created._id),
      id: String(created._id),
      username: created.username,
      password: created.password,
      role: created.role,
      fullName: created.fullName,
      email: created.email ?? null,
      phone: created.phone ?? null,
      createdAt: created.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async getCourses(category?: string): Promise<Course[]> {
    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    const courses = await CourseModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    return courses.map(mapCourse as any);
  }

  async getCourseBySlugOrId(slugOrId: string): Promise<Course | undefined> {
    // Prefer slug lookup; fall back to ObjectId for backwards compatibility
    let c = await CourseModel.findOne({ slug: slugOrId }).lean();
    if (!c && isValidObjectId(slugOrId)) {
      c = await CourseModel.findById(slugOrId).lean();
    }
    if (!c) return undefined;
    return mapCourse(c as any);
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    if (!isValidObjectId(id)) return undefined;
    const c = await CourseModel.findById(id).lean();
    if (!c) return undefined;
    return mapCourse(c as any);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const slug =
      insertCourse.slug && insertCourse.slug.trim().length > 0
        ? await generateUniqueCourseSlug(toSlug(insertCourse.slug))
        : await generateUniqueCourseSlug(insertCourse.title);

    const created = await CourseModel.create({ ...insertCourse, slug });
    return mapCourse(created.toObject() as any);
  }

  async updateCourse(
    id: string,
    updates: UpdateCourseRequest,
  ): Promise<Course> {
    if (!isValidObjectId(id)) throw new Error('Course not found');

    // Capture old image public id before applying updates (used on image swap)
    const existing = await CourseModel.findById(id).lean();
    if (!existing) throw new Error('Course not found');

    const patch: Record<string, unknown> = { ...updates };

    // Regenerate slug when an explicit slug is provided OR title changes and no slug given
    if (updates.slug) {
      patch.slug = await generateUniqueCourseSlug(toSlug(updates.slug), id);
    } else if (updates.title && updates.title !== existing.title) {
      patch.slug = await generateUniqueCourseSlug(updates.title, id);
    }

    const updated = await CourseModel.findByIdAndUpdate(id, patch, {
      new: true,
    }).lean();
    if (!updated) throw new Error('Course not found');

    // If imageUrl changed, best-effort delete the previous Cloudinary asset
    if (
      existing.imagePublicId &&
      updates.imageUrl &&
      updates.imageUrl !== existing.imageUrl
    ) {
      await deleteFromCloudinary(existing.imagePublicId);
    }

    return mapCourse(updated as any);
  }

  async deleteCourse(id: string): Promise<void> {
    if (!isValidObjectId(id)) return;
    const doc = await CourseModel.findByIdAndDelete(id).lean();
    if (doc?.imagePublicId) {
      await deleteFromCloudinary(doc.imagePublicId);
    }
  }

  async createApplication(insertApp: InsertApplication): Promise<Application> {
    const created = await ApplicationModel.create(insertApp as any);
    return {
      _id: String(created._id),
      id: String(created._id),
      userId: created.userId ? String(created.userId) : null,
      courseId: String(created.courseId),
      fullName: created.fullName,
      phone: created.phone,
      email: created.email ?? null,
      status: created.status as any,
      appliedAt: created.appliedAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async getApplications(): Promise<
    (Application & { course: Course; user?: User })[]
  > {
    const apps = await ApplicationModel.find()
      .populate('courseId')
      .populate('userId')
      .sort({ appliedAt: -1 })
      .lean();
    return apps.map((a: any) => ({
      _id: String(a._id),
      id: String(a._id),
      userId: a.userId ? String(a.userId._id) : null,
      courseId: String(a.courseId._id),
      fullName: a.fullName,
      phone: a.phone,
      email: a.email ?? null,
      status: a.status,
      appliedAt: a.appliedAt?.toISOString() ?? new Date().toISOString(),
      course: mapCourse(a.courseId),
      user: a.userId
        ? {
            _id: String(a.userId._id),
            id: String(a.userId._id),
            username: a.userId.username,
            password: a.userId.password,
            role: a.userId.role,
            fullName: a.userId.fullName,
            email: a.userId.email ?? null,
            phone: a.userId.phone ?? null,
            createdAt:
              a.userId.createdAt?.toISOString() ?? new Date().toISOString(),
          }
        : undefined,
    }));
  }

  async getUserApplications(
    userId: string,
  ): Promise<(Application & { course: Course })[]> {
    const apps = await ApplicationModel.find({ userId })
      .populate('courseId')
      .sort({ appliedAt: -1 })
      .lean();
    return apps.map((a: any) => ({
      _id: String(a._id),
      userId: String(a.userId),
      courseId: String(a.courseId._id),
      fullName: a.fullName,
      phone: a.phone,
      email: a.email ?? null,
      status: a.status,
      appliedAt: a.appliedAt?.toISOString() ?? new Date().toISOString(),
      course: mapCourse(a.courseId),
    }));
  }

  async updateApplicationStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected',
  ): Promise<Application> {
    const updated = await ApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).lean();
    if (!updated) throw new Error('Application not found');
    return {
      _id: String(updated._id),
      userId: updated.userId ? String(updated.userId) : null,
      courseId: String(updated.courseId),
      fullName: updated.fullName,
      phone: updated.phone,
      email: updated.email ?? null,
      status: updated.status as any,
      appliedAt: updated.appliedAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const created = await ContactModel.create(insertContact as any);
    return {
      _id: String(created._id),
      id: String(created._id),
      name: created.name,
      email: created.email,
      phone: created.phone ?? null,
      message: created.message,
      createdAt: created.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  // ─── Enrollments ──────────────────────────────────────────────────────
  async initiateEnrollment(
    userId: string,
    courseId: string,
  ): Promise<{ enrollment: Enrollment; created: boolean }> {
    if (!isValidObjectId(userId)) throw new Error('Invalid user id');
    if (!isValidObjectId(courseId)) throw new Error('Invalid course id');

    // Upsert against the (user, course) unique index. If a record already
    // exists, it is returned untouched — whatever status it's in.
    const existing = await EnrollmentModel.findOne({ userId, courseId }).lean();
    if (existing) return { enrollment: mapEnrollment(existing), created: false };

    const created = await EnrollmentModel.create({
      userId,
      courseId,
      status: 'initiated',
    });
    return { enrollment: mapEnrollment(created.toObject()), created: true };
  }

  async findEnrollmentByUserCourse(
    userId: string,
    courseId: string,
  ): Promise<Enrollment | undefined> {
    if (!isValidObjectId(userId) || !isValidObjectId(courseId)) return undefined;
    const doc = await EnrollmentModel.findOne({ userId, courseId }).lean();
    return doc ? mapEnrollment(doc) : undefined;
  }

  async submitEnrollmentPayment(
    id: string,
    userId: string,
    data: SubmitPayment,
  ): Promise<Enrollment> {
    if (!isValidObjectId(id)) throw new Error('Enrollment not found');
    if (!isValidObjectId(userId)) throw new Error('Enrollment not found');

    const doc = await EnrollmentModel.findById(id);
    if (!doc) throw new Error('Enrollment not found');
    if (String(doc.userId) !== String(userId)) {
      throw new Error('Forbidden');
    }
    // Only transition from initiated or rejected. Block if already pending or
    // already verified (no-op or replay).
    if (doc.status === 'verified') {
      throw new Error('Enrollment already verified');
    }
    if (doc.status === 'pending') {
      throw new Error('Payment already submitted — awaiting review');
    }

    doc.transactionId = data.transactionId.trim();
    doc.senderNumber = data.senderNumber.trim();
    if (typeof data.amount === 'number') doc.amount = data.amount;
    if (data.screenshotUrl) doc.screenshotUrl = data.screenshotUrl;
    if (data.screenshotPublicId) doc.screenshotPublicId = data.screenshotPublicId;
    if (data.notes) doc.notes = data.notes;
    doc.status = 'pending';
    doc.paidAt = new Date();
    // Clear any prior admin verdict fields if this is a retry from rejected.
    doc.verifiedAt = null;
    doc.verifiedBy = null;
    await doc.save();

    return mapEnrollment(doc.toObject());
  }

  async getUserEnrollments(
    userId: string,
    status?: EnrollmentStatus,
  ): Promise<EnrollmentWithRefs[]> {
    if (!isValidObjectId(userId)) return [];
    const filter: Record<string, unknown> = { userId };
    if (status) filter.status = status;
    const docs = await EnrollmentModel.find(filter)
      .populate('courseId')
      .populate('userId')
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(mapEnrollmentWithRefs);
  }

  async getEnrollments(
    status?: EnrollmentStatus,
  ): Promise<EnrollmentWithRefs[]> {
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    const docs = await EnrollmentModel.find(filter)
      .populate('courseId')
      .populate('userId')
      .sort({ createdAt: -1 })
      .lean();
    return docs.map(mapEnrollmentWithRefs);
  }

  async getEnrollment(id: string): Promise<EnrollmentWithRefs | undefined> {
    if (!isValidObjectId(id)) return undefined;
    const doc = await EnrollmentModel.findById(id)
      .populate('courseId')
      .populate('userId')
      .lean();
    return doc ? mapEnrollmentWithRefs(doc) : undefined;
  }

  async updateEnrollmentStatus(
    id: string,
    status: EnrollmentStatus,
    verifiedBy?: string,
    notes?: string,
  ): Promise<EnrollmentWithRefs> {
    if (!isValidObjectId(id)) throw new Error('Enrollment not found');
    const patch: Record<string, unknown> = {
      status,
      verifiedAt: status === 'pending' ? null : new Date(),
    };
    if (verifiedBy && isValidObjectId(verifiedBy)) patch.verifiedBy = verifiedBy;
    if (typeof notes === 'string') patch.notes = notes;

    const updated = await EnrollmentModel.findByIdAndUpdate(id, patch, {
      new: true,
    })
      .populate('courseId')
      .populate('userId')
      .lean();
    if (!updated) throw new Error('Enrollment not found');
    return mapEnrollmentWithRefs(updated);
  }
}

export const storage = new DatabaseStorage();
