import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  console.warn(
    'DATABASE_URL not set. Drizzle/Postgres configuration is disabled (project migrated to MongoDB).'
  );
}

export default defineConfig({
  out: './migrations',
  schema: './shared/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
