import { useRoute, Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle,
  Award,
  Briefcase,
  Languages,
  Tag,
  GraduationCap,
  Star,
  Check,
  ShieldCheck,
  BarChart2,
  Layers,
  Loader2,
  Lock,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useCourse } from '@/hooks/use-courses';
import { useAuth } from '@/hooks/use-auth';
import { useMyEnrollments } from '@/hooks/use-enrollments';

const IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200';

function categoryKind(value: string): 'nsda' | 'language' | 'skills' {
  const v = value.toLowerCase();
  if (v === 'nsda') return 'nsda';
  if (v === 'language') return 'language';
  return 'skills';
}

export default function CourseDetail() {
  const [, params] = useRoute('/courses/:slug');
  const [, setLocation] = useLocation();
  const slug = params?.slug;
  const { data: course, isLoading, isError } = useCourse(slug);
  const { user } = useAuth();
  const { data: myEnrollments = [] } = useMyEnrollments(!!user);

  const enrollment = course
    ? myEnrollments.find(e => e.courseId === course._id)
    : undefined;

  function handleEnrollClick() {
    if (!slug) return;
    if (!user) {
      const next = encodeURIComponent(`/dashboard?course=${slug}`);
      setLocation(`/login?next=${next}`);
      return;
    }
    setLocation(`/dashboard?course=${slug}`);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-3" />
        Loading course…
      </div>
    );
  }

  if (isError || !course) {
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

  const discounted = course.discountedPrice ?? 0;
  const original = course.originalPrice ?? 0;
  const isFree = discounted === 0 && original === 0;
  const hasDiscount = !isFree && original > discounted && discounted > 0;
  const discount = hasDiscount
    ? Math.round(((original - discounted) / original) * 100)
    : 0;
  const kind = categoryKind(course.category);
  const image = course.imageUrl || IMAGE_FALLBACK;
  const details = course.details ?? [];
  const programTags = course.programTags ?? [];

  return (
    <>
      <Helmet>
        <title>{course.title}</title>
        {course.description && (
          <meta name="description" content={course.description} />
        )}
      </Helmet>

      <div className="relative w-full h-[420px] md:h-[460px] overflow-hidden">
        <img
          src={image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-between py-6">
          <Link to="/courses">
            <span className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </span>
          </Link>

          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 backdrop-blur-sm ${
                  kind === 'nsda'
                    ? 'bg-blue-500/25 text-blue-300'
                    : kind === 'language'
                      ? 'bg-cyan-500/25 text-cyan-300'
                      : 'bg-emerald-500/25 text-emerald-300'
                }`}
              >
                {kind === 'nsda' ? (
                  <>
                    <Award className="w-3 h-3 mr-1 inline" />
                    NSDA Certified
                  </>
                ) : kind === 'language' ? (
                  <>
                    <Languages className="w-3 h-3 mr-1 inline" />
                    Language Training
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
                  {hasDiscount ? `${discount}% OFF` : 'Course Fee'}
                </Badge>
              )}

              {programTags.map(tag => (
                <Badge
                  key={tag}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-tight mb-3">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-white/70 text-base leading-relaxed line-clamp-3">
                {course.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 mt-5">
              {course.duration && (
                <span className="flex items-center gap-1.5 text-white/65 text-sm">
                  <Clock className="w-4 h-4 text-white/40" /> {course.duration}
                </span>
              )}
              {course.level && (
                <span className="flex items-center gap-1.5 text-white/65 text-sm">
                  <BarChart2 className="w-4 h-4 text-white/40" /> {course.level}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-white/65 text-sm">
                <Layers className="w-4 h-4 text-white/40" />
                {kind === 'nsda'
                  ? 'Government (NSDA)'
                  : kind === 'language'
                    ? 'Language Training'
                    : 'Skill Development'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              {details.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-sm text-gray-500">
                  No additional details have been added for this course yet.
                </div>
              ) : (
                details.map((section, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                  >
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
                ))
              )}

              {enrollment?.status !== 'verified' && (
                <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl border border-indigo-100 shadow-sm p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {enrollment?.status === 'pending'
                        ? 'Your payment is under review'
                        : enrollment?.status === 'initiated'
                          ? 'Complete your bKash payment'
                          : enrollment?.status === 'rejected'
                            ? 'Your last payment was rejected'
                            : 'Full course content is locked'}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {enrollment?.status === 'pending'
                        ? "We'll unlock classes and materials as soon as an admin verifies your bKash payment (within 24 hours)."
                        : enrollment?.status === 'initiated'
                          ? 'You started enrolling but haven\'t submitted payment yet. Finish from your dashboard to unlock the course.'
                          : enrollment?.status === 'rejected'
                            ? enrollment.notes
                              ? `Reason: ${enrollment.notes}. You can retry the payment from your dashboard.`
                              : 'Please submit a new payment from your dashboard to regain access.'
                            : 'Complete enrollment with bKash to unlock classes, materials, and certificate.'}
                    </p>
                  </div>
                </div>
              )}

              {course.features && course.features.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                      <Star className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-semibold text-gray-800">
                      Program Highlights
                    </h2>
                  </div>
                  <ul className="px-5 py-4 space-y-2.5">
                    {course.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4 sticky top-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-5 py-5">
                  <p className="text-indigo-200 text-xs font-medium uppercase tracking-wide mb-1.5">
                    Total Course Fee
                  </p>
                  {isFree ? (
                    <p className="text-3xl font-bold text-white">Free</p>
                  ) : (
                    <div className="flex items-end gap-2 flex-wrap">
                      <p className="text-3xl font-bold text-white">
                        {`৳${discounted.toLocaleString()}`}
                      </p>
                      {hasDiscount && (
                        <>
                          <p className="text-indigo-300 line-through text-sm pb-1">
                            {`৳${original.toLocaleString()}`}
                          </p>
                          <Badge className="mb-0.5 bg-orange-400 text-white text-xs border-0 px-2">
                            -{discount}%
                          </Badge>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 space-y-3 border-b border-gray-100">
                  {[
                    {
                      icon: <Clock className="w-4 h-4 text-indigo-400" />,
                      label: 'Duration',
                      value: course.duration || '—',
                    },
                    {
                      icon: <BarChart2 className="w-4 h-4 text-purple-400" />,
                      label: 'Level',
                      value: course.level || '—',
                    },
                    {
                      icon: <Tag className="w-4 h-4 text-emerald-400" />,
                      label: 'Category',
                      value:
                        kind === 'nsda'
                          ? 'Government (NSDA)'
                          : kind === 'language'
                            ? 'Language Training'
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

                <div className="px-5 py-4">
                  {enrollment?.status === 'verified' ? (
                    <Button
                      disabled
                      className="w-full bg-emerald-600 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Enrolled
                    </Button>
                  ) : enrollment?.status === 'pending' ? (
                    <Button
                      disabled
                      className="w-full bg-amber-500 hover:bg-amber-500 text-white font-semibold py-2.5 rounded-lg"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Payment under review
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEnrollClick}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {enrollment?.status === 'initiated'
                        ? 'Complete Payment'
                        : enrollment?.status === 'rejected'
                          ? 'Retry Payment'
                          : 'Enroll Now'}
                    </Button>
                  )}
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    30-day money-back guarantee
                  </div>
                </div>
              </div>

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
