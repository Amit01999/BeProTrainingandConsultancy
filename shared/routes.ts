import { z } from 'zod';
import {
  insertUserSchema,
  insertCourseSchema,
  insertApplicationSchema,
  insertContactSchema,
  initiateEnrollmentSchema,
  submitPaymentSchema,
  User,
  Course,
  Application,
  Contact,
  Enrollment,
  EnrollmentWithRefs,
  UploadedImageResponse,
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<User>(),
        400: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<User>(),
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<User>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  courses: {
    list: {
      method: 'GET' as const,
      path: '/api/courses',
      input: z
        .object({
          category: z.string().optional(),
        })
        .optional(),
      responses: {
        200: z.array(z.custom<Course>()),
      },
    },
    // Single source of truth for reads: resolves slug OR id
    get: {
      method: 'GET' as const,
      path: '/api/courses/:slug',
      responses: {
        200: z.custom<Course>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/courses',
      input: insertCourseSchema,
      responses: {
        201: z.custom<Course>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/courses/:id',
      input: insertCourseSchema.partial(),
      responses: {
        200: z.custom<Course>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/courses/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    uploadImage: {
      method: 'POST' as const,
      path: '/api/courses/upload-image',
      // body is multipart/form-data; validation handled by multer middleware
      responses: {
        201: z.custom<UploadedImageResponse>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
  applications: {
    create: {
      method: 'POST' as const,
      path: '/api/applications',
      input: insertApplicationSchema,
      responses: {
        201: z.custom<Application>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/applications',
      responses: {
        200: z.array(z.custom<Application & { course: Course; user: User }>()),
        401: errorSchemas.unauthorized,
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/applications/:id/status',
      input: z.object({ status: z.enum(['pending', 'approved', 'rejected']) }),
      responses: {
        200: z.custom<Application>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
  contacts: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        201: z.custom<Contact>(),
        400: errorSchemas.validation,
      },
    },
  },
  enrollments: {
    // Admin — list every enrollment (optionally filter by status)
    list: {
      method: 'GET' as const,
      path: '/api/enrollments',
      responses: {
        200: z.array(z.custom<EnrollmentWithRefs>()),
        401: errorSchemas.unauthorized,
      },
    },
    // Authenticated user — list their own enrollments (optionally filter)
    mine: {
      method: 'GET' as const,
      path: '/api/enrollments/user',
      responses: {
        200: z.array(z.custom<EnrollmentWithRefs>()),
        401: errorSchemas.unauthorized,
      },
    },
    // Step 1: "Enroll Now" — upserts an `initiated` enrollment (idempotent)
    create: {
      method: 'POST' as const,
      path: '/api/enrollments',
      input: initiateEnrollmentSchema,
      responses: {
        201: z.custom<Enrollment>(),
        200: z.custom<Enrollment>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    // Step 2: "Submit Payment" — moves initiated|rejected → pending
    pay: {
      method: 'PATCH' as const,
      path: '/api/enrollments/:id/pay',
      input: submitPaymentSchema,
      responses: {
        200: z.custom<Enrollment>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      },
    },
    verify: {
      method: 'PATCH' as const,
      path: '/api/enrollments/:id/verify',
      responses: {
        200: z.custom<EnrollmentWithRefs>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    reject: {
      method: 'PATCH' as const,
      path: '/api/enrollments/:id/reject',
      input: z
        .object({ notes: z.string().max(500).optional() })
        .optional(),
      responses: {
        200: z.custom<EnrollmentWithRefs>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    uploadScreenshot: {
      method: 'POST' as const,
      path: '/api/enrollments/upload-screenshot',
      responses: {
        201: z.custom<UploadedImageResponse>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
