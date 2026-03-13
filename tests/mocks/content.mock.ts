import type { ContentSection, SiteSettings } from '@/types/content';

export const mockContentSection: ContentSection = {
  id: 'section-1',
  key: 'hero',
  data: {
    headline: 'The Chat App Built for Teams',
    subheadline: 'Fast, secure, and ridiculously easy to use.',
    ctaPrimary: { label: 'Get Started Free', href: '/download' },
  },
  isPublished: true,
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export function createMockContentSection(overrides?: Partial<ContentSection>): ContentSection {
  return { ...mockContentSection, ...overrides };
}

export const mockSiteSettings: SiteSettings = {
  companyName: 'Qwikkle',
  tagline: 'The Chat App Built for Teams',
  metaTitle: 'Qwikkle — The Chat App Built for Teams',
  metaDescription: 'Fast, secure, and ridiculously easy to use.',
  socialLinks: {
    twitter: 'https://twitter.com/qwikkle',
  },
};
