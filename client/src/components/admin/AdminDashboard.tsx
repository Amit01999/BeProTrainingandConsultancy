import { useMemo } from 'react';
import { Link } from 'wouter';
import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import { useAllEnrollments } from '@/hooks/use-enrollments';
import { useCourses } from '@/hooks/use-courses';
import { useApplications } from '@/hooks/use-applications';
import { useAuth } from '@/hooks/use-auth';
import type { EnrollmentWithRefs, Application, Course } from '@shared/schema';

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm">
      <div className={`${color} p-3 rounded-lg shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-slate-900 leading-tight mt-0.5">
          {value}
        </p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Enrollment status breakdown bar ──────────────────────────────────────────

function StatusBar({
  counts,
  total,
}: {
  counts: { initiated: number; pending: number; verified: number; rejected: number };
  total: number;
}) {
  if (total === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-4">
        No enrollments yet.
      </p>
    );
  }

  const segments = [
    { key: 'verified' as const, label: 'Verified', bar: 'bg-emerald-500', dot: 'bg-emerald-500' },
    { key: 'pending' as const, label: 'Pending', bar: 'bg-amber-400', dot: 'bg-amber-400' },
    { key: 'initiated' as const, label: 'Initiated', bar: 'bg-indigo-400', dot: 'bg-indigo-400' },
    { key: 'rejected' as const, label: 'Rejected', bar: 'bg-red-400', dot: 'bg-red-400' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 gap-0.5">
        {segments.map(seg => {
          const pct = (counts[seg.key] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={seg.key}
              className={`${seg.bar} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${seg.label}: ${counts[seg.key]}`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {segments.map(seg => (
          <div key={seg.key} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className={`w-2 h-2 rounded-full ${seg.dot}`} />
            {seg.label}
            <span className="font-semibold text-slate-800">{counts[seg.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Enrollment row in activity feed ──────────────────────────────────────────

function EnrollmentRow({ e }: { e: EnrollmentWithRefs }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">
          {e.user?.fullName || e.user?.username || '—'}
        </p>
        <p className="text-xs text-slate-500 truncate">{e.course?.title}</p>
      </div>
      <div className="shrink-0 ml-3 text-right">
        {typeof e.amount === 'number' && e.amount > 0 && (
          <p className="text-sm font-semibold text-slate-800">
            ৳{e.amount.toLocaleString()}
          </p>
        )}
        <p className="text-[10px] text-slate-400">
          {new Date(e.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

// ── Application row in activity feed ─────────────────────────────────────────

function ApplicationRow({ app }: { app: Application & { course?: Course } }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 truncate">{app.fullName}</p>
        <p className="text-xs text-slate-500 truncate">
          {app.course?.title ?? app.courseId}
        </p>
      </div>
      <div className="shrink-0 ml-3 text-right">
        <p className="text-[10px] text-slate-400">
          {new Date(app.appliedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const { user } = useAuth();
  const { data: enrollments, isLoading: loadingE } = useAllEnrollments();
  const { data: courses, isLoading: loadingC } = useCourses();
  const { data: applications, isLoading: loadingA } = useApplications();

  const stats = useMemo(() => {
    const enr = enrollments ?? [];
    const apps = (applications ?? []) as (Application & { course?: Course })[];
    const uniqueStudents = new Set(enr.map(e => e.userId));
    const revenue = enr
      .filter(e => e.status === 'verified')
      .reduce((sum, e) => sum + (e.amount ?? 0), 0);
    const counts = { initiated: 0, pending: 0, verified: 0, rejected: 0 };
    for (const e of enr) counts[e.status]++;
    const appCounts = { pending: 0, approved: 0, rejected: 0 };
    for (const a of apps) appCounts[a.status]++;
    return {
      uniqueStudents: uniqueStudents.size,
      revenue,
      counts,
      appCounts,
      total: enr.length,
    };
  }, [enrollments, applications]);

  const recentPendingEnrollments = useMemo(
    () => (enrollments ?? []).filter(e => e.status === 'pending').slice(0, 6),
    [enrollments],
  );

  const recentPendingApps = useMemo(
    () =>
      ((applications ?? []) as (Application & { course?: Course })[])
        .filter(a => a.status === 'pending')
        .sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
        )
        .slice(0, 6),
    [applications],
  );

  const isLoading = loadingE || loadingC || loadingA;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Welcome back, {user?.fullName?.split(' ')[0] ?? 'Admin'}
          </h1>
          <p className="text-sm text-slate-500">{today}</p>
        </div>
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-slate-400 self-start sm:self-center" />
        )}
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          label="Total Students"
          value={stats.uniqueStudents}
          sub="unique enrolled users"
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          color="bg-indigo-50"
        />
        <StatCard
          label="Total Courses"
          value={courses?.length ?? '—'}
          sub={`${courses?.filter(c => c.isFeatured).length ?? 0} featured`}
          icon={<BookOpen className="w-5 h-5 text-sky-600" />}
          color="bg-sky-50"
        />
        <StatCard
          label="Pending Payments"
          value={stats.counts.pending}
          sub="awaiting verification"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
        />
        <StatCard
          label="Verified"
          value={stats.counts.verified}
          sub={`${stats.counts.rejected} rejected`}
          icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          label="Revenue"
          value={`৳${stats.revenue.toLocaleString()}`}
          sub="from verified payments"
          icon={<TrendingUp className="w-5 h-5 text-violet-600" />}
          color="bg-violet-50"
        />
      </div>

      {/* ── Enrollment status breakdown ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Enrollment Breakdown
          </h2>
          <span className="text-xs text-slate-500">{stats.total} total</span>
        </div>
        <StatusBar counts={stats.counts} total={stats.total} />
      </div>

      {/* ── Activity feeds ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending enrollments feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-800">
                Pending Payments
              </h2>
              {stats.counts.pending > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                  {stats.counts.pending}
                </span>
              )}
            </div>
            <Link
              to="/admin/enrollments"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loadingE ? (
            <div className="text-center py-8 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin inline-block" />
            </div>
          ) : recentPendingEnrollments.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
              All caught up — no pending payments
            </div>
          ) : (
            <div>
              {recentPendingEnrollments.map(e => (
                <EnrollmentRow key={e._id} e={e} />
              ))}
            </div>
          )}
        </div>

        {/* Pending applications feed */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-800">
                New Applications
              </h2>
              {stats.appCounts.pending > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                  {stats.appCounts.pending}
                </span>
              )}
            </div>
            <Link
              to="/admin/applications"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loadingA ? (
            <div className="text-center py-8 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin inline-block" />
            </div>
          ) : recentPendingApps.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <ClipboardList className="w-8 h-8 mx-auto mb-2 text-slate-200" />
              No pending applications
            </div>
          ) : (
            <div>
              {recentPendingApps.map(app => (
                <ApplicationRow key={app._id ?? app.id} app={app} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Applications overview ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Applications Overview
          </h2>
          <span className="text-xs text-slate-500">
            {(applications ?? []).length} total
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              {
                key: 'pending' as const,
                label: 'Pending',
                color: 'text-amber-600',
                bg: 'bg-amber-50',
                border: 'border-amber-200',
              },
              {
                key: 'approved' as const,
                label: 'Approved',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
              },
              {
                key: 'rejected' as const,
                label: 'Rejected',
                color: 'text-red-600',
                bg: 'bg-red-50',
                border: 'border-red-200',
              },
            ]
          ).map(({ key, label, color, bg, border }) => (
            <div
              key={key}
              className={`${bg} ${border} border rounded-lg p-4 text-center`}
            >
              <p className={`text-2xl font-bold ${color}`}>
                {stats.appCounts[key]}
              </p>
              <p className="text-xs text-slate-600 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
