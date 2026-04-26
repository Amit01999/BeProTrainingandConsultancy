import type { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { type Server } from 'http';
import { storage } from './storage';
import { api } from '@shared/routes';
import { setupAuth } from './auth';
import { z } from 'zod';
import {
  listCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadCourseImage,
} from './controllers/course.controller';
import {
  createEnrollment,
  payEnrollment,
  listMyEnrollments,
  listEnrollments,
  verifyEnrollment,
  rejectEnrollment,
  uploadPaymentScreenshot,
} from './controllers/enrollment.controller';
import { imageUpload } from './middleware/upload';
import { runSeed } from './seed-data';
import { isDbReady } from './db';

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated?.()) return res.status(401).send();
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated?.() || (req.user as any)?.role !== 'admin') {
    return res.status(401).send();
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  const crypto = await setupAuth(app);

  // ─── Readiness probe ────────────────────────────────────────────────────
  // Cheap, side-effect-free check used by the frontend (and any uptime probe)
  // to tell "server process is up" from "server is ready to serve API".
  app.get('/api/health', (_req, res) => {
    const ready = isDbReady();
    res.status(ready ? 200 : 503).json({
      status: ready ? 'ok' : 'starting',
      db: ready ? 'connected' : 'not-ready',
      uptime: process.uptime(),
    });
  });

  // If the DB is down mid-request, fail fast with 503 + Retry-After so the
  // client can back off gracefully instead of hanging on a Mongoose timeout.
  app.use('/api', (req, res, next) => {
    if (req.path === '/health') return next();
    if (isDbReady()) return next();
    res.set('Retry-After', '2');
    res.status(503).json({
      message: 'Service is starting up. Please retry in a moment.',
    });
  });

  // ─── Auth ───────────────────────────────────────────────────────────────
  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existing = await storage.getUserByUsername(req.body.username);
      if (existing) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await crypto.hash(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      req.login(user, err => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate('local', (err: any, user: any) => {
      if (err) return next(err);
      if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
      req.login(user, (err2: any) => {
        if (err2) return next(err2);
        res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout(() => res.status(200).send());
  });

  app.get(api.auth.me.path, (req, res) => {
    console.log('[/api/user] sessionID:', req.sessionID, '| isAuthenticated:', req.isAuthenticated(), '| user:', (req.user as any)?.username ?? null);
    if (!req.user) return res.status(401).send();
    res.json(req.user);
  });

  // ─── Courses ────────────────────────────────────────────────────────────
  // Order matters: static paths (upload-image) before dynamic (:slug) so they
  // are not swallowed by the slug matcher.
  app.get(api.courses.list.path, listCourses);
  app.post(
    api.courses.uploadImage.path,
    requireAdmin,
    imageUpload.single('image'),
    uploadCourseImage,
  );
  app.get(api.courses.get.path, getCourseBySlug);
  app.post(api.courses.create.path, requireAdmin, createCourse);
  app.put(api.courses.update.path, requireAdmin, updateCourse);
  app.delete(api.courses.delete.path, requireAdmin, deleteCourse);

  // ─── Enrollments ────────────────────────────────────────────────────────
  // Static paths (`/user`, `/upload-screenshot`) registered before `:id`
  // handlers so they aren't swallowed by parameterized routes.
  app.get(api.enrollments.mine.path, requireAuth, listMyEnrollments);
  app.post(
    api.enrollments.uploadScreenshot.path,
    requireAuth,
    imageUpload.single('image'),
    uploadPaymentScreenshot,
  );
  app.post(api.enrollments.create.path, requireAuth, createEnrollment);
  app.patch(api.enrollments.pay.path, requireAuth, payEnrollment);
  app.get(api.enrollments.list.path, requireAdmin, listEnrollments);
  app.patch(api.enrollments.verify.path, requireAdmin, verifyEnrollment);
  app.patch(api.enrollments.reject.path, requireAdmin, rejectEnrollment);

  // ─── Applications ───────────────────────────────────────────────────────
  app.post(api.applications.create.path, async (req, res, next) => {
    try {
      const input = api.applications.create.input.parse({
        ...req.body,
        userId: (req.user as any)?.id || null,
        email: req.body.email || (req.user as any)?.email || null,
      });
      const created = await storage.createApplication(input);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });

  app.get(api.applications.list.path, requireAdmin, async (_req, res, next) => {
    try {
      res.json(await storage.getApplications());
    } catch (err) {
      next(err);
    }
  });

  app.patch(
    api.applications.updateStatus.path,
    requireAdmin,
    async (req, res, next) => {
      try {
        const updated = await storage.updateApplicationStatus(
          req.params.id,
          req.body.status,
        );
        res.json(updated);
      } catch (err) {
        next(err);
      }
    },
  );

  // ─── Contacts ───────────────────────────────────────────────────────────
  app.post(api.contacts.create.path, async (req, res, next) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        next(err);
      }
    }
  });

  // ─── Global API error handler ───────────────────────────────────────────
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith('/api')) return next(err);
    if (res.headersSent) return next(err);
    console.error('[api error]', req.method, req.path, err?.message || err);
    const status = typeof err?.status === 'number' ? err.status : 500;
    res.status(status).json({
      message: err?.message || 'Internal server error',
    });
  });

  // ─── Seed (dev only) ────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    await runSeed(crypto);
  }

  return httpServer;
}
