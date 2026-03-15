import { apiClient } from './client';
import type { Organization, PaginatedResponse, AccountActionPayload } from '@/types/admin';

export interface GetOrganizationsParams {
  search?: string;
  status?: string;
  verificationStatus?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch a paginated list of organizations with optional search and filter params.
 */
export async function getOrganizations(
  params: GetOrganizationsParams,
): Promise<PaginatedResponse<Organization>> {
  const { data } = await apiClient.get<PaginatedResponse<Organization>>(
    '/admin/organizations',
    { params },
  );
  return data;
}

/**
 * Fetch a single organization by ID, including its documents array.
 */
export async function getOrganization(id: string): Promise<Organization> {
  const { data } = await apiClient.get<Organization>(`/admin/organizations/${id}`);
  return data;
}

/**
 * Suspend an organization account — reversible.
 */
export async function suspendOrganization(
  id: string,
  payload: AccountActionPayload,
): Promise<void> {
  await apiClient.patch(`/admin/organizations/${id}/suspend`, payload);
}

/**
 * Deactivate an organization account — data retained, can be reactivated.
 */
export async function deactivateOrganization(
  id: string,
  payload: AccountActionPayload,
): Promise<void> {
  await apiClient.patch(`/admin/organizations/${id}/deactivate`, payload);
}

/**
 * Permanently delete an organization and all associated data.
 */
export async function deleteOrganization(id: string): Promise<void> {
  await apiClient.delete(`/admin/organizations/${id}`);
}
