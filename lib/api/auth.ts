import { apiClient } from './client';
import type { AdminUser } from '@/types/admin';

export interface LoginPayload {
  qkId: string;
  password: string;
}

export interface LoginResponse {
  admin: AdminUser;
}

export async function adminLogin(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/admin/auth/login', payload);
  return data;
}

export async function adminLogout(): Promise<void> {
  await apiClient.post('/admin/auth/logout');
}

export async function adminMe(): Promise<LoginResponse> {
  const { data } = await apiClient.get<LoginResponse>('/admin/auth/me');
  return data;
}
