import { useAuth } from '@/hooks/use-auth';
import {
  useCourses,
  useCreateCourse,
  useDeleteCourse,
  useUpdateCourse,
} from '@/hooks/use-courses';
import {
  useApplications,
  useUpdateApplicationStatus,
} from '@/hooks/use-applications';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertCourseSchema, type InsertCourse } from '@shared/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Trash2, Edit, CheckCircle, XCircle, Clock } from 'lucide-react';
import { z } from 'zod';

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <div className="p-10 text-center">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">
          Admin Dashboard
        </h1>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl border">
            <TabsTrigger value="courses" className="px-6">
              Manage Courses
            </TabsTrigger>
            <TabsTrigger value="applications" className="px-6">
              Manage Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <CoursesManager />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CoursesManager() {
  const { data: courses } = useCourses();
  const deleteCourse = useDeleteCourse();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Courses</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <CourseForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map(course => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{course.category}</Badge>
              </TableCell>
              <TableCell>{course.fee}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      if (confirm('Are you sure?'))
                        deleteCourse.mutate(course.id!);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CourseForm({ onSuccess }: { onSuccess: () => void }) {
  const createCourse = useCreateCourse();
  const form = useForm<InsertCourse>({
    resolver: zodResolver(insertCourseSchema),
    defaultValues: {
      title: '',
      category: 'Professional',
      description: '',
      duration: '',
      fee: '',
      level: '',
      isFeatured: false,
    },
  });

  const onSubmit = (data: InsertCourse) => {
    createCourse.mutate(data, { onSuccess });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      'NSDA',
                      'Professional',
                      'Corporate',
                      'Language',
                      'SkillsBoost',
                    ].map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="L-2, Beginner..."
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="3 Months"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5000 BDT"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={createCourse.isPending}
        >
          {createCourse.isPending ? 'Creating...' : 'Create Course'}
        </Button>
      </form>
    </Form>
  );
}

function ApplicationsManager() {
  const { data: applications } = useApplications();
  const updateStatus = useUpdateApplicationStatus();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">Student Applications</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map(app => (
            <TableRow key={app.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{app.user.fullName}</div>
                  <div className="text-xs text-slate-500">{app.user.email}</div>
                  <div className="text-xs text-slate-500">{app.user.phone}</div>
                </div>
              </TableCell>
              <TableCell>{app.course.title}</TableCell>
              <TableCell>
                {new Date(app.appliedAt || '').toLocaleDateString()}
              </TableCell>
              <TableCell>
                {app.status === 'pending' && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-none">
                    Pending
                  </Badge>
                )}
                {app.status === 'approved' && (
                  <Badge className="bg-green-100 text-green-800 border-none">
                    Approved
                  </Badge>
                )}
                {app.status === 'rejected' && (
                  <Badge className="bg-red-100 text-red-800 border-none">
                    Rejected
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 hover:bg-green-50 text-green-700"
                    onClick={() =>
                      updateStatus.mutate({ id: app.id!, status: 'approved' })
                    }
                    disabled={app.status === 'approved'}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 hover:bg-red-50 text-red-700"
                    onClick={() =>
                      updateStatus.mutate({ id: app.id!, status: 'rejected' })
                    }
                    disabled={app.status === 'rejected'}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
