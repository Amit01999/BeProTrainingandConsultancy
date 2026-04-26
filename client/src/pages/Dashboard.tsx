import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import {
  useMyEnrollments,
  useInitiateEnrollment,
} from '@/hooks/use-enrollments';
import { useCourse } from '@/hooks/use-courses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  Lock,
  ArrowRight,
  Wallet,
  PlayCircle,
} from 'lucide-react';
import { PaymentModal } from '@/components/PaymentModal';
import type { Course, EnrollmentWithRefs } from '@shared/schema';

function useQueryParam(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(key);
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: enrollments = [], isLoading } = useMyEnrollments(!!user);
  const initiate = useInitiateEnrollment();

  // If arriving from CourseDetail with ?course=<slug>, resolve it and make
  // sure an initiated enrollment exists; then open the payment modal.
  const pendingSlug = useQueryParam('course');
  const { data: pendingCourse } = useCourse(pendingSlug ?? undefined);

  const [payingCourse, setPayingCourse] = useState<Course | null>(null);
  const [payingEnrollmentId, setPayingEnrollmentId] = useState<string | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const enrollmentByCourseId = useMemo(() => {
    const map = new Map<string, EnrollmentWithRefs>();
    for (const e of enrollments) {
      // The API sorts newest-first; the (user, course) DB uniqueness means
      // there's at most one record per course anyway.
      if (!map.has(e.courseId)) map.set(e.courseId, e);
    }
    return map;
  }, [enrollments]);

  // Guard against re-entry: we only want to auto-open once per URL param.
  const handledSlugRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pendingCourse || !user || isLoading) return;
    if (handledSlugRef.current === pendingCourse.slug) return;
    handledSlugRef.current = pendingCourse.slug;

    const existing = enrollmentByCourseId.get(pendingCourse._id);

    // Active / finalized: do nothing, user can see status on their dashboard.
    if (existing?.status === 'pending' || existing?.status === 'verified') {
      stripCourseParam();
      return;
    }

    // Already initiated or previously rejected → reuse the same record.
    if (existing) {
      setPayingCourse(pendingCourse);
      setPayingEnrollmentId(existing._id);
      setModalOpen(true);
      stripCourseParam();
      return;
    }

    // No record yet → initiate, then open the modal with the new id.
    initiate.mutate(pendingCourse._id, {
      onSuccess: enrollment => {
        setPayingCourse(pendingCourse);
        setPayingEnrollmentId(enrollment._id);
        setModalOpen(true);
      },
      onSettled: stripCourseParam,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCourse, user, isLoading, enrollmentByCourseId]);

  function stripCourseParam() {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has('course')) return;
    url.searchParams.delete('course');
    window.history.replaceState({}, '', url.toString());
  }

  function openPayment(enrollment: EnrollmentWithRefs) {
    setPayingCourse(enrollment.course);
    setPayingEnrollmentId(enrollment._id);
    setModalOpen(true);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-slate-500">
        <Loader2 className="animate-spin mr-2" /> Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 gap-4 bg-slate-50">
        <p className="text-slate-600">
          Please log in to access your dashboard.
        </p>
        <Link to="/login">
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-slate-500">
        <Loader2 className="animate-spin mr-2" /> Loading…
      </div>
    );
  }

  const initiated = enrollments.filter(e => e.status === 'initiated');
  const pending = enrollments.filter(e => e.status === 'pending');
  const verified = enrollments.filter(e => e.status === 'verified');
  const rejected = enrollments.filter(e => e.status === 'rejected');

  return (
    <div className="min-h-screen bg-slate-50 py-12 p-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">
              Welcome back, {user.fullName}!
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your course enrollments and payment status here.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline">
              Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard
            label="Verified"
            value={verified.length}
            color="text-green-600"
            icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
          />
          <StatCard
            label="Pending review"
            value={pending.length}
            color="text-amber-600"
            icon={<Clock className="w-5 h-5 text-amber-500" />}
          />
          <StatCard
            label="Awaiting payment"
            value={initiated.length}
            color="text-indigo-600"
            icon={<PlayCircle className="w-5 h-5 text-indigo-500" />}
          />
          <StatCard
            label="Rejected"
            value={rejected.length}
            color="text-red-600"
            icon={<XCircle className="w-5 h-5 text-red-500" />}
          />
        </div>

        {initiated.length > 0 && (
          <Section title="Awaiting Your Payment">
            <div className="grid gap-4 md:grid-cols-2">
              {initiated.map(e => (
                <EnrollmentCard
                  key={e._id}
                  enrollment={e}
                  onPay={() => openPayment(e)}
                />
              ))}
            </div>
          </Section>
        )}

        <Section title="Enrolled Courses">
          {verified.length === 0 ? (
            <EmptyState text="You don't have any verified enrollments yet." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {verified.map(e => (
                <EnrollmentCard key={e._id} enrollment={e} />
              ))}
            </div>
          )}
        </Section>

        <Section title="Pending Enrollments">
          {pending.length === 0 ? (
            <EmptyState text="No enrollments awaiting verification." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pending.map(e => (
                <EnrollmentCard key={e._id} enrollment={e} />
              ))}
            </div>
          )}
        </Section>

        {rejected.length > 0 && (
          <Section title="Rejected Payments">
            <div className="grid gap-4 md:grid-cols-2">
              {rejected.map(e => (
                <EnrollmentCard
                  key={e._id}
                  enrollment={e}
                  onRetry={() => openPayment(e)}
                />
              ))}
            </div>
          </Section>
        )}
      </div>

      <PaymentModal
        course={payingCourse}
        enrollmentId={payingEnrollmentId}
        open={modalOpen}
        onOpenChange={next => {
          setModalOpen(next);
          if (!next) {
            setPayingCourse(null);
            setPayingEnrollmentId(null);
          }
        }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-slate-500">
          {label}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${color}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-white p-8 rounded-xl text-center border border-dashed text-slate-500 text-sm">
      {text}
    </div>
  );
}

