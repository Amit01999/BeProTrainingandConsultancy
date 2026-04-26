import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useCourses, useDeleteCourse } from '@/hooks/use-courses';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Trash2,
  Pencil,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import type { Course } from '@shared/schema';
import { CourseForm } from '@/components/admin/CourseForm';
import { EnrollmentsManager } from '@/components/admin/EnrollmentsManager';
import { AdminLayout, type AdminSection } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ApplicationsManager } from '@/components/admin/ApplicationsManager';

const VALID_SECTIONS: AdminSection[] = [
  'dashboard',
  'courses',
  'enrollments',
  'applications',
];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const { section } = useParams<{ section: string }>();
  const [, navigate] = useLocation();

  const activeSection: AdminSection = VALID_SECTIONS.includes(
    section as AdminSection,
  )
    ? (section as AdminSection)
    : 'courses';

  // When the user is known-to-be-null (session expired or logged out),
  // redirect to login. useEffect fires after React commits the render,
  // so user is guaranteed to be null in the cache by the time Auth page mounts —
  // preventing the race where Auth.tsx sees a stale admin user and bounces back.
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!user) {
    // Redirecting via useEffect above; render nothing to avoid flash
    return null;
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 font-medium">Access Denied</p>
      </div>
    );
  }

  return (
    <AdminLayout activeSection={activeSection}>
      {activeSection === 'dashboard' && <AdminDashboard />}

      {activeSection === 'courses' && (
        <div className="p-6 lg:p-8">
          <CoursesManager />
        </div>
      )}

      {activeSection === 'enrollments' && (
        <div className="p-6 lg:p-8">
          <EnrollmentsManager />
        </div>
      )}

      {activeSection === 'applications' && (
        <div className="p-6 lg:p-8">
          <ApplicationsManager />
        </div>
      )}
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────
// CoursesManager — unchanged business logic
// ─────────────────────────────────────────────

function CoursesManager() {
  const { data: courses, isLoading } = useCourses();
  const deleteCourse = useDeleteCourse();
  const [createOpen, setCreateOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Course | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          All Courses ({courses?.length ?? 0})
        </h2>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <CourseForm onSuccess={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading…</div>
      ) : (courses?.length ?? 0) === 0 ? (
        <div className="text-center py-12 text-slate-500">
          No courses yet. Click "Add Course" to create the first one.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map(course => (
              <TableRow key={course._id}>
                <TableCell>
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-slate-100 border flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <div>{course.title}</div>
                  {course.isFeatured && (
                    <Badge className="mt-1 bg-amber-100 text-amber-700 border-0 text-[10px]">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-slate-500 font-mono">
                  {course.slug}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{course.category}</Badge>
                </TableCell>
                <TableCell>
                  {course.discountedPrice
                    ? `৳${course.discountedPrice.toLocaleString()}`
                    : course.fee || 'Free'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-indigo-600 hover:bg-indigo-50"
                      onClick={() => setEditCourse(course)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setPendingDelete(course)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog
        open={!!editCourse}
        onOpenChange={open => !open && setEditCourse(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editCourse && (
            <CourseForm
              course={editCourse}
              onSuccess={() => setEditCourse(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={open => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete course?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{' '}
              <span className="font-semibold">{pendingDelete?.title}</span> and
              its associated image. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (pendingDelete?._id) {
                  await deleteCourse.mutateAsync(pendingDelete._id);
                }
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

