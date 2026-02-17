import { useState, useMemo, useEffect } from 'react';
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
import { TrendingUp, GraduationCap, Award, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useCourses } from '@/hooks/use-courses';
import { useTranslation } from 'react-i18next';
import { useLocalizedCourse } from '@/hooks/use-localized-content';
import { SEO } from '@/components/SEO';
import type { Course } from '@shared/schema';

type TabType = 'all' | 'government' | 'skillsboost';

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { data: allCourses = [], isLoading, error } = useCourses();
  const { t, i18n } = useTranslation(['pages', 'common', 'courses']);
  const isBangla = i18n.language === 'bn';

  // Debug: Log all courses when they're loaded
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      console.log('=== ALL COURSES DEBUG ===');
      console.log('Total courses:', allCourses.length);
      allCourses.forEach((course, index) => {
        console.log(`Course ${index + 1}:`, {
          title: course.title,
          titleBn: course.titleBn,
          category: course.category,
          level: course.level,
        });
      });
    }
  }, [allCourses]);

  // Filter courses based on active tab with FIXED logic for actual database categories
  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) {
      return [];
    }

    if (activeTab === 'all') {
      return allCourses;
    }

    if (activeTab === 'government') {
      // Filter courses with "NSDA" in category (matches "NSDA (RPL/RTO)")
      const filtered = allCourses.filter(course => {
        const category = course.category?.toUpperCase() || '';
        return category.includes('NSDA');
      });
      console.log('=== GOVERNMENT (NSDA) FILTER ===');
      console.log('Filtered courses count:', filtered.length);
      filtered.forEach(course => {
        console.log('- ', course.title, '(Category:', course.category, ')');
      });
      return filtered;
    }

    if (activeTab === 'skillsboost') {
      // SkillsBoost courses: Any course related to skill development, soft skills, career development
      const filtered = allCourses.filter(course => {
        const title = course.title?.toLowerCase() || '';
        const titleBn = course.titleBn || '';
        const category = course.category?.toLowerCase() || '';

        // Match titles containing "soft"
        const titleMatch = title.includes('soft');
        const titleBnMatch = titleBn.includes('সফট');

        // Match categories containing skill/development/career/communication/corporate skill keywords
        const categoryMatch =
          category.includes('skill') || // Matches: "Skill Development", "Corporate Skill", "Communication Skill"
          category.includes('development') || // Matches: "Skill Development", "Career Development"
          category.includes('career') || // Matches: "Career Development"
          category.includes('communication') || // Matches: "Communication Skill"
          category.includes('corporate'); // Matches: "Corporate Skill"

        return titleMatch || titleBnMatch || categoryMatch;
      });

      console.log('=== SKILLSBOOST FILTER ===');
      console.log('Filtered courses count:', filtered.length);
      filtered.forEach(course => {
        console.log('- ', course.title, '(Category:', course.category, ')');
      });
      return filtered;
    }

    return allCourses;
  }, [allCourses, activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Get course counts for each tab
  const courseCounts = useMemo(() => {
    if (!allCourses || allCourses.length === 0) {
      return { all: 0, government: 0, skillsboost: 0 };
    }

    // Count government courses (those with "NSDA" in category)
    const government = allCourses.filter(course => {
      const category = course.category?.toUpperCase() || '';
      return category.includes('NSDA');
    }).length;

    // Count skillsboost courses
    const skillsboost = allCourses.filter(course => {
      const title = course.title?.toLowerCase() || '';
      const titleBn = course.titleBn || '';
      const category = course.category?.toLowerCase() || '';

      const titleMatch = title.includes('soft');
      const titleBnMatch = titleBn.includes('সফট');
      const categoryMatch =
        category.includes('skill') ||
        category.includes('development') ||
        category.includes('career') ||
        category.includes('communication') ||
        category.includes('corporate');

      return titleMatch || titleBnMatch || categoryMatch;
    }).length;

    return {
      all: allCourses.length,
      government,
      skillsboost,
    };
  }, [allCourses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>Courses | BePro Training & Consultancy</title>
        <meta
          name="description"
          content="Explore NSDA-approved government courses and SkillsBoost programs. Graphic Design, Digital Marketing, Soft Skills Training, and more."
        />
      </Helmet>

      {/* Enhanced Hero Section */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#9F7AEA] via-[#8B5CF6] to-[#FF6947]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
        bg-white/20 backdrop-blur-sm border border-white/40 
        text-white font-medium mb-6 animate-fade-in"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Professional Skill Development
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold 
        mb-6 text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)] 
        tracking-tight animate-slide-up"
            >
              COURSES
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl lg:text-3xl 
        text-white/90 font-bangla leading-relaxed mb-8 
        animate-slide-up-delay max-w-3xl mx-auto 
        drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              Government-certified (NSDA-approved) courses and skill development
              programs
              {/* এনএসডিএ অনুমোদিত সরকারি কোর্স এবং স্কিলসবুস্ট প্রোগ্রাম */}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white">
              {/* Courses Count */}
              <div className="text-center animate-fade-in-delay">
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                  {allCourses.length}+
                </div>
                <div className="text-sm md:text-base text-white/85 mt-1">
                  Courses
                </div>
              </div>

              {/* Students */}
              <div className="text-center animate-fade-in-delay-2">
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                  500+
                </div>
                <div className="text-sm md:text-base text-white/85 mt-1">
                  Students
                </div>
              </div>

              {/* Success Rate */}
              <div className="text-center animate-fade-in-delay-3">
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                  95%
                </div>
                <div className="text-sm md:text-base text-white/85 mt-1">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50L60 45C120 40 240 30 360 25C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Improved Tab Filter Section - Sticky */}
      <section className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg ">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-center py-5 overflow-x-auto scrollbar-hide">
            <div className="flex bg-white rounded-3xl shadow-sm border border-gray-200 p-1 space-x-0">
              <button
                className={`relative px-4 py-2 text-sm font-medium rounded-3xl transition-all duration-200 whitespace-nowrap flex items-center ${
                  activeTab === 'all'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('all')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                All Courses ▼
              </button>

              <button
                className={`relative px-4 py-2 text-sm font-medium rounded-3xl transition-all duration-200 whitespace-nowrap flex items-center ${
                  activeTab === 'government'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('government')}
              >
                <Award className="h-4 w-4 mr-2" />
                Government (NSDA)
              </button>

              <button
                className={`relative px-4 py-2 text-sm font-medium rounded-3xl transition-all duration-200 whitespace-nowrap flex items-center ${
                  activeTab === 'skillsboost'
                    ? 'bg-primary text-white shadow-lg ml-[-4px] '
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => handleTabChange('skillsboost')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Skills Development Programs
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Courses Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-[#FF6947] border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-6 text-lg text-gray-600 font-medium">
                Loading courses...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-xl text-red-600 font-semibold mb-2">
                Failed to load courses
              </p>
              <p className="text-gray-600">
                Please try again later or contact support.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <TrendingUp className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                No courses found
              </p>
              <p className="text-gray-600">
                {activeTab === 'government' &&
                  'No NSDA government courses available at the moment.'}
                {activeTab === 'skillsboost' &&
                  'No SkillsBoost courses available at the moment.'}
                {activeTab === 'all' &&
                  'No courses available. Please check back later.'}
              </p>
            </div>
          )}

          {/* Courses Grid */}
          {!isLoading && !error && filteredCourses.length > 0 && (
            <div className="space-y-10">
              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredCourses.map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Upgrade Your Skills?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-bangla max-w-2xl mx-auto">
              {/* আপনার জন্য সঠিক কোর্স বেছে নিতে আমাদের সাথে যোগাযোগ করুন। আমরা
              আপনার ক্যারিয়ার লক্ষ্য অর্জনে সহায়তা করতে প্রস্তুত। */}
              Get in touch with us to find the right course for you. We are
              committed to helping you achieve your career goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#FF6947] to-[#FF8A5B] hover:from-[#FF8A5B] hover:to-[#FF6947] text-white font-semibold px-6 py-3 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/contact">Contact Us Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 text-lg shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Professional Tab Button Component with Count Badge
const TabButton = ({
  active,
  onClick,
  children,
  icon,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={`
      group relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm
      transition-all duration-300 whitespace-nowrap
      ${
        active
          ? 'bg-gradient-to-r from-[#FF6947] to-[#FF8A5B] text-white shadow-md'
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    {icon && (
      <span
        className={`transition-transform duration-300 ${
          active ? 'scale-110' : 'group-hover:scale-110'
        }`}
      >
        {icon}
      </span>
    )}
    <span className="font-semibold">{children}</span>
    {count !== undefined && count > 0 && (
      <span
        className={`
        ml-1 px-2 py-0.5 rounded-full text-xs font-bold
        ${active ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-700'}
      `}
      >
        {count}
      </span>
    )}
  </button>
);

// Professional Industry-Standard Course Card Component
const CourseCard = ({ course }: { course: Course }) => {
  // Determine badge styles based on category
  const getBadgeStyles = (category: string) => {
    const cat = category?.toUpperCase() || '';
    if (cat.includes('NSDA'))
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (cat.includes('SKILL'))
      return 'bg-purple-50 text-purple-700 border-purple-200';
    if (cat.includes('CORPORATE'))
      return 'bg-amber-50 text-amber-700 border-amber-200';
    if (cat.includes('COMMUNICATION'))
      return 'bg-rose-50 text-rose-700 border-rose-200';
    if (cat.includes('CAREER'))
      return 'bg-blue-50 text-blue-700 border-blue-200';
    if (cat.includes('JOB')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <Card className="group h-full flex flex-col bg-white hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#FF6947]/50 rounded-xl overflow-hidden">
      {/* Card Header */}
      <CardHeader className="p-5 space-y-3 border-b border-gray-100">
        {/* Category Badge and Price Row */}
        <div className="flex items-center justify-between gap-3">
          <Badge
            className={`${getBadgeStyles(
              course.category,
            )} border text-xs font-semibold px-2.5 py-1`}
          >
            {course.category}
            {course.level && ` • ${course.level}`}
          </Badge>
          {course.fee && (
            <span className="text-lg font-bold text-[#FF6947]">
              {course.fee}
            </span>
          )}
        </div>

        {/* Course Title */}
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {course.title}
          </CardTitle>
          {course.titleBn && (
            <CardDescription className="font-bangla text-sm text-gray-600 line-clamp-1">
              {course.titleBn}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-1 p-5 space-y-4">
        {/* Description */}
        {course.description && (
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Features List - Compact */}
        {course.features && course.features.length > 0 && (
          <div className="space-y-2">
            {course.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-[#FF6947] flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-[#9F7AEA] to-[#B794F6] hover:from-[#FF6947] hover:to-[#FF8A5B] text-white font-semibold py-2.5 text-sm shadow-md hover:shadow-lg transition-all duration-300 rounded-lg group/btn"
        >
          <Link
            to={`/courses/${course._id}`}
            className="flex items-center justify-center gap-2"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoursesPage;
