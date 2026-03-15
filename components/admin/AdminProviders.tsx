'use client';

import type { ReactNode } from 'react';
import { ToastProvider } from './shared/Toast';

interface AdminProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers scoped to the admin panel.
 * Mounted in the admin layout — wraps ToastProvider and any future admin-specific contexts.
 */
export function AdminProviders({ children }: AdminProvidersProps): React.ReactElement {
  return <ToastProvider>{children}</ToastProvider>;
}
