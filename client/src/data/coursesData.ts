import c1 from '../asset/course/1.png';
import c2 from '../asset/course/2.png';
import c3 from '../asset/course/3.png';
import c4 from '../asset/course/4.png';
import c5 from '../asset/course/5.png';
import c6 from '../asset/course/6.png';
import c7 from '../asset/course/7.png';
import c8 from '../asset/course/8.png';

export interface CourseDetail {
  heading: string;
  content: string[];
}

export interface Course {
  id: number;
  title: string;
  category: 'skills' | 'nsda';
  img: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  originalPrice: number;
  discountedPrice: number;
  duration: string;
  level: string;
  description: string;
  details: CourseDetail[];
}

export const coursesData: Course[] = [
  // ─── Government (NSDA) Courses (6–8) ───
  {
    id: 6,
    title: 'Graphic Design (L-2)',
    category: 'nsda',
    img: c3,
    gradientFrom: '#a18cd1',
    gradientTo: '#fbc2eb',
    icon: '🎨',
    originalPrice: 0,
    discountedPrice: 0,
    duration: '3 Days',
    level: 'Level 2',
    description:
      'Are you skilled in Graphics Design? Do you know Adobe Photoshop, Adobe Illustrator, MS Office, and basic Internet tools? NSDA provides government-recognized certification after skill verification.',
    details: [
      {
        heading: 'Program Structure',
        content: ['3-day program: 2 days skill orientation + 1 day assessment'],
      },
      {
        heading: 'Prerequisites',
        content: [
          'Minimum 1 year work experience',
          'Adobe Photoshop',
          'Adobe Illustrator',
          'MS Office',
          'Basic Internet usage',
        ],
      },
      {
        heading: 'Generic Competencies',
        content: ['Practice negotiation skills'],
      },
      {
        heading: 'Sector-Specific Competencies',
        content: [
          'Prepare documents and presentations for clients',
          'Maintain freelancing marketplace profiles',
        ],
      },
      {
        heading: 'Occupation-Specific Competencies',
        content: [
          'Apply visual design principles and color sense',
          'Perform basic image editing',
          'Develop design concepts and sketches',
          'Produce professional designs using vector tools',
          'Utilize AI tools for design',
          'Develop mock-ups',
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Graphic Design for Freelancing – Level 3',
    category: 'nsda',
    img: c1,
    gradientFrom: '#6a11cb',
    gradientTo: '#2575fc',
    icon: '💼',
    originalPrice: 0,
    discountedPrice: 0,
    duration: '3 Days',
    level: 'Level 3',
    description:
      'Are you skilled in Graphics Design? Do you know Adobe Photoshop, Adobe Illustrator, MS Office, and basic Internet tools? NSDA provides skill-based certification through assessment.',
    details: [
      {
        heading: 'Program Structure',
        content: ['3-day program: 2 days skill orientation + 1 day assessment'],
      },
      {
        heading: 'Prerequisites',
        content: [
          'Minimum 1 year experience',
          'Adobe Photoshop',
          'Adobe Illustrator',
          'MS Office',
          'Basic Internet',
        ],
      },
      {
        heading: 'Generic Competencies',
        content: ['Practice negotiation skills'],
      },
      {
        heading: 'Sector-Specific Competencies',
        content: [
          'Prepare documents and presentations for clients',
          'Maintain freelancing marketplace',
        ],
      },
      {
        heading: 'Occupation-Specific Competencies',
        content: [
          'Interpret visual design principles',
          'Perform basic image editing',
          'Develop design concepts',
          'Produce designs using vector tools',
          'Utilize AI tools',
          'Develop mock-ups',
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Digital Marketing for Freelancing – Level 3',
    category: 'nsda',
    img: c2,
    gradientFrom: '#ff9a9e',
    gradientTo: '#fecfef',
    icon: '📈',
    originalPrice: 0,
    discountedPrice: 0,
    duration: '3 Days',
    level: 'Level 3',
    description:
      'Are you skilled in Digital Marketing? Do you know how to manage ad campaigns, apply local SEO, and use analytics tools? NSDA provides certification through skill assessment.',
    details: [
      {
        heading: 'Program Structure',
        content: ['3-day program: 2 days orientation + 1 day assessment'],
      },
      {
        heading: 'Prerequisites',
        content: [
          'Minimum 1 year experience',
          'Create and manage ad campaigns',
          'Apply local SEO techniques',
          'Google Webmaster Tools',
          'Google Analytics',
          'Email marketing',
          'Video marketing',
        ],
      },
      {
        heading: 'Competency Standard (CS)',
        content: [
          'Create and manage ad campaigns',
          'Apply local SEO techniques',
          'Set up Google Webmaster Tools & Analytics',
          'Practice email marketing',
          'Apply video marketing',
        ],
      },
    ],
  },
  // ─── Skills Development Programs (1–5) ───
  {
    id: 1,
    title: 'Language Training Program',
    category: 'skills',
    img: c4,
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    icon: '🌐',
    originalPrice: 8000,
    discountedPrice: 4000,
    duration: '30 Days',
    level: 'All Levels',
    description:
      'Basic to Intermediate language training for students and professionals.',
    details: [
      {
        heading: "What you'll learn",
        content: [
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Soft Skill Development',
    category: 'skills',
    img: c5,
    gradientFrom: '#f093fb',
    gradientTo: '#f5576c',
    icon: '🎤',
    originalPrice: 4000,
    discountedPrice: 2000,
    duration: '7 Days',
    level: 'All Levels',
    description:
      'Build essential professional soft skills including public speaking, leadership, and emotional intelligence.',
    details: [
      {
        heading: 'Training Topics',
        content: [
          '📍 Public Speaking & Presentation — Learn to speak confidently by removing unclear thinking and hesitation in presentation.',
          '📍 Interview Etiquette & Mock Interview — Training on interview mindset, answering questions, body language, and dress code.',
          '📍 Leadership & Mindset Development — Special sessions to build self-control and leadership mindset.',
          '📍 Communication & Emotional Intelligence — Improve skills using emotional intelligence and sensitive reasoning.',
          '🍀 Creative Thinking & Problem Solving — Learn to think out-of-the-box and handle complex situations effectively.',
          '📄 CV & Email Writing — Training on how to plan and prepare professional CVs and emails effectively.',
          '📌 Workplace Etiquette — Training on office behavior, time management, and teamwork.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Entrepreneurship Development',
    category: 'skills',
    img: c6,
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
          'For over a decade, we have taught leadership to more than 5,000 promising young professionals. We created this program to help founders get kick-started with their ideas through:',
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
    id: 4,
    title: 'Foreign Job Orientation',
    img: c7,
    category: 'skills',
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
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Corporate Training Program',
    category: 'skills',
    img: c8,
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
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
          'Comprehensive curriculum covering industry standards and practical applications',
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
];
