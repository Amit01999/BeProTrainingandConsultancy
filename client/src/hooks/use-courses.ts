import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, buildUrl } from '@shared/routes';
import type { InsertCourse, Course, UploadedImageResponse } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

async function parseError(res: Response) {
  try {
    const data = await res.json();
    return data?.message || `${res.status}: ${res.statusText}`;
  } catch {
    return `${res.status}: ${res.statusText}`;
  }
}

export function useCourses(category?: string) {
  return useQuery<Course[]>({
    queryKey: [api.courses.list.path, category],
    queryFn: async () => {
      const url = category
        ? `${api.courses.list.path}?category=${encodeURIComponent(category)}`
        : api.courses.list.path;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Course[];
    },
  });
}

// Fetch a single course by slug (or ObjectId — backend handles both).
export function useCourse(slugOrId?: string) {
  return useQuery<Course | null>({
    queryKey: [api.courses.get.path, slugOrId],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, {
        slug: slugOrId as string,
      });
      const res = await fetch(url, { credentials: 'include' });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Course;
    },
    enabled: !!slugOrId,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertCourse) => {
      const res = await fetch(api.courses.create.path, {
        method: api.courses.create.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Course;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
      toast({ title: 'Success', description: 'Course created successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: { id: string } & Partial<InsertCourse>) => {
      const url = buildUrl(api.courses.update.path, { id });
      const res = await fetch(url, {
        method: api.courses.update.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Course;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.courses.get.path] });
      toast({ title: 'Success', description: 'Course updated successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const url = buildUrl(api.courses.delete.path, { id });
      const res = await fetch(url, {
        method: api.courses.delete.method,
        credentials: 'include',
      });
      if (!res.ok) throw new Error(await parseError(res));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
      toast({ title: 'Success', description: 'Course deleted successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUploadCourseImage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch(api.courses.uploadImage.path, {
        method: api.courses.uploadImage.method,
        credentials: 'include',
        body: form,
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as UploadedImageResponse;
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
