import 'react-i18next';
import common from '@/locales/bn/common.json';
import pages from '@/locales/bn/pages.json';
import forms from '@/locales/bn/forms.json';
import courses from '@/locales/bn/courses.json';
import messages from '@/locales/bn/messages.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      pages: typeof pages;
      forms: typeof forms;
      courses: typeof courses;
      messages: typeof messages;
    };
  }
}
