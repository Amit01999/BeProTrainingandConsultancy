import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './db';
import { CourseModel, type ICourse } from './models';

const courses: Array<Omit<ICourse, '_id' | 'createdAt' | 'updatedAt'>> = [
  {
    slug: 'english-for-work-level-2',
    title: 'English for Work Level-2',
    category: 'nsda',
    programTags: ['RTO'],
    level: 'Level 2',
    duration: '3 Month',
    fee: 'Free',
    originalPrice: 0,
    discountedPrice: 0,
    description:
      'RTO English communication training for professional work environments.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#2193b0',
    gradientTo: '#6dd5ed',
    icon: '\uD83D\uDDE3\uFE0F',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RTO', 'Course fee: Free'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 3 Month'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'english-for-work-level-2-rpl',
    title: 'English for Work Level-2 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    level: 'Level 2',
    duration: '10 Days',
    fee: '2,500 taka',
    originalPrice: 2500,
    discountedPrice: 2500,
    description: 'RPL certification for English communication skills.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#2193b0',
    gradientTo: '#6dd5ed',
    icon: '\uD83D\uDDE3\uFE0F',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RPL', 'Course fee: 2,500 taka'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 10 Days'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'entrepreneurship-development-level-4',
    title: 'Entrepreneurship Development Level-4',
    category: 'nsda',
    programTags: ['RTO'],
    level: 'Level 4',
    duration: '3 Month',
    fee: 'Free',
    originalPrice: 0,
    discountedPrice: 0,
    description: 'RTO entrepreneurship training program under NSDA.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#f7971e',
    gradientTo: '#ffd200',
    icon: '\uD83D\uDE80',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RTO', 'Course fee: Free'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 3 Month'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'entrepreneurship-development-level-4-rpl',
    title: 'Entrepreneurship Development Level-4 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    level: 'Level 4',
    duration: '10 Days',
    fee: '2,500 taka',
    originalPrice: 2500,
    discountedPrice: 2500,
    description: 'RPL certification for entrepreneurship skills.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#f7971e',
    gradientTo: '#ffd200',
    icon: '\uD83D\uDE80',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RPL', 'Course fee: 2,500 taka'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 10 Days'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'it-support-service-level-3',
    title: 'IT Support Service Level-3',
    category: 'nsda',
    programTags: ['RTO'],
    level: 'Level 3',
    duration: '3 Month',
    fee: 'Free',
    originalPrice: 0,
    discountedPrice: 0,
    description: 'RTO IT support training program.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#00c6ff',
    gradientTo: '#0072ff',
    icon: '\uD83D\uDCBB',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RTO', 'Course fee: Free'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 3 Month'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'it-support-service-level-3-rpl',
    title: 'IT Support Service Level-3 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    level: 'Level 3',
    duration: '10 Days',
    fee: '2,500 taka',
    originalPrice: 2500,
    discountedPrice: 2500,
    description: 'RPL certification for IT support services.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#00c6ff',
    gradientTo: '#0072ff',
    icon: '\uD83D\uDCBB',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RPL', 'Course fee: 2,500 taka'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 10 Days'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'reservation-ticketing-level-3',
    title: 'Reservation & Ticketing Level-3',
    category: 'nsda',
    programTags: ['RTO'],
    level: 'Level 3',
    duration: '3 Month',
    fee: 'Free',
    originalPrice: 0,
    discountedPrice: 0,
    description: 'RTO travel reservation and ticketing training.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#fc4a1a',
    gradientTo: '#f7b733',
    icon: '\u2708\uFE0F',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RTO', 'Course fee: Free'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 3 Month'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'reservation-ticketing-level-3-rpl',
    title: 'Reservation & Ticketing Level-3 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    level: 'Level 3',
    duration: '10 Days',
    fee: '2,500 taka',
    originalPrice: 2500,
    discountedPrice: 2500,
    description: 'RPL certification for reservation and ticketing.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#fc4a1a',
    gradientTo: '#f7b733',
    icon: '\u2708\uFE0F',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: ['Program type: RPL', 'Course fee: 2,500 taka'],
      },
      {
        heading: 'Course Info',
        content: ['Course duration: 10 Days'],
      },
      {
        heading: 'Curriculum',
        content: ['Curriculum: As Per NSDA Guidelines'],
      },
    ],
  },
  {
    slug: 'cbt-a-methodology-level-4',
    title: 'CBT & A Methodology Level-4',
    category: 'nsda',
    programTags: ['CBT&A'],
    level: 'Level 4',
    duration: '34 Days (20 Days Online + 14 Days Offline)',
    fee: 'As Per NSDA Guidelines',
    originalPrice: 0,
    discountedPrice: 0,
    description:
      'NSDA-approved CBT & A Methodology Level-4 program designed to build professional training and assessment skills for career development.',
    imageUrl: '',
    imagePublicId: '',
    gradientFrom: '#0f766e',
    gradientTo: '#115e59',
    icon: '\uD83D\uDCD8',
    features: [],
    details: [
      {
        heading: 'Program Type',
        content: [
          'Program type: NSDA CBT & A',
          'Level: Level-4',
          'Admission: Ongoing',
        ],
      },
      {
        heading: 'Course Info',
        content: [
          'Online Class: 20 Days',
          'Offline Class: 14 Days',
          'Total Duration: 34 Days',
          'Training Mode: Hybrid (Online + Offline)',
        ],
      },
      {
        heading: 'Curriculum',
        content: [
          'Competency-Based Training (CBT) methodology',
          'Assessment (A) system and evaluation techniques',
          'Training delivery and facilitation skills',
          'Assessment planning and execution',
          'Professional trainer development',
        ],
      },
      {
        heading: 'Program Outcome',
        content: [
          'Build a professional training career',
          'Develop competency-based training skills',
          'Gain industry-recognized NSDA certification',
          'Enhance teaching and assessment capabilities',
        ],
      },
      {
        heading: 'Who This Course Is For',
        content: [
          'Aspiring trainers and instructors',
          'Professionals looking to become certified assessors',
          'Individuals seeking NSDA certification',
          'Anyone interested in training and development careers',
        ],
      },
    ],
    isFeatured: true,
  },
];

