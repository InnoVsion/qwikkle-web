import { z } from 'zod';

export const loginSchema = z.object({
  qkId: z
    .string()
    .trim()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?(?:\.qk)?$/i, 'Enter a valid .QK ID'),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;
