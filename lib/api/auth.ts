// TODO: Implement when Go backend /api/admin/auth/login is ready.
// Stub functions are defined here so imports across the codebase don't break.

import type { AdminUser } from '@/types/admin';

export interface LoginPayload {
  qkId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  admin: AdminUser;
}

/**
 * Authenticate an admin user against the Go backend.
 * @stub — not yet implemented. Returns a rejected promise.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function adminLogin(_payload: LoginPayload): Promise<LoginResponse> {
  // TODO: Replace with real API call
  // return apiClient.post<LoginResponse>('/admin/auth/login', payload).then(r => r.data);
  return Promise.reject(new Error('adminLogin: not yet implemented'));
}

/**
 * Invalidate the current admin session on the backend.
 * @stub — not yet implemented.
 */
export async function adminLogout(): Promise<void> {
  // TODO: Replace with real API call
  // return apiClient.post('/admin/auth/logout').then(() => void 0);
  return Promise.resolve();
}