type SeedResult = {
  inserted: string[];
  skipped: string[];
  updated: string[];
  failed: Array<{ slug: string; error: string }>;
};

async function seedCourses() {
  const shouldUpdateExisting =
    process.env.UPDATE_EXISTING_COURSES?.toLowerCase() === 'true';
  const result: SeedResult = {
    inserted: [],
    skipped: [],
    updated: [],
    failed: [],
  };

  await connectDB();

  for (const course of courses) {
    try {
      const existing = await CourseModel.findOne({ slug: course.slug });

      if (existing) {
        if (!shouldUpdateExisting) {
          result.skipped.push(course.slug);
          console.log(`[seed:courses] skipped "${course.slug}" (already exists)`);
          continue;
        }

        existing.set(course);
        await existing.save();
        result.updated.push(course.slug);
        console.log(`[seed:courses] updated "${course.slug}"`);
        continue;
      }

      await CourseModel.create(course);
      result.inserted.push(course.slug);
      console.log(`[seed:courses] inserted "${course.slug}"`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.failed.push({ slug: course.slug, error: message });
      console.error(`[seed:courses] failed "${course.slug}": ${message}`);
    }
  }

  console.log('[seed:courses] complete');
  console.log(`[seed:courses] inserted: ${result.inserted.length}`);
  console.log(`[seed:courses] skipped: ${result.skipped.length}`);
  console.log(`[seed:courses] updated: ${result.updated.length}`);
  console.log(`[seed:courses] failed: ${result.failed.length}`);

  if (result.failed.length > 0) {
    process.exitCode = 1;
  }
}

seedCourses()
  .catch(err => {
    console.error('[seed:courses] unexpected failure:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
