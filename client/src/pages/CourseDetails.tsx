import { useCourse } from '@/hooks/use-courses';
import {
  useApplications,
  useCreateApplication,
} from '@/hooks/use-applications';
import { useAuth } from '@/hooks/use-auth';
import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Lock,
  BookOpen,
} from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CourseDetails() {
  const [, params] = useRoute('/courses/:id');
  const id = params ? params.id : undefined;

  const { data: course, isLoading } = useCourse(id);
  const { user } = useAuth();
  const { data: applications } = useApplications();
  const createApplication = useCreateApplication();

  const [open, setOpen] = useState(false);

  // Check if already applied
  const hasApplied = applications?.some(
    app => app.courseId === id && app.userId === user?.id
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return <div className="p-10 text-center">Course not found</div>;
  }

  const handleApply = () => {
    if (!user || !course) return;
    createApplication.mutate(
      {
        userId: user.id!,
        courseId: course.id!,
      },
      {
        onSuccess: () => setOpen(false),
      }
    );
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          href="/courses"
          className="inline-flex items-center text-slate-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex gap-3 mb-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {course.category}
                </Badge>
                {course.level && (
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {course.level}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display">
                What you'll learn
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Comprehensive curriculum covering industry standards and
                      practical applications.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardContent className="p-6 space-y-6">
                  <div className="text-center pb-6 border-b border-dashed">
                    <span className="block text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">
                      Course Fee
                    </span>
                    <span className="text-4xl font-bold text-slate-900 font-display">
                      {course.fee}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-slate-600 gap-2">
                        <Clock className="h-4 w-4" /> Duration
                      </span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-slate-600 gap-2">
                        <BookOpen className="h-4 w-4" /> Level
                      </span>
                      <span className="font-semibold">
                        {course.level || 'All Levels'}
                      </span>
                    </div>
                  </div>

                  {user ? (
                    hasApplied ? (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        disabled
                      >
                        <CheckCircle className="mr-2 h-4 w-4" /> Application
                        Pending
                      </Button>
                    ) : (
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full text-lg h-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-orange-500/25">
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Application</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to apply for{' '}
                              <strong>{course.title}</strong>? Our team will
                              review your application and contact you.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleApply}
                              disabled={createApplication.isPending}
                            >
                              {createApplication.isPending
                                ? 'Submitting...'
                                : 'Confirm Application'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )
                  ) : (
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full h-12 border-dashed border-2"
                      >
                        <Lock className="mr-2 h-4 w-4" /> Login to Apply
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
