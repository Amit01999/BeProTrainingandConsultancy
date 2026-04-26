import { storage } from './storage';
import type { InsertCourse } from '@shared/schema';
import { CourseModel } from './models';
import { generateUniqueCourseSlug } from './utils/slug';

// Image pool mapped 1:1 with the original `client/src/asset/course/c1..c8`
// placeholders used in the frontend coursesData.ts. Replace these with real
// Cloudinary URLs via the admin panel as real content is uploaded.
const IMG = {
  c1: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200',
  c2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
  c3: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?q=80&w=1200',
  c4: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200',
  c5: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200',
  c6: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200',
  c7: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200',
  c8: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
};

const SEED_COURSES: InsertCourse[] = [
  // ─── Government (NSDA) Courses ────────────────────────────────────────
  {
    title: 'Graphics Design Level-2',
    category: 'nsda',
    programTags: ['RTO'],
    imageUrl: IMG.c3,
    gradientFrom: '#a18cd1',
    gradientTo: '#fbc2eb',
    icon: '🎨',
    originalPrice: 0,
    discountedPrice: 0,
    fee: 'Free',
    duration: '10 Days',
    level: 'Level 2',
    description:
      'Free Training Program under RTO for Graphics Design Level-2 with 10 days of guided training.',
    details: [
      { heading: 'Program Type', content: ['Program type: RTO', 'Course fee: Free'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Graphics Design Level-2',
          'Course duration: 10 days',
          'Training mode: RTO free training program',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Adobe Photoshop',
          'Adobe Illustrator',
          'MS Office',
          'Basic Internet usage',
          'Visual design principles and color sense',
          'Basic image editing and mock-up development',
        ],
      },
    ],
  },
  {
    title: 'Graphics Design & Freelancing Level-3',
    category: 'nsda',
    programTags: ['RTO'],
    imageUrl: IMG.c1,
    gradientFrom: '#6a11cb',
    gradientTo: '#2575fc',
    icon: '💼',
    originalPrice: 0,
    discountedPrice: 0,
    fee: 'Free',
    duration: '10 Days',
    level: 'Level 3',
    description:
      'Free Training Program under RTO for Graphics Design & Freelancing Level-3 with 10 days of guided training.',
    details: [
      { heading: 'Program Type', content: ['Program type: RTO', 'Course fee: Free'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Graphics Design & Freelancing Level-3',
          'Course duration: 10 days',
          'Training mode: RTO free training program',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Adobe Photoshop and Adobe Illustrator workflow',
          'Client document and presentation preparation',
          'Freelancing marketplace profile management',
          'Professional design concept development',
          'Vector tools and mock-up preparation',
        ],
      },
    ],
  },
  {
    title: 'Digital Marketing & Freelancing Level-3',
    category: 'nsda',
    programTags: ['RTO'],
    imageUrl: IMG.c2,
    gradientFrom: '#ff9a9e',
    gradientTo: '#fecfef',
    icon: '📈',
    originalPrice: 0,
    discountedPrice: 0,
    fee: 'Free',
    duration: '10 Days',
    level: 'Level 3',
    description:
      'Free Training Program under RTO for Digital Marketing & Freelancing Level-3 with 10 days of guided training.',
    details: [
      { heading: 'Program Type', content: ['Program type: RTO', 'Course fee: Free'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Digital Marketing & Freelancing Level-3',
          'Course duration: 10 days',
          'Training mode: RTO free training program',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Ad campaign creation and management',
          'Local SEO techniques',
          'Google Webmaster Tools and Google Analytics',
          'Email marketing and video marketing',
          'Freelancing-oriented digital service delivery',
        ],
      },
    ],
  },
  {
    title: 'Graphics Design Level-2 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    imageUrl: IMG.c3,
    gradientFrom: '#a18cd1',
    gradientTo: '#fbc2eb',
    icon: '🎨',
    originalPrice: 2500,
    discountedPrice: 2500,
    fee: '2,500 taka',
    duration: '10 Days',
    level: 'Level 2',
    description:
      'RPL paid program for Graphics Design Level-2 with 10 days duration and a 2,500 taka course fee.',
    details: [
      { heading: 'Program Type', content: ['Program type: RPL', 'Course fee: 2,500 taka'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Graphics Design Level-2',
          'Course duration: 10 days',
          'RPL course fee: 2,500 taka',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Adobe Photoshop',
          'Adobe Illustrator',
          'MS Office',
          'Basic Internet usage',
          'Visual design principles and color sense',
          'Basic image editing and mock-up development',
        ],
      },
    ],
  },
  {
    title: 'Graphics Design & Freelancing Level-3 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    imageUrl: IMG.c1,
    gradientFrom: '#6a11cb',
    gradientTo: '#2575fc',
    icon: '💼',
    originalPrice: 2500,
    discountedPrice: 2500,
    fee: '2,500 taka',
    duration: '10 Days',
    level: 'Level 3',
    description:
      'RPL paid program for Graphics Design & Freelancing Level-3 with 10 days duration and a 2,500 taka course fee.',
    details: [
      { heading: 'Program Type', content: ['Program type: RPL', 'Course fee: 2,500 taka'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Graphics Design & Freelancing Level-3',
          'Course duration: 10 days',
          'RPL course fee: 2,500 taka',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Adobe Photoshop and Adobe Illustrator workflow',
          'Client document and presentation preparation',
          'Freelancing marketplace profile management',
          'Professional design concept development',
          'Vector tools and mock-up preparation',
        ],
      },
    ],
  },
  {
    title: 'Digital Marketing & Freelancing Level-3 (RPL)',
    category: 'nsda',
    programTags: ['RPL'],
    imageUrl: IMG.c2,
    gradientFrom: '#ff9a9e',
    gradientTo: '#fecfef',
    icon: '📈',
    originalPrice: 2500,
    discountedPrice: 2500,
    fee: '2,500 taka',
    duration: '10 Days',
    level: 'Level 3',
    description:
      'RPL paid program for Digital Marketing & Freelancing Level-3 with 10 days duration and a 2,500 taka course fee.',
    details: [
      { heading: 'Program Type', content: ['Program type: RPL', 'Course fee: 2,500 taka'] },
      {
        heading: 'Course Info',
        content: [
          'Course name: Digital Marketing & Freelancing Level-3',
          'Course duration: 10 days',
          'RPL course fee: 2,500 taka',
        ],
      },
      {
        heading: 'Core Competencies',
        content: [
          'Ad campaign creation and management',
          'Local SEO techniques',
          'Google Webmaster Tools and Google Analytics',
          'Email marketing and video marketing',
          'Freelancing-oriented digital service delivery',
        ],
      },
    ],
  },

  // ─── Skills Development Programs ──────────────────────────────────────
  {
    title: 'Soft Skill Development',
    category: 'skills',
    imageUrl: IMG.c5,
    gradientFrom: '#f093fb',
    gradientTo: '#f5576c',
    icon: '🎤',
    originalPrice: 5000,
    discountedPrice: 1000,
    duration: '7 Days',
    level: 'All Levels',
    description:
      'Build essential professional soft skills including public speaking, leadership, and emotional intelligence.',
    details: [
      {
        heading: 'Training Topics',
        content: [
          'Public Speaking & Presentation — Learn to speak confidently by removing unclear thinking and hesitation in presentation.',
          'Interview Etiquette & Mock Interview — Training on interview mindset, answering questions, body language, and dress code.',
          'Leadership & Mindset Development — Special sessions to build self-control and leadership mindset.',
          'Communication & Emotional Intelligence — Improve skills using emotional intelligence and sensitive reasoning.',
          'Creative Thinking & Problem Solving — Learn to think out-of-the-box and handle complex situations effectively.',
          'CV & Email Writing — Training on how to plan and prepare professional CVs and emails effectively.',
          'Workplace Etiquette — Training on office behavior, time management, and teamwork.',
        ],
      },
    ],
    isFeatured: true,
  },
  {
    title: 'Entrepreneurship Development',
    category: 'skills',
    imageUrl: IMG.c6,
    gradientFrom: '#4facfe',
    gradientTo: '#00f2fe',
    icon: '🚀',
    originalPrice: 4000,
    discountedPrice: 2000,
    duration: '7 Days',
    level: 'All Levels',
    description:
      "We set founders up for success. We fund Bangladesh's most promising founders, hone leadership capabilities, strengthen business acumen, and help validate big ideas into investable businesses.",
    details: [
      {
        heading: 'What We Do',
        content: [
          'For over a decade, we have taught leadership to more than 5,000 promising young professionals.',
          'Product validation support',
          'Seed funding guidance',
          'Business training by CEO mentors',
          'Legal, accounting, and corporate governance support',
        ],
      },
      {
        heading: 'Our Approach',
        content: [
          'Accelerator training',
          'Founder-focused curriculum',
          'Leadership development',
          'Sales-focused pitch clinics',
          'Brutally honest feedback',
          'Virtual CFO',
          'Legal support',
          'One-on-one mentoring',
          'Mentor matching',
        ],
      },
    ],
  },
  {
    title: 'Foreign Job Orientation',
    category: 'skills',
    imageUrl: IMG.c7,
    gradientFrom: '#43e97b',
    gradientTo: '#38f9d7',
    icon: '✈️',
    originalPrice: 4000,
    discountedPrice: 2000,
    duration: '7 Days',
    level: 'All Levels',
    description:
      'Preparation for foreign job markets, including CV writing and interview skills.',
    details: [
      {
        heading: "What you'll learn",
        content: [
          'Comprehensive curriculum covering industry standards and practical applications',
          'Interview preparation and cultural orientation',
          'CV and documentation guidance',
          'Workplace etiquette for overseas roles',
        ],
      },
    ],
  },
  {
    title: 'Corporate Training Program',
    category: 'skills',
    imageUrl: IMG.c8,
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
    icon: '🏢',
    originalPrice: 4000,
    discountedPrice: 2000,
    duration: 'Custom',
    level: 'All Levels',
    description:
      'Customized training for banks, hospitals, NGOs, and private sectors.',
    details: [
      {
        heading: "What you'll learn",
        content: [
          'Comprehensive curriculum covering industry standards and practical applications',
          'Tailored modules for banking, healthcare, and NGO sectors',
          'Professional communication and workplace etiquette',
          'Team building and leadership development',
        ],
      },
      {
        heading: 'Skills Development Focus',
        content: [
          'Building a skilled, inclusive, and future-ready workforce across Bangladesh.',
        ],
      },
      {
        heading: 'Program Highlights',
        content: [
          'Market-based skills training (STAR Model)',
          'Community-based learning',
          'Digital skills development',
          'Soft skills training',
          'Direct connection to job opportunities',
        ],
      },
      {
        heading: 'Impact',
        content: [
          '22.6% rise in labour market participation',
          '78% increase in income-generating activities',
          'Prevention of early marriage for 62% of female trainees',
        ],
      },
    ],
  },
  {
    title: 'Full Stack Web Development',
    category: 'skills',
    imageUrl: IMG.c1,
    gradientFrom: '#1d4ed8',
    gradientTo: '#06b6d4',
    icon: '💻',
    originalPrice: 8000,
    discountedPrice: 4000,
    duration: '2.5 Months (160 Hours)',
    level: 'Beginner to Advanced',
    description:
      'A complete MERN-based web development program covering frontend, backend, databases, Git, deployment, and advanced JavaScript topics for professional and freelance work.',
    details: [
      {
        heading: "What You'll Learn",
        content: [
          'Become a full stack developer with practical project experience.',
          'Master the JavaScript ecosystem from core concepts to modern tooling.',
          'Build real-world projects for companies, startups, or freelance clients.',
          'Work with MERN stack, Git, APIs, deployment, and advanced web topics.',
        ],
      },
      {
        heading: 'Course Content',
        content: [
          '36 sections, 331 lectures, and 99h 48m of guided learning.',
          'Course introduction, roadmap, instructor overview, and AI hype discussion.',
          'Jobs, salary range, career skills, and essential web development tools.',
          'Code editor setup, HTML, CSS, Tailwind CSS, JavaScript, and hands-on projects.',
          'Node.js, Express, Mongoose, Prisma, Drizzle, PostgreSQL, React, Redux, Zustand, TensorFlow.js, and LangChain.',
        ],
      },
      {
        heading: 'Requirements',
        content: [
          'A laptop with a good internet connection.',
          'A strong commitment to complete the full learning path.',
        ],
      },
      {
        heading: 'Program Highlights',
        content: [
          'Lifetime updates with new content added regularly.',
          'Backend training with authentication systems, APIs, and open-source project work.',
          'Frontend mastery with React fundamentals, API handling, and state management.',
          'Full-stack capstone projects plus introductory AI-powered web app workflows.',
        ],
      },
      {
        heading: 'Who This Course Is For',
        content: [
          'Complete beginners who want to learn web development from scratch.',
          'Intermediate learners who want to move to the next professional level.',
          'Learners who want to understand how web development works under the hood.',
          'Anyone ready to invest consistent effort into becoming a job-ready developer.',
        ],
      },
    ],
    isFeatured: true,
  },
  {
    title: 'Technical Skill',
    category: 'skills',
    imageUrl: IMG.c2,
    gradientFrom: '#0f766e',
    gradientTo: '#22c55e',
    icon: '🛠️',
    originalPrice: 500,
    discountedPrice: 500,
    duration: '3 Months (360 Hours)',
    level: 'Foundational',
    description:
      'A practical technical skills program focused on employability-oriented trades including IT, electrical maintenance, technical machine operation, RAC, and driving fundamentals.',
    details: [
      {
        heading: 'Training Areas',
        content: [
          'IT foundations and digital workplace skills.',
          'EM practical technical basics.',
          'TDM skill development modules.',
          'RAC fundamentals and equipment handling.',
          'Driving-oriented safety and operational awareness.',
        ],
      },
      {
        heading: 'Program Info',
        content: [
          'Duration: 3 months with a total of 360 guided hours.',
          'Current intake requires admission fee only.',
          'Designed for learners seeking hands-on career preparation.',
        ],
      },
    ],
  },

  // ─── Language Training ────────────────────────────────────────────────
  {
    title: 'Language Training - IELTS',
    category: 'language',
    imageUrl: IMG.c3,
    gradientFrom: '#2563eb',
    gradientTo: '#7c3aed',
    icon: '🇬🇧',
    originalPrice: 20000,
    discountedPrice: 20000,
    duration: '45 Classes',
    level: 'Beginner to Advanced',
    description:
      'An intensive IELTS preparation course covering all four skills with added support for file processing and study-abroad readiness.',
    details: [
      {
        heading: 'Program Features',
        content: [
          'Complete IELTS preparation for Listening, Reading, Writing, and Speaking.',
          '45 classes included in the full course plan.',
          'File processing support included at no extra cost.',
        ],
      },
      {
        heading: 'Course Fee',
        content: [
          'Course fee: 20,000 taka.',
          'Suitable for students and professionals preparing for international study or migration pathways.',
        ],
      },
    ],
  },
  {
    title: 'Language Training - English Spoken',
    category: 'language',
    imageUrl: IMG.c4,
    gradientFrom: '#ec4899',
    gradientTo: '#f97316',
    icon: '🗣️',
    originalPrice: 5000,
    discountedPrice: 5000,
    duration: '3 Months',
    level: 'Beginner',
    description:
      'A spoken English program for learners who want to build daily communication confidence for study, work, and interviews.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Course fee: 5,000 taka.',
          'Duration: 3 months.',
          'Available in both offline and online formats.',
        ],
      },
      {
        heading: 'What You Will Practice',
        content: [
          'Everyday speaking confidence.',
          'Basic grammar and sentence patterns.',
          'Conversation practice for personal and professional settings.',
        ],
      },
    ],
  },
  {
    title: 'Language Training - Japan Language',
    category: 'language',
    imageUrl: IMG.c5,
    gradientFrom: '#dc2626',
    gradientTo: '#f59e0b',
    icon: '🇯🇵',
    originalPrice: 10000,
    discountedPrice: 10000,
    duration: '3 Months',
    level: 'Beginner',
    description:
      'A Japanese language training course for learners aiming at communication skills, language foundations, and study-abroad preparation.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Course fee: 10,000 taka.',
          'Duration: 3 months.',
          'Study abroad processing fee is free.',
        ],
      },
      {
        heading: 'Learning Focus',
        content: [
          'Essential Japanese language basics.',
          'Communication practice for academic and daily use.',
          'Preparation support for Japan-focused study pathways.',
        ],
      },
    ],
  },
  {
    title: 'Language Training - German Language',
    category: 'language',
    imageUrl: IMG.c6,
    gradientFrom: '#111827',
    gradientTo: '#ef4444',
    icon: '🇩🇪',
    originalPrice: 10000,
    discountedPrice: 10000,
    duration: '3 Months',
    level: 'Beginner',
    description:
      'A German language course designed for learners targeting communication ability, online study flexibility, and study-abroad preparation.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Course fee: 10,000 taka.',
          'Duration: 3 months.',
          'Online learning format available.',
          'Study abroad processing fee is free.',
        ],
      },
      {
        heading: 'Learning Focus',
        content: [
          'German language fundamentals.',
          'Communication practice for study and daily life.',
          'Support for Germany-oriented study abroad preparation.',
        ],
      },
    ],
  },

  // ─── Corporate & Junior Programs ──────────────────────────────────────
  {
    title:
      'Corporate Training - NGO, Bank, Hospital, Industry - Spoken English & Advanced Computer',
    category: 'skills',
    imageUrl: IMG.c7,
    gradientFrom: '#4338ca',
    gradientTo: '#14b8a6',
    icon: '🏢',
    originalPrice: 2000,
    discountedPrice: 2000,
    duration: '1 Month',
    level: 'Corporate Professionals',
    description:
      'A compact corporate training course combining spoken English and advanced computer applications for job holders in NGO, banking, healthcare, and industry settings.',
    details: [
      {
        heading: 'Spoken English Module',
        content: [
          'Alphabet and phonics.',
          'Basic sentence building and daily conversation.',
          'Storytelling practice and basic vocabulary.',
          'Email writing, presentation skill, and meeting conversation.',
          'Internal and external communication with workplace etiquette.',
        ],
      },
      {
        heading: 'Advanced Computer Module',
        content: [
          'MS Word Advanced.',
          'Excel Advanced.',
          'PowerPoint Presentation and Paint.',
          'Google tools, cyber security basics, and Canva.',
          'Additional productivity software as needed.',
        ],
      },
      {
        heading: 'Class Schedule',
        content: [
          'Duration: 1 month.',
          'Total class: 25.',
          'Seat capacity: 10 to 15 learners.',
          'Class time: 1.30 hour evening course from 6 PM to 7 PM.',
          'Available in both offline and online mode.',
        ],
      },
      {
        heading: 'Fees',
        content: ['Course fee: 2,000 taka.', 'Admission fee: 500 taka.'],
      },
    ],
  },
  {
    title: 'Junior Computer Programming & Spoken English',
    category: 'skills',
    imageUrl: IMG.c8,
    gradientFrom: '#0ea5e9',
    gradientTo: '#8b5cf6',
    icon: '🧒',
    originalPrice: 2000,
    discountedPrice: 2000,
    duration: '25 Classes',
    level: 'Ages 8-14',
    description:
      'A beginner-friendly kids course that combines basic computer literacy with spoken English practice in a supportive offline or online environment.',
    details: [
      {
        heading: 'Computer Module',
        content: [
          'Basic computer introduction.',
          'MS Office with Word and Excel.',
          'Typing practice.',
          'Internet browsing with cyber security awareness.',
          'Microsoft Paint.',
        ],
      },
      {
        heading: 'Spoken English Module',
        content: [
          'Alphabet and phonics.',
          'Basic sentence patterns.',
          'Daily conversation.',
          'Storytelling practice.',
          'Basic vocabulary.',
        ],
      },
      {
        heading: 'Class Schedule',
        content: [
          'Offline and online learning available.',
          'Total class: 25.',
          'Seat capacity: 15 to 20 learners.',
          'Target age: 8 to 14 years.',
          'Afternoon batch from 4:00 PM to 5:30 PM.',
        ],
      },
      {
        heading: 'Fees',
        content: ['Course fee: 2,000 taka.', 'Admission fee: 500 taka.'],
      },
    ],
  },
  {
    title: 'Junior Coding, Robotics & Spoken English',
    category: 'skills',
    imageUrl: IMG.c2,
    gradientFrom: '#2563eb',
    gradientTo: '#f43f5e',
    icon: '🤖',
    originalPrice: 2000,
    discountedPrice: 2000,
    duration: '25 Classes',
    level: 'Ages 8-18',
    description:
      'A junior coding and spoken English program focused on logic building, creative technology, beginner programming, and confident communication.',
    details: [
      {
        heading: 'Programming Module',
        content: [
          'Logic building.',
          'Scratch programming.',
          'Basic HTML.',
          'Creative project idea mapping.',
          'AI for juniors and software knowledge.',
          'Cyber safety tips for kids.',
          'Coding, robotics, mobile app and game development.',
          'Animation basics.',
        ],
      },
      {
        heading: 'English Module',
        content: [
          'Vocabulary build-up.',
          'Basic grammar.',
          'Alphabet and phonics.',
          'Basic sentence formation.',
          'Daily conversation.',
          'Storytelling practice.',
          'Basic vocabulary reinforcement.',
        ],
      },
      {
        heading: 'Class Schedule',
        content: [
          'Offline and online learning available.',
          'Total class: 25.',
          'Seat capacity: 15 to 20 learners.',
          'Target age: 8 to 18 years.',
          'Afternoon batch from 4:00 PM to 6:00 PM.',
        ],
      },
      {
        heading: 'Fees',
        content: ['Course fee: 2,000 taka.', 'Admission fee: 500 taka.'],
      },
    ],
  },
  {
    title: 'Career In Hospitality & Hotel Management',
    category: 'skills',
    imageUrl: IMG.c3,
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    icon: '🏨',
    originalPrice: 6000,
    discountedPrice: 3000,
    duration: '3 Months (360 Hours)',
    level: 'Beginner',
    description:
      'A hospitality career starter course focused on hotel operations, front desk workflows, professional preparation, and employability support.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Duration: 3 months with a total of 360 hours.',
          'Course fee: 6,000 taka.',
          '50% discount offer price: 3,000 taka.',
          'Includes a free online workshop for interested learners.',
        ],
      },
      {
        heading: 'What We Will Cover',
        content: [
          'Hotel front desk and operational overview.',
          'Career opportunities in hospitality and hotel management.',
          'Resume building.',
          'Interview strategies.',
          'Thesis guidance.',
        ],
      },
    ],
  },
  {
    title: 'Academic & Research Writing Solution',
    category: 'skills',
    imageUrl: IMG.c4,
    gradientFrom: '#7c3aed',
    gradientTo: '#ec4899',
    icon: '✍️',
    originalPrice: 5000,
    discountedPrice: 5000,
    duration: '3 Months (2 Hours per Class)',
    level: 'Intermediate to Advanced',
    description:
      'A focused writing support course for learners who want to improve academic writing, research organization, and professional document development.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Duration: 3 months.',
          'Class duration: 2 hours.',
          'Course fee: 5,000 taka.',
        ],
      },
      {
        heading: 'Learning Focus',
        content: [
          'Academic writing structure and clarity.',
          'Research-based writing support.',
          'Improved organization, argument flow, and professional presentation.',
        ],
      },
    ],
  },
  {
    title: 'Robotics & AI Junior Program',
    category: 'skills',
    imageUrl: IMG.c5,
    gradientFrom: '#0891b2',
    gradientTo: '#6366f1',
    icon: '🤖',
    originalPrice: 6000,
    discountedPrice: 3000,
    duration: '1.5 Months (66 Hours)',
    level: 'Ages 8-18',
    description:
      'A junior technology program that introduces robotics, AI concepts, creative problem solving, and hands-on future skills in an accessible learning format.',
    details: [
      {
        heading: 'Program Overview',
        content: [
          'Course duration: 1.5 months.',
          'Total time: 66 hours.',
          'Course fee: 6,000 taka.',
          '50% discount offer price: 3,000 taka.',
        ],
      },
      {
        heading: 'Learning Focus',
        content: [
          'Robotics foundations for young learners.',
          'AI awareness and beginner-friendly practical activities.',
          'Creative technology problem solving and future-ready thinking.',
        ],
      },
    ],
  },
];

