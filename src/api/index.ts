import dotenv from 'dotenv';
dotenv.config();

import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from '../../server/routes';

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

const app = express();

app.use(
  express.json({
    limit: '2mb',
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Module-level flag — survives across warm Vercel invocations.
let isInitialized = false;

async function initializeApp() {
  if (isInitialized) return;

  // connectDB is the correct export name from server/db.ts
  const { connectDB } = await import('../../server/db');
  await connectDB();
  await registerRoutes(null as any, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (res.headersSent) return;
    const status = err?.status || err?.statusCode || 500;
    const message =
      status < 500 && err?.message ? err.message : 'Internal Server Error';
    console.error('[fatal]', err?.stack || err);
    res.status(status).json({ message });
  });

  isInitialized = true;
}

export default async function handler(req: any, res: any) {
  try {
    await initializeApp();
    return app(req, res);
  } catch (error: any) {
    console.error('Handler error:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
