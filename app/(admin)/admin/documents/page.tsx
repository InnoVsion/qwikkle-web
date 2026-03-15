import { Suspense } from 'react';
import type { Metadata } from 'next';
import { DocumentsTable } from '@/components/admin/documents/DocumentsTable';

export const metadata: Metadata = { title: 'Document Review — Qwikkle Admin' };

export default function DocumentsPage(): React.ReactElement {
  return (
    <Suspense>
      <DocumentsTable />
    </Suspense>
  );
}
