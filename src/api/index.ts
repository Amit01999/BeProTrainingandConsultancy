import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from '../../server/routes';

const app = express();

// Log environment check (for debugging)
console.log('Environment check:', {
  hasMongoUrl: !!process.env.MONGO_URL,
  hasSessionSecret: !!process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV
});

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = 'express') {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Initialize the app
let isInitialized = false;

async function initializeApp() {
  if (isInitialized) return app;

  const { connectMongo } = await import('../../server/db');
  await connectMongo();
  await registerRoutes(null as any, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
    console.error(err);
  });

  // Don't serve static files - Vercel handles that
  // serveStatic(app) is only for local production

  isInitialized = true;
  return app;
}

// Vercel serverless function export
export default async function handler(req: any, res: any) {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const app = await initializeApp();
    return app(req, res);
  } catch (error: any) {
    console.error('Handler error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
