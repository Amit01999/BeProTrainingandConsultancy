import mongoose from 'mongoose';

// Provide a connect function and lazy connect during app startup
mongoose.set('strictQuery', true);

// Cache the connection for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  // Check if MONGO_URL is set
  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not set!');
    throw new Error(
      'MONGO_URL must be set. Did you forget to provision a MongoDB database?'
    );
  }

  // Return cached connection if exists (important for serverless)
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  // Create new connection if not cached
  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const opts = {
      dbName: process.env.MONGO_DB_NAME,
      bufferCommands: false, // Disable buffering in serverless
    };

    cached.promise = mongoose.connect(process.env.MONGO_URL as string, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Add global type declaration
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export const mongo = mongoose;
export default mongo;
