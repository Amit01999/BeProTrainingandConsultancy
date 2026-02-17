import mongoose, { Mongoose } from 'mongoose';

mongoose.set('strictQuery', true);

/**
 * connectDB - Establishes a Mongoose connection using environment configuration.
 * Exits the process if connection fails (suitable for server startup behavior).
 */
export async function connectDB(): Promise<Mongoose> {
  const mongoUrl = process.env.MONGO_URL;
  const dbName = process.env.MONGO_DB_NAME || 'BeProTrainingandConsultancy';

  if (!mongoUrl) {
    console.error('MONGO_URL environment variable is not set!');
    console.error(
      'Set MONGO_URL in your .env or environment before starting the server.',
    );
    process.exit(1);
  }

  const opts = {
    dbName,
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    family: 4 as const,
  };

  try {
    console.log('Attempting MongoDB connection...');
    const conn = await mongoose.connect(mongoUrl, opts);
    console.log(`MongoDB connected successfully to database "${dbName}"`);
    return conn;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    // fail fast - useful for containers/PM2 to restart with correct env
    process.exit(1);
  }
}

export default mongoose;
