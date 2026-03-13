'use client';

// Add useMutation for admin content updates once editor is implemented
import { useQuery } from '@tanstack/react-query';
import { getContentSection } from '@/lib/api/content';
import type { ContentSection } from '@/types/content';

/**
 * Fetches and caches CMS content for a given page section.
 * Used in admin panel Client Components.
 */
export function usePageContent(section: string) {
  return useQuery<ContentSection>({
    queryKey: ['content', section],
    queryFn: () => getContentSection(section),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
