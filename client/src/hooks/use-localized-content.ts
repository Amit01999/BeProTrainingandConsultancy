import { useTranslation } from 'react-i18next';
import type { Course } from '@shared/schema';

/**
 * Hook to get localized course content based on current language
 * Falls back to English if Bangla translation is not available
 */
export function useLocalizedCourse(course: Course) {
  const { i18n } = useTranslation();
  const isBangla = i18n.language === 'bn';

  return {
    title: isBangla && course.titleBn ? course.titleBn : course.title,
    description:
      isBangla && course.descriptionBn
        ? course.descriptionBn
        : (course.description || ''),
  };
}