async function backfillMissingSlugs() {
  const missing = await CourseModel.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }],
  }).lean();
  if (missing.length === 0) return;

  console.log(`[seed] Backfilling slugs for ${missing.length} legacy course(s)…`);
  for (const course of missing) {
    const slug = await generateUniqueCourseSlug(
      course.title,
      String(course._id),
    );
    await CourseModel.updateOne({ _id: course._id }, { $set: { slug } });
  }
}

interface CryptoApi {
  hash: (password: string) => Promise<string>;
}

export async function runSeed(crypto: CryptoApi) {
  await backfillMissingSlugs();

  // Primary admin account — matches credentials used to sign into /admin.
  if (!(await storage.getUserByUsername('contact.beprobd@gmail.com'))) {
    await storage.createUser({
      username: 'contact.beprobd@gmail.com',
      password: await crypto.hash('TeamBepro@2026'),
      role: 'admin',
      fullName: 'BePro Admin',
      email: 'contact.beprobd@gmail.com',
      phone: null,
    });
  }

  const existing = await storage.getCourses();
  if (existing.length > 0) return;

  console.log('[seed] Seeding initial data…');

  for (const course of SEED_COURSES) {
    await storage.createCourse(course);
  }

  console.log(`[seed] Created ${SEED_COURSES.length} courses`);
}
