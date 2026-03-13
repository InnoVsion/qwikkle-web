export type ContentSectionKey = 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta';

export interface ContentSection {
  id: string;
  key: ContentSectionKey;
  data: Record<string, unknown>; // narrowed per section in feature sessions
  isPublished: boolean;
  updatedAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  logo?: string;
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
