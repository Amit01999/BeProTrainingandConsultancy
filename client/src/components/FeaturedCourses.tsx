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
import type { Course } from '@shared/schema';

type TabType = 'all' | 'government' | 'skillsboost';

const FeaturedCourses = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { data: allCourses = [], isLoading, error } = useCourses();
  const { t, i18n } = useTranslation(['common', 'courses', 'messages']);
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
      console.log('=========================');
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
      console.log('================================');
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
      console.log('==========================');
      return filtered;
    }

    return allCourses;
  }, [allCourses, activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen px-6 lg:px-16">
      {/* Improved Tab Filter Section - Sticky */}
      <section className=" backdrop-blur-lg ">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-center py-5 overflow-x-auto scrollbar-hide">
            <div className="flex bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-1 gap-2">
              <button
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap flex items-center border-2 ${
                  activeTab === 'all'
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-700 bg-white border-transparent hover:border-black'
                } ${isBangla ? 'font-bangla' : ''}`}
                onClick={() => handleTabChange('all')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                {t('courses:filters.allCourses')} ▼
              </button>

              <button
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap flex items-center border-2 ${
                  activeTab === 'government'
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-700 bg-white border-transparent hover:border-black'
                } ${isBangla ? 'font-bangla' : ''}`}
                onClick={() => handleTabChange('government')}
              >
                <Award className="h-4 w-4 mr-2" />
                {t('courses:filters.government')}
              </button>

              <button
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap flex items-center border-2 ${
                  activeTab === 'skillsboost'
                    ? 'bg-primary text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-700 bg-white border-transparent hover:border-black'
                } ${isBangla ? 'font-bangla' : ''}`}
                onClick={() => handleTabChange('skillsboost')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {t('courses:filters.skillsBoost')}
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
              <p className={`mt-6 text-lg text-gray-600 font-medium ${isBangla ? 'font-bangla' : ''}`}>
                {t('messages:loading.courses')}
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
              {/* Section Header */}
              {/* <div className="text-center md:text-left space-y-3">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                  {activeTab === 'all' && 'All Available Courses'}
                  {activeTab === 'government' && 'NSDA Approved Courses'}
                  {activeTab === 'skillsboost' && 'SkillsBoost Programs'}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                  {activeTab === 'all' &&
                    `Discover ${filteredCourses.length} professional courses across all categories`}
                  {activeTab === 'government' &&
                    `${filteredCourses.length} government-certified skill development programs with job placement support`}
                  {activeTab === 'skillsboost' &&
                    `${filteredCourses.length} soft skills training programs for professional excellence and career growth`}
                </p>
              </div> */}

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
    <Card className="group h-full flex flex-col bg-white transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <CardHeader className="p-5 space-y-3 border-b-2 border-black">
        {/* Category Badge and Price Row */}
        <div className="flex items-center justify-between gap-3">
          <Badge
            className={`${getBadgeStyles(
              course.category
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
          className="w-full font-semibold py-2.5 text-sm group/btn"
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

export default FeaturedCourses;
