import { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { useApplications, useUpdateApplicationStatus } from '@/hooks/use-applications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Application, Course, User as UserType } from '@shared/schema';

type AppWithRefs = Application & { course?: Course; user?: UserType };
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

const ITEMS_PER_PAGE = 10;

function StatusBadge({ status }: { status: Application['status'] }) {
  if (status === 'approved')
    return (
      <Badge className="bg-emerald-100 text-emerald-800 border-0">Approved</Badge>
    );
  if (status === 'rejected')
    return <Badge className="bg-red-100 text-red-800 border-0">Rejected</Badge>;
  return (
    <Badge className="bg-amber-100 text-amber-800 border-0">Pending</Badge>
  );
}

export function ApplicationsManager() {
  const { data: applications, isLoading } = useApplications();
  const updateStatus = useUpdateApplicationStatus();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [detailApp, setDetailApp] = useState<AppWithRefs | null>(null);
  const [approveTarget, setApproveTarget] = useState<AppWithRefs | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AppWithRefs | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');

  function resetPage() {
    setPage(1);
  }

  // Unique courses for dropdown
  const courseOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const app of (applications ?? []) as AppWithRefs[]) {
      if (!seen.has(app.courseId)) {
        seen.set(app.courseId, app.course?.title ?? app.courseId);
      }
    }
    return Array.from(seen.entries()).map(([id, title]) => ({ id, title }));
  }, [applications]);

  // Status counts (from unfiltered list)
  const counts = useMemo(() => {
    const c = { all: 0, pending: 0, approved: 0, rejected: 0 };
    for (const a of (applications ?? []) as AppWithRefs[]) {
      c.all++;
      c[a.status]++;
    }
    return c;
  }, [applications]);

  // Filtered + searched list
  const filtered = useMemo(() => {
    let list = (applications ?? []) as AppWithRefs[];
    if (statusFilter !== 'all') list = list.filter(a => a.status === statusFilter);
    if (courseFilter !== 'all') list = list.filter(a => a.courseId === courseFilter);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        a =>
          a.fullName.toLowerCase().includes(q) ||
          (a.email ?? '').toLowerCase().includes(q) ||
          a.phone.toLowerCase().includes(q) ||
          (a.course?.title ?? '').toLowerCase().includes(q),
      );
    }
    return list.sort(
      (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
    );
  }, [applications, statusFilter, courseFilter, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  // Build compact page number array (with ellipsis)
  const pageNumbers: (number | '...')[] = [];
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    p => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );
  for (let i = 0; i < pageNums.length; i++) {
    if (i > 0 && pageNums[i] - pageNums[i - 1] > 1) pageNumbers.push('...');
    pageNumbers.push(pageNums[i]);
  }

  function appId(app: AppWithRefs) {
    return app.id ?? app._id;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* ── Header + search ─────────────────────────────────────────────── */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Applications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {counts.all} total · {counts.pending} pending review
            </p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search name, email, phone…"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="pl-9 text-sm h-9"
            />
          </div>
        </div>

        {/* ── Filters row ──────────────────────────────────────────────────── */}
        <div className="px-5 py-3 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg flex-wrap">
            {(['all', 'pending', 'approved', 'rejected'] as StatusFilter[]).map(
              k => (
                <button
                  key={k}
                  onClick={() => {
                    setStatusFilter(k);
                    resetPage();
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                    statusFilter === k
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {k} ({counts[k]})
                </button>
              ),
            )}
          </div>

          <div className="sm:ml-auto">
            <Select
              value={courseFilter}
              onValueChange={v => {
                setCourseFilter(v);
                resetPage();
              }}
            >
              <SelectTrigger className="h-8 text-xs w-52">
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All courses</SelectItem>
                {courseOptions.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Table ────────────────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
            Loading applications…
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No applications match your filters.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map(app => (
                <TableRow key={app._id ?? app.id}>
                  <TableCell>
                    <p className="text-sm font-medium text-slate-900">
                      {app.fullName}
                    </p>
                    {app.email && (
                      <p className="text-xs text-slate-500">{app.email}</p>
                    )}
                    <p className="text-xs text-slate-500">{app.phone}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-800">
                      {app.course?.title ?? app.courseId}
                    </p>
                    {app.course?.category && (
                      <p className="text-xs text-slate-500">
                        {app.course.category}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 whitespace-nowrap">
                    {new Date(app.appliedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1.5 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800"
                        onClick={() => setDetailApp(app)}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-emerald-200 hover:bg-emerald-50 text-emerald-700 px-2"
                        disabled={
                          app.status === 'approved' || updateStatus.isPending
                        }
                        onClick={() => setApproveTarget(app)}
                        title="Approve"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-red-200 hover:bg-red-50 text-red-700 px-2"
                        disabled={
                          app.status === 'rejected' || updateStatus.isPending
                        }
                        onClick={() => {
                          setRejectTarget(app);
                          setRejectNotes('');
                        }}
                        title="Reject"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* ── Pagination ───────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{' '}
              {filtered.length}
            </span>
            <div className="flex gap-1">
              <button
                className="px-2.5 py-1 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                ‹ Prev
              </button>
              {pageNumbers.map((p, i) =>
                p === '...' ? (
                  <span key={`dots-${i}`} className="px-2 py-1 text-slate-400">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`px-2.5 py-1 rounded border ${
                      page === p
                        ? 'bg-primary text-white border-primary'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                className="px-2.5 py-1 rounded border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Detail modal ─────────────────────────────────────────────────────── */}
      <Dialog
        open={!!detailApp}
        onOpenChange={open => !open && setDetailApp(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {detailApp && (
            <div className="space-y-4 pt-1">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Student Info
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  {detailApp.fullName}
                </div>
                {detailApp.email && (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    {detailApp.email}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  {detailApp.phone}
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                  Course
                </p>
                <div className="flex items-start gap-2 text-sm text-slate-800">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {detailApp.course?.title ?? detailApp.courseId}
                    </p>
                    {detailApp.course?.category && (
                      <p className="text-xs text-slate-500">
                        {detailApp.course.category}
                      </p>
                    )}
                    {(detailApp.course?.discountedPrice ||
                      detailApp.course?.fee) && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {detailApp.course?.discountedPrice
                          ? `৳${detailApp.course.discountedPrice.toLocaleString()}`
                          : detailApp.course?.fee}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Applied{' '}
                  {new Date(detailApp.appliedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <StatusBadge status={detailApp.status} />
              </div>

              {detailApp.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => {
                      setApproveTarget(detailApp);
                      setDetailApp(null);
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-1.5" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setRejectTarget(detailApp);
                      setRejectNotes('');
                      setDetailApp(null);
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" /> Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Approve confirmation ──────────────────────────────────────────────── */}
      <AlertDialog
        open={!!approveTarget}
        onOpenChange={open => !open && setApproveTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve{' '}
              <span className="font-semibold">{approveTarget?.fullName}</span>
              's application for{' '}
              <span className="font-semibold">
                {approveTarget?.course?.title ?? approveTarget?.courseId}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={async () => {
                if (approveTarget) {
                  await updateStatus.mutateAsync({
                    id: appId(approveTarget),
                    status: 'approved',
                  });
                }
                setApproveTarget(null);
              }}
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Reject confirmation ───────────────────────────────────────────────── */}
      <AlertDialog
        open={!!rejectTarget}
        onOpenChange={open => !open && setRejectTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reject{' '}
              <span className="font-semibold">{rejectTarget?.fullName}</span>
              's application for{' '}
              <span className="font-semibold">
                {rejectTarget?.course?.title ?? rejectTarget?.courseId}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Reason (optional)
            </label>
            <Textarea
              rows={2}
              value={rejectNotes}
              onChange={e => setRejectNotes(e.target.value)}
              placeholder="e.g. Duplicate application, prerequisites not met…"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (rejectTarget) {
                  await updateStatus.mutateAsync({
                    id: appId(rejectTarget),
                    status: 'rejected',
                  });
                }
                setRejectTarget(null);
              }}
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
