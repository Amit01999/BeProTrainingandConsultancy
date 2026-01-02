import { z } from 'zod';

// Use Zod to define input schemas and TypeScript types compatible with MongoDB (string _id)

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'student']).optional().default('student'),
  fullName: z.string(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
});

export const insertCourseSchema = z.object({
  title: z.string(),
  titleBn: z.string().optional().nullable(),
  category: z.string(),
  level: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  fee: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  descriptionBn: z.string().optional().nullable(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

export const insertApplicationSchema = z.object({
  userId: z.string().optional().nullable(),
  courseId: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email().optional().nullable(),
});

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

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
  title: string;
  titleBn?: string | null;
  category: string;
  level?: string | null;
  duration?: string | null;
  fee?: string | null;
  description?: string | null;
  descriptionBn?: string | null;
  features?: string[];
  isFeatured?: boolean;
  createdAt: string;
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

// Request Types
export type CreateCourseRequest = InsertCourse;
export type UpdateCourseRequest = Partial<InsertCourse> & {
  isFeatured?: boolean;
};
export type UpdateApplicationStatusRequest = {
  status: 'pending' | 'approved' | 'rejected';
};
