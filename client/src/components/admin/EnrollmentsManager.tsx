import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Textarea } from '@/components/ui/textarea';
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
import { CheckCircle, XCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import {
  useAllEnrollments,
  useVerifyEnrollment,
  useRejectEnrollment,
} from '@/hooks/use-enrollments';
import type { EnrollmentWithRefs } from '@shared/schema';

type Filter = 'all' | 'initiated' | 'pending' | 'verified' | 'rejected';

export function EnrollmentsManager() {
  const { data: enrollments, isLoading } = useAllEnrollments();
  const verifyMutation = useVerifyEnrollment();
  const rejectMutation = useRejectEnrollment();

  const [filter, setFilter] = useState<Filter>('pending');
  const [preview, setPreview] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<EnrollmentWithRefs | null>(
    null,
  );
  const [rejectNotes, setRejectNotes] = useState('');

  const filtered = useMemo(() => {
    if (!enrollments) return [];
    if (filter === 'all') return enrollments;
    return enrollments.filter(e => e.status === filter);
  }, [enrollments, filter]);

  const counts = useMemo(() => {
    const c = { all: 0, initiated: 0, pending: 0, verified: 0, rejected: 0 };
    for (const e of enrollments ?? []) {
      c.all++;
      c[e.status]++;
    }
    return c;
  }, [enrollments]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Enrollment Verification</h2>
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
          {(['pending', 'verified', 'rejected', 'initiated', 'all'] as Filter[]).map(k => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                filter === k
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {k} ({counts[k]})
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No {filter === 'all' ? '' : filter} enrollments.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>bKash Info</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(e => (
              <TableRow key={e._id}>
                <TableCell>
                  <div className="text-sm font-medium text-slate-900">
                    {e.user?.fullName || e.user?.username || '—'}
                  </div>
                  {e.user?.email && (
                    <div className="text-xs text-slate-500">{e.user.email}</div>
                  )}
                  {e.user?.phone && (
                    <div className="text-xs text-slate-500">{e.user.phone}</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{e.course?.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {e.course?.slug}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold">
                  {typeof e.amount === 'number' && e.amount > 0
                    ? `৳${e.amount.toLocaleString()}`
                    : '—'}
                </TableCell>
                <TableCell>
                  {e.transactionId ? (
                    <>
                      <div className="text-xs font-mono text-slate-800">
                        {e.transactionId}
                      </div>
                      <div className="text-xs text-slate-500">
                        {e.senderNumber}
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      not submitted yet
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {e.screenshotUrl ? (
                    <button
                      onClick={() => setPreview(e.screenshotUrl!)}
                      className="w-12 h-12 rounded border overflow-hidden hover:ring-2 hover:ring-indigo-300 transition"
                      title="Click to enlarge"
                    >
                      <img
                        src={e.screenshotUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ) : (
                    <div className="w-12 h-12 rounded bg-slate-100 border flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={e.status} />
                  {e.status === 'rejected' && e.notes && (
                    <div
                      className="text-[10px] text-red-500 mt-1 max-w-[160px] truncate"
                      title={e.notes}
                    >
                      {e.notes}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 hover:bg-green-50 text-green-700"
                      disabled={
                        e.status === 'verified' ||
                        e.status === 'initiated' ||
                        verifyMutation.isPending
                      }
                      title={
                        e.status === 'initiated'
                          ? 'Student has not submitted payment yet'
                          : undefined
                      }
                      onClick={() => verifyMutation.mutate(e._id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 hover:bg-red-50 text-red-700"
                      disabled={e.status === 'rejected'}
                      onClick={() => {
                        setRejectTarget(e);
                        setRejectNotes('');
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Screenshot preview */}
      <Dialog
        open={!!preview}
        onOpenChange={open => !open && setPreview(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Screenshot</DialogTitle>
          </DialogHeader>
          {preview && (
            <img
              src={preview}
              alt="Payment screenshot"
              className="w-full max-h-[70vh] object-contain rounded"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Reject confirmation with optional notes */}
      <AlertDialog
        open={!!rejectTarget}
        onOpenChange={open => !open && setRejectTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark{' '}
              <span className="font-semibold">
                {rejectTarget?.user?.fullName}
              </span>
              's payment for{' '}
              <span className="font-semibold">
                {rejectTarget?.course?.title}
              </span>{' '}
              as rejected. They'll be prompted to retry from their dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Reason (optional, shown to the student)
            </label>
            <Textarea
              rows={2}
              value={rejectNotes}
              onChange={e => setRejectNotes(e.target.value)}
              placeholder="e.g. Transaction ID could not be verified"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (!rejectTarget) return;
                await rejectMutation.mutateAsync({
                  id: rejectTarget._id,
                  notes: rejectNotes.trim() || undefined,
                });
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

function StatusBadge({ status }: { status: EnrollmentWithRefs['status'] }) {
  if (status === 'verified') {
    return (
      <Badge className="bg-green-100 text-green-800 border-0">Verified</Badge>
    );
  }
  if (status === 'pending') {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-0">Pending</Badge>
    );
  }
  if (status === 'initiated') {
    return (
      <Badge className="bg-indigo-100 text-indigo-800 border-0">
        Initiated
      </Badge>
    );
  }
  return <Badge className="bg-red-100 text-red-800 border-0">Rejected</Badge>;
}
