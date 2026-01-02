import {
  UserModel,
  CourseModel,
  ApplicationModel,
  ContactModel,
} from './models';
import type {
  User,
  InsertUser,
  Course,
  InsertCourse,
  UpdateCourseRequest,
  Application,
  InsertApplication,
  UpdateApplicationStatusRequest,
  Contact,
  InsertContact,
} from '@shared/schema';

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Course operations
  getCourses(category?: string): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
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
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
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
    const filter: any = {};
    if (category) filter.category = category;
    const courses = await CourseModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    return courses.map(c => ({
      _id: String(c._id),
      id: String(c._id),
      title: c.title,
      titleBn: c.titleBn ?? null,
      category: c.category,
      level: c.level ?? null,
      duration: c.duration ?? null,
      fee: c.fee ?? null,
      description: c.description ?? null,
      descriptionBn: c.descriptionBn ?? null,
      features: c.features ?? [],
      isFeatured: c.isFeatured ?? false,
      createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
    }));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const c = await CourseModel.findById(id).lean();
    if (!c) return undefined;
    return {
      _id: String(c._id),
      id: String(c._id),
      title: c.title,
      titleBn: c.titleBn ?? null,
      category: c.category,
      level: c.level ?? null,
      duration: c.duration ?? null,
      fee: c.fee ?? null,
      description: c.description ?? null,
      descriptionBn: c.descriptionBn ?? null,
      features: c.features ?? [],
      isFeatured: c.isFeatured ?? false,
      createdAt: c.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const created = await CourseModel.create(insertCourse as any);
    return {
      _id: String(created._id),
      id: String(created._id),
      title: created.title,
      titleBn: created.titleBn ?? null,
      category: created.category,
      level: created.level ?? null,
      duration: created.duration ?? null,
      fee: created.fee ?? null,
      description: created.description ?? null,
      descriptionBn: created.descriptionBn ?? null,
      features: created.features ?? [],
      isFeatured: created.isFeatured ?? false,
      createdAt: created.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async updateCourse(
    id: string,
    updates: UpdateCourseRequest
  ): Promise<Course> {
    const updated = await CourseModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean();
    if (!updated) throw new Error('Course not found');
    return {
      _id: String(updated._id),
      id: String(updated._id),
      title: updated.title,
      titleBn: updated.titleBn ?? null,
      category: updated.category,
      level: updated.level ?? null,
      duration: updated.duration ?? null,
      fee: updated.fee ?? null,
      description: updated.description ?? null,
      descriptionBn: updated.descriptionBn ?? null,
      features: updated.features ?? [],
      isFeatured: updated.isFeatured ?? false,
      createdAt: updated.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async deleteCourse(id: string): Promise<void> {
    await CourseModel.findByIdAndDelete(id);
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
      course: {
        _id: String(a.courseId._id),
        id: String(a.courseId._id),
        title: a.courseId.title,
        category: a.courseId.category,
        level: a.courseId.level ?? null,
        duration: a.courseId.duration ?? null,
        fee: a.courseId.fee ?? null,
        description: a.courseId.description ?? null,
        isFeatured: a.courseId.isFeatured ?? false,
        createdAt:
          a.courseId.createdAt?.toISOString() ?? new Date().toISOString(),
      },
      user: a.userId ? {
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
      } : undefined,
    }));
  }

  async getUserApplications(
    userId: string
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
      course: {
        _id: String(a.courseId._id),
        title: a.courseId.title,
        category: a.courseId.category,
        level: a.courseId.level ?? null,
        duration: a.courseId.duration ?? null,
        fee: a.courseId.fee ?? null,
        description: a.courseId.description ?? null,
        isFeatured: a.courseId.isFeatured ?? false,
        createdAt:
          a.courseId.createdAt?.toISOString() ?? new Date().toISOString(),
      },
    }));
  }

  async updateApplicationStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ): Promise<Application> {
    const updated = await ApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
}

export const storage = new DatabaseStorage();
