import { z } from 'zod';

// Zod input schemas + TypeScript types compatible with MongoDB (string _id).

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'student']).optional().default('student'),
  fullName: z.string(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export const courseDetailSectionSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  content: z.array(z.string()).default([]),
});

export const insertCourseSchema = z.object({
  // slug is optional on input — backend auto-generates from title when missing
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, digits, and hyphens only')
    .optional(),
  title: z.string().min(1, 'Title is required'),
  titleBn: z.string().optional().nullable(),
  category: z.string().min(1, 'Category is required'),
  programTags: z.array(z.string()).optional(),
  level: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  fee: z.string().optional().nullable(),
  originalPrice: z.coerce.number().min(0).optional(),
  discountedPrice: z.coerce.number().min(0).optional(),
  description: z.string().optional().nullable(),
  descriptionBn: z.string().optional().nullable(),
  imageUrl: z.string().url('Must be a valid URL').optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
  gradientFrom: z.string().optional().nullable(),
  gradientTo: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  features: z.array(z.string()).optional(),
  details: z.array(courseDetailSectionSchema).optional(),
  isFeatured: z.boolean().optional(),
});

export const insertApplicationSchema = z.object({
  userId: z.string().optional().nullable(),
  courseId: z.string(),
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email().optional().nullable(),
});

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string(),
});

export const enrollmentStatusSchema = z.enum([
  'initiated',
  'pending',
  'verified',
  'rejected',
]);

// Step 1 — user clicks Enroll, record intent. Idempotent per (user, course).
export const initiateEnrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course is required'),
});

// Step 2 — user submits bKash payment info against an existing enrollment.
export const submitPaymentSchema = z.object({
  transactionId: z
    .string()
    .min(3, 'Transaction ID is required')
    .max(64, 'Transaction ID is too long'),
  senderNumber: z
    .string()
    .min(6, 'Sender number is required')
    .max(20, 'Sender number is too long'),
  amount: z.coerce.number().min(0).optional(),
  screenshotUrl: z.string().url('Must be a valid URL').optional().nullable(),
  screenshotPublicId: z.string().optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

// Retained for back-compat — same shape as submit + courseId.
export const insertEnrollmentSchema = submitPaymentSchema.extend({
  courseId: z.string().min(1, 'Course is required'),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type CourseDetailSection = z.infer<typeof courseDetailSectionSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type InitiateEnrollment = z.infer<typeof initiateEnrollmentSchema>;
export type SubmitPayment = z.infer<typeof submitPaymentSchema>;
export type EnrollmentStatus = z.infer<typeof enrollmentStatusSchema>;

export type User = {
  _id: string;
  id?: string;
  username: string;
  password: string;
  role: 'admin' | 'student';
  fullName: string;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
};

export type Course = {
  _id: string;
  id?: string;
  slug: string;
  title: string;
  titleBn?: string | null;
  category: string;
  programTags?: string[];
  level?: string | null;
  duration?: string | null;
  fee?: string | null;
  originalPrice?: number;
  discountedPrice?: number;
  description?: string | null;
  descriptionBn?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  icon?: string | null;
  features?: string[];
  details?: CourseDetailSection[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type Application = {
  _id: string;
  id?: string;
  userId?: string | null;
  courseId: string;
  fullName: string;
  phone: string;
  email?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
};

export type Contact = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string;
};

export type Enrollment = {
  _id: string;
  id?: string;
  userId: string;
  courseId: string;
  transactionId?: string | null;
  senderNumber?: string | null;
  amount?: number | null;
  screenshotUrl?: string | null;
  screenshotPublicId?: string | null;
  status: EnrollmentStatus;
  notes?: string | null;
  paidAt?: string | null;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  createdAt: string;
  updatedAt?: string;
};

export type EnrollmentWithRefs = Enrollment & {
  course: Course;
  user: Pick<User, '_id' | 'id' | 'username' | 'fullName' | 'email' | 'phone'>;
};

// Request/response helper types
export type CreateCourseRequest = InsertCourse;
export type UpdateCourseRequest = Partial<InsertCourse>;
export type UpdateApplicationStatusRequest = {
  status: 'pending' | 'approved' | 'rejected';
};

export type UploadedImageResponse = {
  url: string;
  publicId: string;
};
