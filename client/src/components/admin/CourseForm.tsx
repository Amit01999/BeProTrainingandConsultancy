import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertCourseSchema, type InsertCourse, type Course } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import {
  useCreateCourse,
  useUpdateCourse,
  useUploadCourseImage,
} from '@/hooks/use-courses';

// Form schema: strings for arrays that are easier to author in the UI
// (programTags as comma-separated, details content as newline-separated).
const formSchema = insertCourseSchema
  .omit({ programTags: true, details: true })
  .extend({
    programTagsInput: z.string().optional(),
    details: z
      .array(
        z.object({
          heading: z.string().min(1, 'Heading is required'),
          contentInput: z.string().optional(),
        }),
      )
      .optional(),
    featuresInput: z.string().optional(),
  });

type FormValues = z.infer<typeof formSchema>;

const CATEGORY_OPTIONS = [
  { value: 'nsda', label: 'Government (NSDA)' },
  { value: 'skills', label: 'Skills Development' },
  { value: 'language', label: 'Language Training' },
];

function courseToFormValues(course?: Course | null): FormValues {
  return {
    title: course?.title ?? '',
    slug: course?.slug ?? '',
    titleBn: course?.titleBn ?? '',
    category: course?.category ?? 'skills',
    level: course?.level ?? '',
    duration: course?.duration ?? '',
    fee: course?.fee ?? '',
    originalPrice: course?.originalPrice ?? 0,
    discountedPrice: course?.discountedPrice ?? 0,
    description: course?.description ?? '',
    descriptionBn: course?.descriptionBn ?? '',
    imageUrl: course?.imageUrl ?? '',
    imagePublicId: course?.imagePublicId ?? '',
    gradientFrom: course?.gradientFrom ?? '',
    gradientTo: course?.gradientTo ?? '',
    icon: course?.icon ?? '',
    isFeatured: course?.isFeatured ?? false,
    programTagsInput: (course?.programTags ?? []).join(', '),
    featuresInput: (course?.features ?? []).join('\n'),
    details: (course?.details ?? []).map(d => ({
      heading: d.heading,
      contentInput: d.content.join('\n'),
    })),
  };
}

function formValuesToPayload(values: FormValues): InsertCourse {
  const programTags = (values.programTagsInput ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const features = (values.featuresInput ?? '')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  const details = (values.details ?? []).map(d => ({
    heading: d.heading.trim(),
    content: (d.contentInput ?? '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean),
  }));

  const payload: InsertCourse = {
    title: values.title,
    category: values.category,
    programTags,
    features,
    details,
    isFeatured: values.isFeatured ?? false,
    originalPrice: Number(values.originalPrice ?? 0),
    discountedPrice: Number(values.discountedPrice ?? 0),
  };

  // Only include strings if the user actually supplied them — avoids sending
  // empty strings that would wipe out existing values on edit.
  const optional: [keyof InsertCourse, string | undefined | null][] = [
    ['slug', values.slug],
    ['titleBn', values.titleBn],
    ['level', values.level],
    ['duration', values.duration],
    ['fee', values.fee],
    ['description', values.description],
    ['descriptionBn', values.descriptionBn],
    ['imageUrl', values.imageUrl],
    ['imagePublicId', values.imagePublicId],
    ['gradientFrom', values.gradientFrom],
    ['gradientTo', values.gradientTo],
    ['icon', values.icon],
  ];
  for (const [key, value] of optional) {
    if (value && value.toString().trim().length > 0) {
      (payload as any)[key] = value;
    }
  }

  return payload;
}

export interface CourseFormProps {
  course?: Course | null;
  onSuccess?: () => void;
}

export function CourseForm({ course, onSuccess }: CourseFormProps) {
  const isEdit = !!course?._id;
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const uploadImage = useUploadCourseImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: courseToFormValues(course),
  });

  useEffect(() => {
    form.reset(courseToFormValues(course));
  }, [course, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'details',
  });

  const imageUrl = form.watch('imageUrl');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage.mutateAsync(file);
      form.setValue('imageUrl', result.url, { shouldValidate: true });
      form.setValue('imagePublicId', result.publicId);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function onSubmit(values: FormValues) {
    const payload = formValuesToPayload(values);

    if (isEdit && course?._id) {
      await updateCourse.mutateAsync({ id: course._id, ...payload });
    } else {
      await createCourse.mutateAsync(payload);
    }
    onSuccess?.();
  }

  const isPending =
    createCourse.isPending || updateCourse.isPending || uploading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
      >
        {/* Image upload */}
        <div className="space-y-2">
          <FormLabel>Course Image</FormLabel>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg bg-slate-100 border overflow-hidden flex items-center justify-center text-xs text-slate-400">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                'No image'
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
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
                    Upload image
                  </>
                )}
              </Button>
              <Controller
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <Input
                    placeholder="…or paste image URL"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title *</FormLabel>
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="auto-generated from title"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleBn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Bangla)</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(c => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
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
                    placeholder="Beginner, Level 2…"
                    {...field}
                    value={field.value ?? ''}
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
                    value={field.value ?? ''}
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
                <FormLabel>Fee (display)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="5000 BDT / Free"
                    {...field}
                    value={field.value ?? ''}
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
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Price (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    value={field.value ?? 0}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounted Price (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    value={field.value ?? 0}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="programTagsInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="RTO, RPL"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="gradientFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gradient From</FormLabel>
                <FormControl>
                  <Input
                    placeholder="#a18cd1"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gradientTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gradient To</FormLabel>
                <FormControl>
                  <Input
                    placeholder="#fbc2eb"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon (emoji)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="🎨"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featuresInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Highlights (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder={'NSDA Certificate\nJob Placement Support'}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Details (dynamic sections) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel>Detail Sections</FormLabel>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({ heading: '', contentInput: '' })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add section
            </Button>
          </div>
          {fields.length === 0 && (
            <p className="text-xs text-slate-500">
              No detail sections yet. Add sections like "Course Info", "Core
              Competencies", etc.
            </p>
          )}
          {fields.map((f, idx) => (
            <div
              key={f.id}
              className="rounded-lg border bg-slate-50/60 p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <FormField
                  control={form.control}
                  name={`details.${idx}.heading`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Section heading"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => remove(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`details.${idx}.contentInput`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={'Bullet 1\nBullet 2'}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={v => field.onChange(!!v)}
                />
              </FormControl>
              <FormLabel className="!mt-0">Featured course</FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : isEdit ? (
            'Save changes'
          ) : (
            'Create course'
          )}
        </Button>
      </form>
    </Form>
  );
}
