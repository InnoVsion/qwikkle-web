import { apiClient } from './client';
import type { AdminListUser, PaginatedResponse, AccountActionPayload } from '@/types/admin';

export interface GetUsersParams {
  search?: string;
  status?: string;
  dateRange?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch a paginated list of users with optional search and filter params.
 */
export async function getUsers(
  params: GetUsersParams,
): Promise<PaginatedResponse<AdminListUser>> {
  const { data } = await apiClient.get<PaginatedResponse<AdminListUser>>('/admin/users', {
    params,
  });
  return data;
}

/**
 * Fetch a single user by ID.
 */
export async function getUser(id: string): Promise<AdminListUser> {
  const { data } = await apiClient.get<AdminListUser>(`/admin/users/${id}`);
  return data;
}

/**
 * Suspend a user account — reversible.
 */
export async function suspendUser(
  id: string,
  payload: AccountActionPayload,
): Promise<void> {
  await apiClient.patch(`/admin/users/${id}/suspend`, payload);
}

/**
 * Deactivate a user account — data retained, can be reactivated.
 */
export async function deactivateUser(
  id: string,
  payload: AccountActionPayload,
): Promise<void> {
  await apiClient.patch(`/admin/users/${id}/deactivate`, payload);
}

/**
 * Permanently delete a user account and all associated data.
 */
export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/admin/users/${id}`);
}
