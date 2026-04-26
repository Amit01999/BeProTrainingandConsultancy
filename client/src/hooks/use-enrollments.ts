import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, buildUrl } from '@shared/routes';
import type {
  Enrollment,
  EnrollmentStatus,
  EnrollmentWithRefs,
  SubmitPayment,
  UploadedImageResponse,
} from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

async function parseError(res: Response) {
  try {
    const data = await res.json();
    return data?.message || `${res.status}: ${res.statusText}`;
  } catch {
    return `${res.status}: ${res.statusText}`;
  }
}

export function useMyEnrollments(enabled = true, status?: EnrollmentStatus) {
  return useQuery<EnrollmentWithRefs[]>({
    queryKey: [api.enrollments.mine.path, status],
    enabled,
    queryFn: async () => {
      const url = status
        ? `${api.enrollments.mine.path}?status=${status}`
        : api.enrollments.mine.path;
      const res = await fetch(url, { credentials: 'include' });
      if (res.status === 401) return [];
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as EnrollmentWithRefs[];
    },
  });
}

export function useAllEnrollments(enabled = true, status?: EnrollmentStatus) {
  return useQuery<EnrollmentWithRefs[]>({
    queryKey: [api.enrollments.list.path, status],
    enabled,
    queryFn: async () => {
      const url = status
        ? `${api.enrollments.list.path}?status=${status}`
        : api.enrollments.list.path;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as EnrollmentWithRefs[];
    },
  });
}

// Step 1 — Record intent ("Enroll Now"). Idempotent on (user, course).
export function useInitiateEnrollment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const res = await fetch(api.enrollments.create.path, {
        method: api.enrollments.create.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseId }),
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Enrollment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.enrollments.mine.path],
      });
      queryClient.invalidateQueries({
        queryKey: [api.enrollments.list.path],
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Could not start enrollment',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Step 2 — Submit bKash payment info against an existing enrollment.
export function useSubmitPayment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: SubmitPayment & { id: string }) => {
      const url = buildUrl(api.enrollments.pay.path, { id });
      const res = await fetch(url, {
        method: api.enrollments.pay.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as Enrollment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.enrollments.mine.path],
      });
      queryClient.invalidateQueries({
        queryKey: [api.enrollments.list.path],
      });
      toast({
        title: 'Payment submitted',
        description:
          'Your payment is under review. Admin will verify within 24 hours.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Submission failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUploadPaymentScreenshot() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch(api.enrollments.uploadScreenshot.path, {
        method: api.enrollments.uploadScreenshot.method,
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

export function useVerifyEnrollment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const url = buildUrl(api.enrollments.verify.path, { id });
      const res = await fetch(url, {
        method: api.enrollments.verify.method,
        credentials: 'include',
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as EnrollmentWithRefs;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.enrollments.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.enrollments.mine.path] });
      toast({ title: 'Payment verified' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Action failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useRejectEnrollment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }) => {
      const url = buildUrl(api.enrollments.reject.path, { id });
      const res = await fetch(url, {
        method: api.enrollments.reject.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error(await parseError(res));
      return (await res.json()) as EnrollmentWithRefs;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.enrollments.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.enrollments.mine.path] });
      toast({ title: 'Payment rejected' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Action failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
