// Implement token refresh and logout once auth flow is designed
import { apiClient } from './client';
import type { AuthTokens, LoginCredentials, User } from '@/types/auth';

/**
 * Authenticate an admin user and return JWT tokens.
 */
export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
  const { data } = await apiClient.post<AuthTokens>('/auth/login', credentials);
  return data;
}

/**
 * Fetch the currently authenticated user's profile.
 */
export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
}

/**
 * Invalidate the current session on the Go backend.
 */
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
