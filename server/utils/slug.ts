import slugify from 'slugify';
import { CourseModel } from '../models';

export function toSlug(input: string): string {
  return slugify(input, { lower: true, strict: true, trim: true });
}

export async function generateUniqueCourseSlug(
  title: string,
  ignoreId?: string,
): Promise<string> {
  const base = toSlug(title) || 'course';
  let candidate = base;
  let counter = 2;

  while (true) {
    const filter: Record<string, unknown> = { slug: candidate };
    if (ignoreId) filter._id = { $ne: ignoreId };
    const existing = await CourseModel.exists(filter);
    if (!existing) return candidate;
    candidate = `${base}-${counter++}`;
  }
}
