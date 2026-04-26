import 'dotenv/config';
import { connectDB } from './db';
import { CourseModel } from './models';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { runSeed } from './seed-data';

const scrypt = promisify(_scrypt as any) as (
  pw: string,
  salt: string,
  len: number,
) => Promise<Buffer>;

async function hash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scrypt(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

async function seed() {
  console.log('Connecting to MongoDB...');
  await connectDB();

  const coursesCount = await CourseModel.countDocuments();
  if (coursesCount > 0) {
    console.log(`Deleting ${coursesCount} existing courses...`);
    await CourseModel.deleteMany({});
  }

  await runSeed({ hash });

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
