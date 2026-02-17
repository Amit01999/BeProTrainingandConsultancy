import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Lock,
  CheckCircle,
  Award,
  Briefcase,
  Tag,
  GraduationCap,
  Star,
  Check,
  ShieldCheck,
  BarChart2,
  Layers,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { coursesData } from '@/data/coursesData';

export default function CourseDetail1() {
  const [, params] = useRoute('/courses1/:id');
  const id = params ? Number(params.id) : undefined;
  const course = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Course Not Found</h1>
        <p className="text-gray-500">
          The course you're looking for doesn't exist.
        </p>
        <Link to="/courses">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const isFree = course.discountedPrice === 0;
  const discount = !isFree
    ? Math.round(
        ((course.originalPrice - course.discountedPrice) /
          course.originalPrice) *
          100,
      )
    : 0;

  return (
    <>
      <Helmet>
        <title>{course.title}</title>
      </Helmet>

      {/* ──────── HERO SECTION with Course Image ──────── */}
      <div className="relative w-full h-[420px] md:h-[460px] overflow-hidden">
        {/* Course Image as Background */}
        {course.img ? (
          <img
            src={course.img}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900" />
        )}

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

        {/* Hero Content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-between py-6">
          {/* Back link */}
          <Link to="/courses">
            <span className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </span>
          </Link>

          {/* Title + Meta */}
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 backdrop-blur-sm ${
                  course.category === 'nsda'
                    ? 'bg-blue-500/25 text-blue-300'
                    : 'bg-emerald-500/25 text-emerald-300'
                }`}
              >
                {course.category === 'nsda' ? (
                  <>
                    <Award className="w-3 h-3 mr-1 inline" />
                    NSDA Certified
                  </>
                ) : (
                  <>
                    <Star className="w-3 h-3 mr-1 inline" />
                    Skills Program
                  </>
                )}
              </Badge>

              {isFree ? (
                <Badge className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/90 text-white border-0">
                  Free Program
                </Badge>
              ) : (
                <Badge className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/90 text-white border-0">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-tight mb-3">
              {course.title}
            </h1>
            <p className="text-white/70 text-base leading-relaxed line-clamp-3">
              {course.description}
            </p>

            {/* Quick stats strip */}
            <div className="flex flex-wrap items-center gap-5 mt-5">
              <span className="flex items-center gap-1.5 text-white/65 text-sm">
                <Clock className="w-4 h-4 text-white/40" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-white/65 text-sm">
                <BarChart2 className="w-4 h-4 text-white/40" /> {course.level}
              </span>
              <span className="flex items-center gap-1.5 text-white/65 text-sm">
                <Layers className="w-4 h-4 text-white/40" />
                {course.category === 'nsda'
                  ? 'Government (NSDA)'
                  : 'Skill Development'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ──────── MAIN CONTENT ──────── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* ── LEFT: Course Details ── */}
            <div className="lg:col-span-2 space-y-4">
              {course.details.map((section, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                    <div
                      className={`p-2 rounded-lg ${
                        i === 0
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-purple-50 text-purple-600'
                      }`}
                    >
                      {i === 0 ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Briefcase className="w-4 h-4" />
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">
                      {section.heading}
                    </h2>
                  </div>

                  {/* Content list */}
                  <ul className="px-5 py-4 space-y-2.5">
                    {section.content.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="space-y-4 sticky top-4">
              {/* Pricing Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-5 py-5">
                  <p className="text-indigo-200 text-xs font-medium uppercase tracking-wide mb-1.5">
                    Total Course Fee
                  </p>
                  {isFree ? (
                    <p className="text-3xl font-bold text-white">Free</p>
                  ) : (
                    <div className="flex items-end gap-2 flex-wrap">
                      <p className="text-3xl font-bold text-white">
                        ৳{course.discountedPrice.toLocaleString()}
                      </p>
                      <p className="text-indigo-300 line-through text-sm pb-1">
                        ৳{course.originalPrice.toLocaleString()}
                      </p>
                      <Badge className="mb-0.5 bg-orange-400 text-white text-xs border-0 px-2">
                        -{discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Meta items */}
                <div className="px-5 py-4 space-y-3 border-b border-gray-100">
                  {[
                    {
                      icon: <Clock className="w-4 h-4 text-indigo-400" />,
                      label: 'Duration',
                      value: course.duration,
                    },
                    {
                      icon: <BarChart2 className="w-4 h-4 text-purple-400" />,
                      label: 'Level',
                      value: course.level,
                    },
                    {
                      icon: <Tag className="w-4 h-4 text-emerald-400" />,
                      label: 'Category',
                      value:
                        course.category === 'nsda'
                          ? 'Government (NSDA)'
                          : 'Skill Development',
                    },
                  ].map((meta, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        {meta.icon} {meta.label}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {meta.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-5 py-4">
                  <Link to="/login">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer">
                      Enroll Now
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>

              {/* Why Choose Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  Why Choose This Course?
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Industry-relevant curriculum',
                    'Expert instructors & mentors',
                    'Hands-on practical training',
                    'Career placement support',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
