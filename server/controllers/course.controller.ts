import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { storage } from '../storage';
import { insertCourseSchema } from '@shared/schema';
import { uploadBufferToCloudinary } from '../utils/cloudinary';

function handleZodError(err: unknown, res: Response): boolean {
  if (err instanceof z.ZodError) {
    const first = err.errors[0];
    res.status(400).json({
      message: first?.message ?? 'Validation failed',
      field: first?.path.join('.'),
    });
    return true;
  }
  return false;
}

export async function listCourses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const category = (req.query.category as string | undefined) || undefined;
    const courses = await storage.getCourses(category);
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

export async function getCourseBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // route param is `:slug` but we tolerate ObjectId for back-compat
    const slugOrId = req.params.slug || req.params.id;
    const course = await storage.getCourseBySlugOrId(slugOrId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
}

export async function createCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = insertCourseSchema.parse(req.body);
    const course = await storage.createCourse(input);
    res.status(201).json(course);
  } catch (err) {
    if (handleZodError(err, res)) return;
    next(err);
  }
}

export async function updateCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = insertCourseSchema.partial().parse(req.body);
    const course = await storage.updateCourse(req.params.id, input);
    res.json(course);
  } catch (err) {
    if (handleZodError(err, res)) return;
    if (err instanceof Error && err.message === 'Course not found') {
      return res.status(404).json({ message: 'Course not found' });
    }
    next(err);
  }
}

export async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await storage.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function uploadCourseImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    const result = await uploadBufferToCloudinary(req.file.buffer);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
