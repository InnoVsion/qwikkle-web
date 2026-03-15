import { apiClient } from './client';
import type { OrganizationDocument, PaginatedResponse, DocumentRejectPayload } from '@/types/admin';

export interface GetDocumentsParams {
  search?: string;
  status?: string;
  type?: string;
  orgId?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch a paginated list of documents with optional search and filter params.
 */
export async function getDocuments(
  params: GetDocumentsParams,
): Promise<PaginatedResponse<OrganizationDocument>> {
  const { data } = await apiClient.get<PaginatedResponse<OrganizationDocument>>(
    '/admin/documents',
    { params },
  );
  return data;
}

/**
 * Fetch a single document by ID.
 */
export async function getDocument(id: string): Promise<OrganizationDocument> {
  const { data } = await apiClient.get<OrganizationDocument>(`/admin/documents/${id}`);
  return data;
}

/**
 * Approve a document — grants the organization verified status.
 */
export async function approveDocument(id: string): Promise<void> {
  await apiClient.patch(`/admin/documents/${id}/approve`);
}

/**
 * Reject a document — requires a non-empty reason for the organization to resubmit.
 */
export async function rejectDocument(id: string, payload: DocumentRejectPayload): Promise<void> {
  await apiClient.patch(`/admin/documents/${id}/reject`, payload);
}
