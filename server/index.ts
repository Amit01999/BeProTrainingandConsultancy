import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from './routes';
import { serveStatic } from './static';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    limit: '2mb',
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
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

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

// Process-level safety nets: log and keep the server running instead of
// tearing down and serving stale 500s to unrelated requests.
process.on('unhandledRejection', (reason: any) => {
  console.error('[process] unhandledRejection:', reason?.stack || reason);
});
process.on('uncaughtException', err => {
  console.error('[process] uncaughtException:', err?.stack || err);
});

async function bootstrap() {
  // 1) Connect to MongoDB — fails fast if env is wrong or Atlas is unreachable.
  const { connectDB } = await import('./db');
  await connectDB();

  // 2) Register all API routes + session/passport (setupAuth is async now:
  //    it needs mongoose.connection.getClient() to back the session store).
  await registerRoutes(httpServer, app);

  // 3) Dev UI (Vite middleware) must come AFTER the API routes so its
  //    catch-all doesn't swallow /api/*.
  if (process.env.NODE_ENV === 'production') {
    serveStatic(app);
  } else {
    const { setupVite } = await import('./vite');
    await setupVite(httpServer, app);
  }

  // 4) Final error handler — for anything that slipped past the per-route
  //    handlers. Respond once, log the stack, and do NOT rethrow.
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    if (res.headersSent) return; // response already flushed, nothing we can do
    const status = err?.status || err?.statusCode || 500;
    const message =
      status < 500 && err?.message ? err.message : 'Internal Server Error';
    console.error('[fatal]', req.method, req.path, err?.stack || err);
    res.status(status).json({ message });
  });

  // 5) Only now start accepting traffic.
  const port = parseInt(process.env.PORT || '5000', 10);
  httpServer.on('error', (err: any) => {
    log(`http server error: ${err.message}`, 'server');
    process.exit(1);
  });
  httpServer.listen(port, () => {
    log(`serving on port ${port}`);
  });
}

bootstrap().catch(err => {
  console.error('[bootstrap] fatal error during startup:', err);
  process.exit(1);
});
