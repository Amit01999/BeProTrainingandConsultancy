import mongoose, { Mongoose } from 'mongoose';

mongoose.set('strictQuery', true);

// Keep default bufferCommands=true. If the driver briefly reconnects between
// requests, queries get queued for up to `bufferTimeoutMS` instead of throwing
// immediately — the 500-on-first-load case most users hit in dev.
mongoose.set('bufferTimeoutMS', 15000);

let connecting: Promise<Mongoose> | null = null;

/**
 * connectDB — establishes a single, memoized Mongoose connection.
 *
 * - Idempotent: repeat calls return the same in-flight / resolved promise.
 * - Fails fast on boot (exits the process) so the supervisor restarts with
 *   correct env; never starts the HTTP listener without a live connection.
 * - Attaches lifecycle listeners for observability so transient disconnects
 *   surface in logs instead of bubbling up as opaque 500s.
 */
export async function connectDB(): Promise<Mongoose> {
  if (connecting) return connecting;

  const mongoUrl = process.env.MONGO_URL;
  const dbName = process.env.MONGO_DB_NAME || 'BeProTrainingandConsultancy';

  if (!mongoUrl) {
    console.error('[db] MONGO_URL is not set. Aborting startup.');
    process.exit(1);
  }

  const opts = {
    dbName,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 20,
    minPoolSize: 2,
    family: 4 as const,
    retryWrites: true,
  };

  connecting = (async () => {
    try {
      console.log(`[db] Connecting to MongoDB "${dbName}"…`);
      const conn = await mongoose.connect(mongoUrl, opts);
      console.log(`[db] MongoDB ready (db=${dbName})`);
      return conn;
    } catch (err) {
      console.error('[db] Initial connection failed:', err);
      connecting = null; // allow retry if the caller chooses to
      process.exit(1);
    }
  })();

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] disconnected — driver will attempt to reconnect');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('[db] reconnected');
  });
  mongoose.connection.on('error', err => {
    console.error('[db] connection error:', err?.message || err);
  });

  return connecting;
}

export function isDbReady(): boolean {
  // 1 = connected, 2 = connecting, 3 = disconnecting, 0 = disconnected
  return mongoose.connection.readyState === 1;
}

export default mongoose;
