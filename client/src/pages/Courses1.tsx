import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Award, Users, Briefcase, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

interface Course {
  id: string;
  title: string;
  titleBn: string;
  level?: string;
  duration: string;
  description: string;
  descriptionBn: string;
  fee?: string;
  type: 'government' | 'private';
  features: string[];
}

const governmentCourses: Course[] = [
  {
    id: 'gd-l2',
    title: 'Graphic Design',
    titleBn: 'গ্রাফিক ডিজাইন',
    level: 'L-2',
    duration: '২৪ দিন',
    description:
      'Professional graphic design training with industry-standard tools including Adobe Photoshop, Illustrator, and InDesign. NSDA certified course with job placement support.',
    descriptionBn:
      'অ্যাডোবি ফটোশপ, ইলাস্ট্রেটর এবং ইনডিজাইন সহ শিল্প-মানের সরঞ্জাম দিয়ে পেশাদার গ্রাফিক ডিজাইন প্রশিক্ষণ।',
    type: 'government',
    features: [
      'Adobe Suite Training',
      'Portfolio Development',
      'NSDA Certificate',
      'Job Placement Support',
    ],
  },
  {
    id: 'gd-l3',
    title: 'Graphic Design Soft Training',
    titleBn: 'গ্রাফিক ডিজাইন সফট ট্রেনিং',
    level: 'L-3',
    duration: '২৪ দিন',
    description:
      'Advanced graphic design skills combined with soft skills integration for enhanced career success. Includes advanced typography, branding, and client communication.',
    descriptionBn:
      'উন্নত টাইপোগ্রাফি, ব্র্যান্ডিং এবং ক্লায়েন্ট যোগাযোগ সহ উন্নত গ্রাফিক ডিজাইন দক্ষতা।',
    type: 'government',
    features: [
      'Advanced Design Techniques',
      'Branding & Identity',
      'Client Communication',
      'Soft Skills Integration',
    ],
  },
  {
    id: 'dm-l3',
    title: 'Digital Marketing Soft Training',
    titleBn: 'ডিজিটাল মার্কেটিং সফট ট্রেনিং',
    level: 'L-3',
    duration: '২৪ দিন',
    description:
      'Complete digital marketing training covering SEO, social media marketing, Google Ads, content marketing, and analytics with soft skills development.',
    descriptionBn:
      'এসইও, সোশ্যাল মিডিয়া মার্কেটিং, গুগল অ্যাডস, কন্টেন্ট মার্কেটিং এবং অ্যানালিটিক্স সম্পূর্ণ ডিজিটাল মার্কেটিং প্রশিক্ষণ।',
    type: 'government',
    features: [
      'SEO & SEM',
      'Social Media Marketing',
      'Google Analytics',
      'Content Strategy',
    ],
  },
];

