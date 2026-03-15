'use client';

import { useEffect, useState } from 'react';
import type { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useDocuments } from '@/lib/hooks/useDocuments';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { PendingDocumentsBanner } from './PendingDocumentsBanner';
import { DocumentReviewDrawer } from './DocumentReviewDrawer';
import type { DocumentType, DocumentStatus, OrganizationDocument } from '@/types/admin';

const PAGE_SIZE = 20;

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  registration_certificate: 'Reg. Certificate',
  tax_id: 'Tax ID',
  proof_of_address: 'Proof of Address',
  id_document: 'ID Document',
  other: 'Other',
};

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'Reg. Certificate', value: 'registration_certificate' },
  { label: 'Tax ID', value: 'tax_id' },
  { label: 'Proof of Address', value: 'proof_of_address' },
  { label: 'ID Document', value: 'id_document' },
  { label: 'Other', value: 'other' },
];

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}): React.ReactElement {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-[#E4E8EC] bg-white px-3 py-2 text-sm text-[#263238] outline-none transition-colors focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function OrgLogo({ doc }: { doc: OrganizationDocument }): React.ReactElement {
  const initial = doc.organizationName[0]?.toUpperCase() ?? '?';
  if (doc.organizationLogoUrl) {
    return (
      <Image
        src={doc.organizationLogoUrl}
        alt={`${doc.organizationName} logo`}
        width={32}
        height={32}
        unoptimized
        className="h-8 w-8 rounded-lg object-cover"
      />
    );
  }
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
      style={{ background: '#E91E63' }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function TableSkeleton(): React.ReactElement {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-[#E4E8EC]">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-[#E4E8EC]" />
              <div className="h-4 w-28 animate-pulse rounded bg-[#E4E8EC]" />
            </div>
          </td>
          <td className="px-4 py-3"><div className="h-4 w-28 animate-pulse rounded bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-7 w-16 animate-pulse rounded-lg bg-[#E4E8EC]" /></td>
        </tr>
      ))}
    </>
  );
}

function ActionButton({
  status,
  onClick,
}: {
  status: DocumentStatus;
  onClick: () => void;
}): React.ReactElement {
  const isPending = status === 'pending';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
        isPending
          ? 'bg-[#E91E63] text-white hover:bg-[#C2185B]'
          : 'border border-[#E4E8EC] bg-white text-[#263238] hover:bg-[#F5F7F9]',
      )}
    >
      {isPending ? 'Review' : 'View'}
    </button>
  );
}

export function DocumentsTable(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') ?? '';
  const currentStatus = searchParams.get('status') ?? '';
  const currentType = searchParams.get('type') ?? '';
  const currentOrgId = searchParams.get('orgId') ?? '';
  const currentPage = Number(searchParams.get('page') ?? '1');

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ search: localSearch || null, page: null });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  function updateParams(updates: Record<string, string | null>): void {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}` as Route<string>);
  }

  const handlePageChange = (newPage: number): void => {
    updateParams({ page: String(newPage) });
  };

  const { data, isLoading, isError } = useDocuments({
    search: currentSearch || undefined,
    status: currentStatus || undefined,
    type: currentType || undefined,
    orgId: currentOrgId || undefined,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  // Separate query for global pending count (for the banner)
  const { data: pendingData } = useDocuments({ status: 'pending', limit: 1 });
  const pendingCount = pendingData?.meta?.total ?? 0;

  const totalItems = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;
  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#263238]">Document Review</h2>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0BEC5]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by organization name…"
            className="w-full rounded-xl border border-[#E4E8EC] bg-white py-2 pl-10 pr-4 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]"
            aria-label="Search documents"
          />
        </div>
        <FilterSelect
          value={currentStatus}
          onChange={(v) => updateParams({ status: v || null, page: null })}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          value={currentType}
          onChange={(v) => updateParams({ type: v || null, page: null })}
          options={TYPE_OPTIONS}
        />
      </div>

      {pendingCount > 0 && !currentStatus && (
        <PendingDocumentsBanner
          count={pendingCount}
          onClick={() => updateParams({ status: 'pending', page: null })}
        />
      )}

      <div
        className="overflow-hidden rounded-2xl border border-[#E4E8EC] bg-white"
        style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
      >
        {!isLoading && !isError && data && (
          <div className="border-b border-[#E4E8EC] px-5 py-3">
            <p className="text-xs text-[#9E9E9E]">
              Showing {startItem}–{endItem} of {totalItems.toLocaleString()} documents
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          {isError ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <AlertCircle size={20} className="text-[#9E9E9E]" />
              <p className="text-sm font-medium text-[#263238]">Failed to load documents</p>
              <p className="text-xs text-[#9E9E9E]">Check your connection and try again.</p>
            </div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E4E8EC] bg-[#F5F7F9]">
                  {['Organization', 'Document Type', 'Uploaded', 'Status', 'Actions'].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-sm text-[#9E9E9E]">
                      No documents found.
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-[#E4E8EC] transition-colors last:border-0 hover:bg-[#F5F7F9]/60"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <OrgLogo doc={doc} />
                          <span className="text-sm font-medium text-[#263238]">
                            {doc.organizationName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#263238]">
                        {DOC_TYPE_LABELS[doc.type]}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#9E9E9E]">
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }).format(new Date(doc.uploadedAt))}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={doc.status as DocumentStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <ActionButton
                          status={doc.status as DocumentStatus}
                          onClick={() => setSelectedDocId(doc.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {!isError && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#E4E8EC] px-5 py-3">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <p className="text-sm text-[#9E9E9E]">
              Page {currentPage} of {totalPages}
            </p>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <DocumentReviewDrawer
        docId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
    </>
  );
}
