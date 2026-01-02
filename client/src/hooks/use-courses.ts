import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, buildUrl } from '@shared/routes';
import type { InsertCourse, Course } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

export function useCourses(category?: string) {
  return useQuery({
    queryKey: [api.courses.list.path, category],
    queryFn: async () => {
      const url = category
        ? `${api.courses.list.path}?category=${encodeURIComponent(category)}`
        : api.courses.list.path;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch courses');
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id?: string) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id: id as string });
      const res = await fetch(url as string);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Failed to fetch course');
      return api.courses.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
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
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create course');
      return api.courses.create.responses[201].parse(await res.json());
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
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to update course');
      return api.courses.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.courses.list.path] });
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
      const res = await fetch(url as string, {
        method: api.courses.delete.method,
      });
      if (!res.ok) throw new Error('Failed to delete course');
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