const privateCourses: Course[] = [
  {
    id: 'entrepreneur',
    title: 'Entrepreneurship Development Training',
    titleBn: 'উদ্যোক্তা উন্নয়ন প্রশিক্ষণ',
    duration: '৭ দিন',
    fee: '৳২,০০০',
    description:
      'Learn to start and grow your own business with practical entrepreneurship skills. Covers business planning, financial management, marketing, and legal requirements.',
    descriptionBn:
      'ব্যবসা পরিকল্পনা, আর্থিক ব্যবস্থাপনা, মার্কেটিং এবং আইনি প্রয়োজনীয়তা সহ নিজের ব্যবসা শুরু করুন।',
    type: 'private',
    features: [
      'Business Planning',
      'Financial Management',
      'Marketing Strategy',
      'Legal Compliance',
    ],
  },
  {
    id: 'corporate',
    title: 'Corporate Training',
    titleBn: 'কর্পোরেট ট্রেনিং',
    duration: 'Custom',
    description:
      'Tailored training programs for NGOs, banks, hospitals, and corporate organizations. Includes office etiquette, communication, and emotional intelligence.',
    descriptionBn:
      'এনজিও, ব্যাংক, হাসপাতাল এবং কর্পোরেট সংস্থাগুলির জন্য কাস্টমাইজড প্রশিক্ষণ প্রোগ্রাম।',
    type: 'private',
    features: [
      'Office Etiquette',
      'Professional Communication',
      'Team Building',
      'Leadership Skills',
    ],
  },
  {
    id: 'foreign-job',
    title: 'Foreign Job Orientation',
    titleBn: 'বিদেশ চাকরি ওরিয়েন্টেশন',
    duration: '৭ দিন',
    fee: '৳২,০০০',
    description:
      'Comprehensive preparation for overseas job seekers including CV writing, interview skills, basic English, and cultural orientation.',
    descriptionBn:
      'সিভি লেখা, ইন্টারভিউ দক্ষতা, বেসিক ইংরেজি এবং সাংস্কৃতিক ওরিয়েন্টেশন সহ বিদেশী চাকরি প্রস্তুতি।',
    type: 'private',
    features: [
      'CV Writing',
      'Interview Preparation',
      'Basic English',
      'Cultural Training',
    ],
  },
  {
    id: 'language',
    title: 'Language Training',
    titleBn: 'ভাষা প্রশিক্ষণ',
    duration: '৩০ দিন',
    fee: '৳৫,০০০ (German)',
    description:
      'Professional English and German language training for career advancement and overseas opportunities.',
    descriptionBn:
      'ক্যারিয়ার উন্নতি এবং বিদেশী সুযোগের জন্য পেশাদার ইংরেজি এবং জার্মান ভাষা প্রশিক্ষণ।',
    type: 'private',
    features: [
      'Conversational Skills',
      'Business Language',
      'Grammar & Writing',
      'Cultural Context',
    ],
  },
  {
    id: 'higher-study',
    title: 'Higher Study Guidelines',
    titleBn: 'উচ্চশিক্ষা গাইডলাইন',
    duration: 'Consultation',
    description:
      'Expert guidance for students planning to pursue higher education abroad. Includes university selection, application process, and visa guidance.',
    descriptionBn:
      'বিদেশে উচ্চশিক্ষার জন্য পরিকল্পনাকারী শিক্ষার্থীদের জন্য বিশেষজ্ঞ গাইডেন্স।',
    type: 'private',
    features: [
      'University Selection',
      'Application Assistance',
      'Visa Guidance',
      'Scholarship Info',
    ],
  },
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen ">
      <Helmet>
        <title>Courses | BePro Training & Consultancy</title>
        <meta
          name="description"
          content="Explore NSDA-approved government courses and private training programs. Graphic Design, Digital Marketing, Entrepreneurship, and more. কোর্সসমূহ দেখুন।"
        />
      </Helmet>

      {/* Hero */}
      <section
        className="py-16 bg-[#9F7AEA] px-6
      text-primary-foreground lg:px-16"
      >
        <div className="container">
          <div className="max-w-3xl">
            <Badge variant="default" className="mb-4">
              Skill Development
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-accent">Courses</span>
            </h1>
            <p className="text-lg opacity-90 font-bangla">
              এনএসডিএ অনুমোদিত সরকারি কোর্স এবং প্রাইভেট প্রশিক্ষণ প্রোগ্রাম
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-background px-6 lg:px-20">
        <div className="container">
          <Tabs defaultValue="government" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger
                value="government"
                className="flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
                Government (NSDA)
              </TabsTrigger>
              <TabsTrigger value="private" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Private
              </TabsTrigger>
            </TabsList>

            <TabsContent value="government">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  NSDA Approved Courses (RPL & RTO)
                </h2>
                <p className="text-muted-foreground">
                  Government-certified skill development programs with job
                  placement support.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {governmentCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="private">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Private Training Programs
                </h2>
                <p className="text-muted-foreground">
                  Specialized courses for career advancement and
                  entrepreneurship.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {privateCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-6 font-bangla">
            আপনার জন্য সঠিক কোর্স বেছে নিতে আমাদের সাথে যোগাযোগ করুন
          </p>
          <Button asChild variant="default" size="lg">
            <Link to="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <Card className="h-full flex flex-col" id={course.id}>
    <CardHeader>
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge variant={course.type === 'government' ? 'secondary' : 'default'}>
          {course.type === 'government' ? 'NSDA' : 'Private'}
          {course.level && ` • ${course.level}`}
        </Badge>
        {course.fee && (
          <span className="text-lg font-bold text-primary">{course.fee}</span>
        )}
      </div>
      <CardTitle className="text-xl">{course.title}</CardTitle>
      <CardDescription className="font-bangla">
        {course.titleBn}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1">
      <p className="text-sm text-muted-foreground mb-4">{course.description}</p>

      <div className="flex items-center gap-2 text-sm mb-4">
        <Clock className="h-4 w-4 text-primary" />
        <span className="font-bangla">{course.duration}</span>
      </div>

      <div className="space-y-2">
        {course.features.map(feature => (
          <div key={feature} className="flex items-center gap-2 text-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="default" className="w-full">
        <Link to="/contact">Apply Now</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default CoursesPage;
