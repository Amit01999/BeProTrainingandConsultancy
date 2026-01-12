import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonBn from '@/locales/bn/common.json';
import pagesBn from '@/locales/bn/pages.json';
import formsBn from '@/locales/bn/forms.json';
import coursesBn from '@/locales/bn/courses.json';
import messagesBn from '@/locales/bn/messages.json';

import commonEn from '@/locales/en/common.json';
import pagesEn from '@/locales/en/pages.json';
import formsEn from '@/locales/en/forms.json';
import coursesEn from '@/locales/en/courses.json';
import messagesEn from '@/locales/en/messages.json';

const resources = {
  bn: {
    common: commonBn,
    pages: pagesBn,
    forms: formsBn,
    courses: coursesBn,
    messages: messagesBn,
  },
  en: {
    common: commonEn,
    pages: pagesEn,
    forms: formsEn,
    courses: coursesEn,
    messages: messagesEn,
  },
};

i18n
  .use(LanguageDetector) // Detects language from localStorage
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'bn', // Set Bangla as default for first-time users
    fallbackLng: 'bn', // Bangla as fallback
    defaultNS: 'common',
    ns: ['common', 'pages', 'forms', 'courses', 'messages'],

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false, // Avoid suspense issues
    },
  });

export default i18n;
