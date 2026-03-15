import { Suspense } from 'react';
import type { Metadata } from 'next';
import { OrganizationsTable } from '@/components/admin/organizations/OrganizationsTable';

export const metadata: Metadata = { title: 'Organizations — Qwikkle Admin' };

export default function OrganizationsPage(): React.ReactElement {
  return (
    <Suspense>
      <OrganizationsTable />
    </Suspense>
  );
}
