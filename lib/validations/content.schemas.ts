// Add per-section schemas (heroSchema, featuresSchema, etc.) once CMS editor is built
import { z } from 'zod';

export const updateHeroSchema = z.object({
  headline: z.string().min(10).max(100).trim(),
  subheadline: z.string().min(10).max(200).trim(),
  ctaPrimaryLabel: z.string().min(2).max(40).trim(),
  ctaPrimaryHref: z.string().url().or(z.string().startsWith('/')),
  ctaSecondaryLabel: z.string().min(2).max(40).trim().optional(),
  ctaSecondaryHref: z.string().url().or(z.string().startsWith('/')).optional(),
});

export type UpdateHeroInput = z.infer<typeof updateHeroSchema>;
