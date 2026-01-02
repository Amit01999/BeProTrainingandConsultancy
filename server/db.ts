import mongoose from 'mongoose';

if (!process.env.MONGO_URL) {
  throw new Error(
    'MONGO_URL must be set. Did you forget to provision a MongoDB database?'
  );
}

// Provide a connect function and lazy connect during app startup
mongoose.set('strictQuery', true);

export async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URL as string, {
    dbName: process.env.MONGO_DB_NAME,
  });
  return mongoose;
}

export const mongo = mongoose;
export default mongo;
