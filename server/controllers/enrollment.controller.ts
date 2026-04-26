import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { storage } from '../storage';
import {
  initiateEnrollmentSchema,
  submitPaymentSchema,
  enrollmentStatusSchema,
} from '@shared/schema';
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

function parseStatusQuery(q: unknown) {
  if (!q || typeof q !== 'string') return undefined;
  const result = enrollmentStatusSchema.safeParse(q);
  return result.success ? result.data : undefined;
}

function getUserId(req: Request): string | null {
  const user = req.user as any;
  const id = user?.id ?? user?._id;
  return id ? String(id) : null;
}

// POST /api/enrollments  — Step 1: record intent. Idempotent.
export async function createEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { courseId } = initiateEnrollmentSchema.parse(req.body);

    const course = await storage.getCourseById(courseId);
    if (!course) return res.status(400).json({ message: 'Course not found' });

    const { enrollment, created } = await storage.initiateEnrollment(
      userId,
      courseId,
    );
    res.status(created ? 201 : 200).json(enrollment);
  } catch (err) {
    if (handleZodError(err, res)) return;
    next(err);
  }
}

// PATCH /api/enrollments/:id/pay  — Step 2: attach bKash payment info.
export async function payEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const input = submitPaymentSchema.parse(req.body);
    const updated = await storage.submitEnrollmentPayment(
      req.params.id,
      userId,
      input,
    );
    res.json(updated);
  } catch (err) {
    if (handleZodError(err, res)) return;
    if (err instanceof Error) {
      if (err.message === 'Enrollment not found') {
        return res.status(404).json({ message: err.message });
      }
      if (err.message === 'Forbidden') {
        return res.status(403).json({ message: err.message });
      }
      if (
        err.message === 'Enrollment already verified' ||
        err.message === 'Payment already submitted — awaiting review'
      ) {
        return res.status(409).json({ message: err.message });
      }
    }
    next(err);
  }
}

export async function listMyEnrollments(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const status = parseStatusQuery(req.query.status);
    res.json(await storage.getUserEnrollments(userId, status));
  } catch (err) {
    next(err);
  }
}

export async function listEnrollments(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const status = parseStatusQuery(req.query.status);
    res.json(await storage.getEnrollments(status));
  } catch (err) {
    next(err);
  }
}

export async function verifyEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const adminId = getUserId(req) ?? undefined;
    const updated = await storage.updateEnrollmentStatus(
      req.params.id,
      'verified',
      adminId,
    );
    res.json(updated);
  } catch (err) {
    if (err instanceof Error && err.message === 'Enrollment not found') {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    next(err);
  }
}

export async function rejectEnrollment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const adminId = getUserId(req) ?? undefined;
    const notes = typeof req.body?.notes === 'string' ? req.body.notes : undefined;
    const updated = await storage.updateEnrollmentStatus(
      req.params.id,
      'rejected',
      adminId,
      notes,
    );
    res.json(updated);
  } catch (err) {
    if (err instanceof Error && err.message === 'Enrollment not found') {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    next(err);
  }
}

export async function uploadPaymentScreenshot(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    const result = await uploadBufferToCloudinary(
      req.file.buffer,
      'bepro/payments',
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
