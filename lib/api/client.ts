import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

/**
 * Shared Axios instance for all requests to the Go backend.
 * Auth token is attached via request interceptor.
 * 401 responses are handled centrally.
 *
 * Note: baseURL uses process.env directly (not lib/config) because NEXT_PUBLIC_
 * vars are statically inlined at build time — importing config.ts here would
 * cause it to throw at build when .env.local is absent.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
  // Reads JWT from httpOnly cookie — token management implemented in auth session
  if (typeof document !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return requestConfig;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Implement token refresh / redirect to /login on 401 in auth session
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.warn('[apiClient] Unauthorized — token may be expired');
    }
    return Promise.reject(error);
  },
);
