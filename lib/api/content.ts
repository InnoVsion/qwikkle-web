// Implement full CRUD for each content section once types/content.ts is finalized
import { apiClient } from './client';
import type { ContentSection, SiteSettings } from '@/types/content';

/**
 * Fetch CMS content for a specific page section.
 *
 * @param section - Section key (e.g. "hero", "features")
 * @throws AxiosError if the request fails or section is not found
 */
export async function getContentSection(section: string): Promise<ContentSection> {
  const { data } = await apiClient.get<ContentSection>(`/content/${section}`);
  return data;
}

/**
 * Update CMS content for a specific page section.
 */
export async function updateContentSection(
  section: string,
  payload: Partial<ContentSection>,
): Promise<ContentSection> {
  const { data } = await apiClient.patch<ContentSection>(`/content/${section}`, payload);
  return data;
}

/**
 * Fetch global site settings (company name, SEO, social links).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await apiClient.get<SiteSettings>('/settings');
  return data;
}
