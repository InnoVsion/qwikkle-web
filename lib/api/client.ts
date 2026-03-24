import axios, { type AxiosInstance } from 'axios';

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
  baseURL:
    typeof window === 'undefined'
      ? (process.env.QWIKKLE_API_URL ??
        process.env.API_URL ??
        process.env.NEXT_PUBLIC_API_URL)
      : '/api/backend',
  timeout: 10_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const originalRequest = error.config;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? '';
    if (url.startsWith('/admin/auth/login') || url.startsWith('/admin/auth/refresh')) {
      return Promise.reject(error);
    }

    const configWithRetryFlag = originalRequest as typeof originalRequest & { _retry?: boolean };
    if (configWithRetryFlag._retry) {
      return Promise.reject(error);
    }
    configWithRetryFlag._retry = true;

    try {
      await apiClient.post('/admin/auth/refresh');
      return apiClient(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);
