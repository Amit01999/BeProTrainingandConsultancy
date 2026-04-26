import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Award,
  Briefcase,
  Languages,
  ArrowRight,
  Layers,
  Tag,
  GraduationCap,
  Loader2,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { useCourses } from '@/hooks/use-courses';
import type { Course } from '@shared/schema';

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

const IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200';

function normalizeCategory(value: string): FilterTab | 'other' {
  const v = value.toLowerCase();
  if (v === 'nsda') return 'nsda';
  if (v === 'language') return 'language';
  if (v === 'skills' || v === 'skill development' || v === 'skillsboost')
    return 'skills';
  return 'other';
}

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCourses();

  const filtered = useMemo<Course[]>(() => {
    if (activeTab === 'all') return courses;
    return courses.filter(c => normalizeCategory(c.category) === activeTab);
  }, [courses, activeTab]);

  return (
    <div className="min-h-screen bg-[rgb(var(--whitebackground))]">
      <Helmet>
        <title>Courses | BePro Training & Consultancy</title>
        <meta
          name="description"
          content="Explore NSDA-approved government courses and private training programs. Graphic Design, Digital Marketing, Entrepreneurship, and more."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 container mx-auto px-6 lg:px-16 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white font-medium mb-6 animate-fade-in">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Professional Skill Development
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)] tracking-tight animate-slide-up">
              COURSES
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-bangla leading-relaxed mb-8 animate-slide-up-delay max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              Government-certified (NSDA-approved) courses and skill development
              programs
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white">
              <div className="text-center animate-fade-in-delay">
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                  {courses.length}+
                </div>
                <div className="text-sm md:text-base text-white/85 mt-1">
                  Courses
                </div>
              </div>
              <div className="text-center animate-fade-in-delay-2">
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
                  500+
                </div>
                <div className="text-sm md:text-base text-white/85 mt-1">
                  Students
                </div>
              </div>
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

      <section className="py-14 md:py-2 px-6 lg:px-16">
        <div className="container mx-auto">
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

          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mr-3" />
              Loading courses…
            </div>
          ) : isError ? (
            <div className="max-w-md mx-auto text-center py-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We couldn&apos;t load the course list
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {(error as Error)?.message ||
                  'The server may still be starting up. Please try again in a moment.'}
              </p>
              <Button
                onClick={() => refetch()}
                disabled={isFetching}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Retrying…
                  </>
                ) : (
                  'Retry'
                )}
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              No courses found in this category yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filtered.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative mt-16 py-20 md:py-28 bg-gradient-to-br from-primary/10 via-indigo-50 to-rose-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/30 to-indigo-400/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-rose-400/30 to-primary/30 rounded-full blur-3xl opacity-40" />

        <div className="relative container mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
            Need Help Choosing the Right Course?
          </h2>
          <p className="text-gray-700 mb-10 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
            Our team can help you find the perfect course to match your goals
            and career aspirations.
          </p>
          <Button
            asChild
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/40 px-10 h-14 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            <Link to="/contact" className="flex items-center gap-2">
              Contact Us
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
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
  const discounted = course.discountedPrice ?? 0;
  const original = course.originalPrice ?? 0;
  const isFree = discounted === 0 && original === 0;
  const hasDiscount = !isFree && original > discounted && discounted > 0;
  const discount = hasDiscount
    ? Math.round(((original - discounted) / original) * 100)
    : 0;
  const categoryKind = normalizeCategory(course.category);
  const image = course.imageUrl || IMAGE_FALLBACK;

  return (
    <Link
      to={`/courses/${course.slug}`}
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
            src={image}
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
              {categoryKind === 'nsda' ? (
                <Award className="h-3 w-3 text-amber-300" />
              ) : categoryKind === 'language' ? (
                <Languages className="h-3 w-3 text-cyan-300" />
              ) : (
                <Briefcase className="h-3 w-3 text-sky-300" />
              )}
              {categoryKind === 'nsda'
                ? 'NSDA'
                : categoryKind === 'language'
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
                    {`৳${discounted.toLocaleString()}`}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">
                      {`৳${original.toLocaleString()}`}
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

export default CoursesPage;
