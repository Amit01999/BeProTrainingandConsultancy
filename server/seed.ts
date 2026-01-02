import 'dotenv/config';
import { connectMongo } from './db';
import { UserModel, CourseModel } from './models';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt as any) as (
  pw: string,
  salt: string,
  len: number
) => Promise<Buffer>;

async function hash(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scrypt(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function seed() {
  console.log('Connecting to MongoDB...');
  await connectMongo();

  // Clear existing courses
  const coursesCount = await CourseModel.countDocuments();
  if (coursesCount > 0) {
    console.log(`Deleting ${coursesCount} existing courses...`);
    await CourseModel.deleteMany({});
    console.log('Old courses deleted');
  }

  console.log('Seeding new courses...');
  await CourseModel.create([
    // 🟩 NSDA COURSES (3)
    {
      title: "Graphic Design (Level-2)",
      titleBn: "গ্রাফিক ডিজাইন (L-2)",
      category: "NSDA (RPL/RTO)",
      level: "L-2",
      duration: "24 Days",
      fee: "Government Sponsored",
      description:
        "Government approved NSDA course focused on practical graphic design skills.",
      descriptionBn:
        "NSDA কর্তৃক অনুমোদিত ২৪ দিনের গ্রাফিক ডিজাইন কোর্স যেখানে বাস্তব কাজের মাধ্যমে দক্ষতা অর্জন করা হবে।",
      features: [
        "NSDA International Standard Certificate",
        "Experienced Corporate Trainers",
        "Local & Overseas Job Support",
        "Allowance 1000 - 5000 BDT (Subject to Govt Budget)",
      ],
      isFeatured: true,
    },
    {
      title: "Graphic Design In Training (Level-3)",
      titleBn: "গ্রাফিক ডিজাইন ইন ট্রেনিং (L-3)",
      category: "NSDA (RPL/RTO)",
      level: "L-3",
      duration: "24 Days",
      fee: "Government Sponsored",
      description:
        "Advanced NSDA graphic design training with in-depth tools and real-life projects.",
      descriptionBn:
        "NSDA অনুমোদিত উন্নত গ্রাফিক ডিজাইন কোর্স যেখানে ইন্ডাস্ট্রি স্ট্যান্ডার্ড সফটওয়্যার ও প্রজেক্ট শেখানো হয়।",
      features: [
        "Advanced Design Tools Training",
        "International NSDA Certificate",
        "Job Placement Assistance",
        "Monthly Allowance",
      ],
      isFeatured: true,
    },
    {
      title: "Digital Marketing In Training (Level-3)",
      titleBn: "ডিজিটাল মার্কেটিং ইন ট্রেনিং (L-3)",
      category: "NSDA (RPL/RTO)",
      level: "L-3",
      duration: "24 Days",
      fee: "Government Sponsored",
      description:
        "NSDA approved digital marketing course covering Facebook, SEO & Branding.",
      descriptionBn:
        "NSDA অনুমোদিত ডিজিটাল মার্কেটিং কোর্স যেখানে ফেসবুক মার্কেটিং, SEO ও ব্র্যান্ডিং শেখানো হয়।",
      features: [
        "Facebook, SEO, Branding",
        "International NSDA Certificate",
        "Job Support Local & Abroad",
        "Government Allowance",
      ],
      isFeatured: true,
    },

    // 🟦 OTHER COURSES (5)
    {
      title: "Entrepreneurship Development Training",
      titleBn: "উদ্যোক্তা উন্নয়ন প্রশিক্ষণ",
      category: "Skill Development",
      level: "Beginner",
      duration: "15 Days",
      fee: "3000 BDT",
      description:
        "Training for building entrepreneurship mindset and startup basics.",
      descriptionBn:
        "নিজস্ব ব্যবসা শুরু ও উদ্যোক্তা হওয়ার জন্য প্রয়োজনীয় মানসিকতা ও দক্ষতা উন্নয়নের কোর্স।",
      features: [
        "Business Idea Validation",
        "Startup Mindset",
        "Leadership Development",
        "Mentorship Support",
      ],
      isFeatured: false,
    },
    {
      title: "Corporate Training Program",
      titleBn: "কর্পোরেট ট্রেনিং (NGO, Internship etc)",
      category: "Corporate Skill",
      level: "Professional",
      duration: "10 Days",
      fee: "5000 BDT",
      description:
        "Corporate grooming for NGOs, interns and professionals.",
      descriptionBn:
        "NGO, ইন্টার্নশিপ ও কর্পোরেট জবের জন্য পেশাগত দক্ষতা উন্নয়নের ট্রেনিং।",
      features: [
        "Interview Etiquette",
        "Workplace Etiquette",
        "Professional Communication",
        "Leadership Skill",
      ],
      isFeatured: false,
    },
    {
      title: "Foreign Job Orientation Program",
      titleBn: "Foreign Job Orientation (প্রবাসগামী কর্মীদের জন্য)",
      category: "Job Preparation",
      level: "Beginner",
      duration: "7 Days",
      fee: "3000 BDT",
      description:
        "Orientation for overseas job seekers.",
      descriptionBn:
        "বিদেশে কাজ করতে আগ্রহীদের জন্য প্রয়োজনীয় দিকনির্দেশনা ও প্রস্তুতি কোর্স।",
      features: [
        "Foreign Job Interview Tips",
        "Cultural Awareness",
        "CV & Documentation",
      ],
      isFeatured: false,
    },
    {
      title: "Language Training Program",
      titleBn: "Language Training Program",
      category: "Communication Skill",
      level: "Beginner",
      duration: "20 Days",
      fee: "4000 BDT",
      description:
        "Spoken English and professional communication skill development.",
      descriptionBn:
        "স্পোকেন ইংলিশ ও পেশাগত যোগাযোগ দক্ষতা উন্নয়নের প্রশিক্ষণ।",
      features: [
        "Spoken English",
        "Public Speaking",
        "Confidence Building",
      ],
      isFeatured: false,
    },
    {
      title: "Real Job Training & Soft Skill Program",
      titleBn: "Real Job Training & Soft Skill Program",
      category: "Career Development",
      level: "Professional",
      duration: "8 Days (8:00 AM - 1:30 PM)",
      fee: "3000 BDT (Discounted from 5000)",
      description:
        "Job preparation program with placement support at UCEP Khulna Region.",
      descriptionBn:
        "UCEP খুলনা অঞ্চলে অনুষ্ঠিত চাকরির প্রস্তুতি ও সফট স্কিল ডেভেলপমেন্ট প্রোগ্রাম।",
      features: [
        "Public Speaking & Presentation",
        "Interview & Workplace Etiquette",
        "Leadership & Mindset Development",
        "Creative Thinking & Problem Solving",
        "CV, LinkedIn & Job Portal Training",
        "100% Placement Support",
      ],
      isFeatured: true,
    },
  ]);
  console.log('New courses seeded successfully');

  const admin = await UserModel.findOne({ username: 'admin' });
  if (!admin) {
    console.log('Creating admin user...');
    const pw = await hash('admin123');
    await UserModel.create({
      username: 'admin',
      password: pw,
      role: 'admin',
      fullName: 'System Admin',
      email: 'admin@bepro.com',
      phone: '01995-555588',
    });
    console.log('Admin created');
  } else {
    console.log('Admin user already exists, skipping');
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
