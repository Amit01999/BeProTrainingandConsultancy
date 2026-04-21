import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Award,
  Briefcase,
  Languages,
  ArrowRight,
  BookOpen,
  Layers,
  Tag,
  GraduationCap,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { coursesData, type Course } from '@/data/coursesData';

type FilterTab = 'all' | 'nsda' | 'skills' | 'language';

const filterTabs: {
  key: FilterTab;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'all',
    label: 'All Courses',
    shortLabel: 'All',
    icon: <Layers className="h-4 w-4" />,
  },
  {
    key: 'nsda',
    label: 'Government (NSDA)',
    shortLabel: 'NSDA',
    icon: <Award className="h-4 w-4" />,
  },
  {
    key: 'skills',
    label: 'Skills Development Programs',
    shortLabel: 'Skills',
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    key: 'language',
    label: 'Language Training',
    shortLabel: 'Language',
    icon: <Languages className="h-4 w-4" />,
  },
];

const FeaturedCourses1 = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const filtered: Course[] =
    activeTab === 'all'
      ? coursesData
      : coursesData.filter(c => c.category === activeTab);

  return (
    <div className="min-h-screen bg-[rgb(var(--whitebackground))]">
      <section className="py-2 sm:py-16 md:py-2 px-3 sm:px-6 lg:px-20 backdrop-blur-lg w-full">
        <div className="container mx-auto max-w-screen-2xl">
          <div className="flex items-center justify-center mb-8 md:mb-6">
            <div className="w-full flex justify-center overflow-x-auto scrollbar-hide py-4 sm:py-5 -mx-1 px-1">
              <div className="inline-flex bg-white rounded-lg sm:rounded-xl border-2 border-black p-0.5 sm:p-1 gap-1 sm:gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                {filterTabs.map(tab => {
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`
              relative inline-flex items-center gap-1.5 sm:gap-2
              px-3.5 sm:px-4 py-2 sm:py-2.5
              text-[11px] sm:text-sm font-semibold
              rounded-md sm:rounded-lg
              whitespace-nowrap border-2
              transition-all duration-200
              cursor-pointer select-none
              ${
                isActive
                  ? 'bg-primary text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-gray-600 bg-white border-transparent hover:border-black hover:text-primary'
              }
            `}
                    >
                      <span className="hidden sm:inline-flex">{tab.icon}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
            {filtered.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  const isFree = course.discountedPrice === 0;
  const hasDiscount = !isFree && course.originalPrice > course.discountedPrice;
  const discount = hasDiscount
    ? Math.round(
        ((course.originalPrice - course.discountedPrice) /
          course.originalPrice) *
          100,
      )
    : 0;

  return (
    <Link
      to={`/courses1/${course.id}`}
      className="group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className="
          relative h-full flex flex-col bg-white
          rounded-2xl overflow-hidden
          border border-slate-400
          shadow-[0_2px_20px_rgba(0,0,0,0.06)]
          hover:border-orange-400
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]
          hover:-translate-y-1
          transition-all duration-300 ease-out
        "
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.img}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-0 left-0">
            {isFree ? (
              <span className="flex items-center gap-1 pl-3 pr-4 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-br-2xl shadow-[0_2px_10px_rgba(22,163,74,0.45)]">
                <Tag className="h-2.5 w-2.5" />
                Free
              </span>
            ) : hasDiscount ? (
              <span className="flex items-center gap-1 pl-3 pr-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-br-2xl shadow-[0_2px_10px_rgba(249,115,22,0.45)]">
                <Tag className="h-2.5 w-2.5" />
                {discount}% OFF
              </span>
            ) : null}
          </div>

          <div className="absolute top-0 right-0">
            <span className="flex items-center gap-1.5 pr-3 pl-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] bg-black/50 backdrop-blur-sm text-white rounded-bl-2xl border-b border-l border-white/10">
              {course.category === 'nsda' ? (
                <Award className="h-3 w-3 text-amber-300" />
              ) : course.category === 'language' ? (
                <Languages className="h-3 w-3 text-cyan-300" />
              ) : (
                <Briefcase className="h-3 w-3 text-sky-300" />
              )}
              {course.category === 'nsda'
                ? 'NSDA'
                : course.category === 'language'
                  ? 'Language'
                  : 'Skills'}
            </span>
          </div>

          {course.programTags?.length ? (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
              {course.programTags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] bg-white/90 text-slate-900 border border-white/70 backdrop-blur-sm shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
          <h3 className="text-[14.5px] font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200 flex-1">
            {course.title}
          </h3>

          <div className="flex items-center justify-between gap-3 mt-4 pt-3.5 border-t-2 border-dashed border-gray-100">
            <div>
              {isFree ? (
                <span className="text-xl font-black text-green-500 leading-none">
                  Free
                </span>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-gray-900 leading-none">
                    {`৳${course.discountedPrice.toLocaleString()}`}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">
                      {`৳${course.originalPrice.toLocaleString()}`}
                    </span>
                  )}
                </div>
              )}
            </div>

            <Button
              size="sm"
              className="transition-all duration-300 bg-orange-500 hover:bg-orange-600 flex-shrink-0"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCourses1;
