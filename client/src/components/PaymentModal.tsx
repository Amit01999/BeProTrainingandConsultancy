import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, X, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Course } from '@shared/schema';
import {
  useSubmitPayment,
  useUploadPaymentScreenshot,
} from '@/hooks/use-enrollments';

const BKASH_MERCHANT_NUMBER =
  (import.meta as any).env?.VITE_BKASH_NUMBER || '01995-555588';

const paymentFormSchema = z.object({
  transactionId: z.string().trim().min(3, 'Transaction ID is required').max(64),
  senderNumber: z.string().trim().min(11, 'Enter a valid bKash number').max(20),
  notes: z.string().max(500).optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentModalProps {
  course: Course | null;
  // The existing enrollment id (from an `initiated` or `rejected` record)
  // that this payment is submitted against. Required to submit.
  enrollmentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PaymentModal({
  course,
  enrollmentId,
  open,
  onOpenChange,
  onSuccess,
}: PaymentModalProps) {
  const submitPayment = useSubmitPayment();
  const uploadScreenshot = useUploadPaymentScreenshot();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [screenshot, setScreenshot] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: { transactionId: '', senderNumber: '', notes: '' },
  });

  function resetAll() {
    form.reset({ transactionId: '', senderNumber: '', notes: '' });
    setScreenshot(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  // Reset the form when the modal closes so reopening shows a clean state.
  useEffect(() => {
    if (!open) resetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadScreenshot.mutateAsync(file);
      setScreenshot(result);
    } catch {
      // toast already fired by hook
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: PaymentFormValues) {
    if (!course || !enrollmentId) return;
    await submitPayment.mutateAsync({
      id: enrollmentId,
      transactionId: values.transactionId,
      senderNumber: values.senderNumber,
      notes: values.notes || undefined,
      screenshotUrl: screenshot?.url ?? undefined,
      screenshotPublicId: screenshot?.publicId ?? undefined,
      amount: course.discountedPrice,
    });
    resetAll();
    onOpenChange(false);
    onSuccess?.();
  }

  const amount = course?.discountedPrice ?? 0;
  const isPending =
    submitPayment.isPending || uploadScreenshot.isPending || uploading;

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        if (!next) resetAll();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>

        {course ? (
          <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
            {/* Course summary */}
            <div className="rounded-lg border bg-slate-50/80 p-4 flex items-start gap-4">
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt=""
                  className="w-16 h-16 rounded object-cover border"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900">
                  {course.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                  {course.duration && (
                    <span className="text-xs text-slate-500">
                      {course.duration}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Amount</div>
                <div className="text-lg font-bold text-slate-900">
                  {amount > 0 ? `৳${amount.toLocaleString()}` : 'Free'}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-lg border border-pink-200 bg-pink-50/70 p-4 text-sm text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-pink-700">
                <Info className="w-4 h-4" /> bKash Payment Instructions
              </div>
              <ol className="list-decimal list-inside space-y-1 text-xs leading-relaxed">
                <li>
                  Open bKash app → <strong>Send Money</strong>.
                </li>
                <li>
                  Send{' '}
                  <strong>৳{amount > 0 ? amount.toLocaleString() : '0'}</strong>{' '}
                  to <strong>{BKASH_MERCHANT_NUMBER}</strong> (Personal).
                </li>
                <li>
                  Copy the <strong>Transaction ID (TrxID)</strong> from the SMS
                  confirmation.
                </li>
                <li>
                  Fill in the form below and submit. Our team verifies within 24
                  hours.
                </li>
              </ol>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>bKash Transaction ID *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 9AB1XYZ234"
                          className="font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender bKash Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01XXXXXXXXX"
                          className="font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Payment Screenshot (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {screenshot ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={screenshot.url}
                          alt=""
                          className="w-14 h-14 rounded border object-cover"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => setScreenshot(null)}
                        >
                          <X className="w-4 h-4 mr-1" /> Remove
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading…
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload screenshot
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="Anything our team should know?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending || !enrollmentId}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    'Submit Payment'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <div className="py-6 text-sm text-slate-500 text-center">
            No course selected.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
