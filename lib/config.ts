import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_CDN_HOST: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  REVALIDATION_SECRET: z.string().min(16).optional(),
});

// Throws at startup if required env vars are missing or malformed
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration. Check .env.local.');
}

export const config = parsed.data;
