import { Suspense } from 'react';
import type { Metadata } from 'next';
import { UsersTable } from '@/components/admin/users/UsersTable';

export const metadata: Metadata = { title: 'Users — Qwikkle Admin' };

// useSearchParams() in UsersTable requires a Suspense boundary
export default function UsersPage(): React.ReactElement {
  return (
    <Suspense>
      <UsersTable />
    </Suspense>
  );
}