function EnrollmentCard({
  enrollment,
  onPay,
  onRetry,
}: {
  enrollment: EnrollmentWithRefs;
  onPay?: () => void;
  onRetry?: () => void;
}) {
  const { course, status } = enrollment;
  const price = course?.discountedPrice ?? 0;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex">
      {course?.imageUrl && (
        <img
          src={course.imageUrl}
          alt=""
          className="w-28 h-full object-cover border-r"
        />
      )}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">
              {course?.title ?? 'Course'}
            </h3>
            <StatusBadge status={status} />
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {course?.duration} · {course?.level}
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-800">
            {price > 0 ? `৳${price.toLocaleString()}` : 'Free'}
          </div>
          {enrollment.notes && status === 'rejected' && (
            <div className="mt-2 text-xs text-red-600">
              Reason: {enrollment.notes}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {status === 'verified' ? (
            <Link to={`/courses/${course?.slug}`}>
              <Button size="sm" variant="outline">
                Access course <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : status === 'pending' ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-600">
              <Lock className="w-3.5 h-3.5" /> Under review — content unlocks
              after verification
            </span>
          ) : status === 'initiated' && onPay ? (
            <Button size="sm" onClick={onPay}>
              <Wallet className="w-4 h-4 mr-1" /> Complete payment
            </Button>
          ) : status === 'rejected' && onRetry ? (
            <Button size="sm" onClick={onRetry}>
              <Wallet className="w-4 h-4 mr-1" /> Retry payment
            </Button>
          ) : null}
          <span className="ml-auto text-[11px] text-slate-400">
            Started {new Date(enrollment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: EnrollmentWithRefs['status'] }) {
  if (status === 'verified') {
    return (
      <Badge className="bg-green-100 text-green-800 border-0 text-[10px]">
        Verified
      </Badge>
    );
  }
  if (status === 'pending') {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-0 text-[10px]">
        Under Review
      </Badge>
    );
  }
  if (status === 'initiated') {
    return (
      <Badge className="bg-indigo-100 text-indigo-800 border-0 text-[10px]">
        Awaiting Payment
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-800 border-0 text-[10px]">
      Rejected
    </Badge>
  );
}
