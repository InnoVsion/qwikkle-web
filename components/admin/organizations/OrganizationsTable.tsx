'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Route } from 'next';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  useOrganizations,
  useSuspendOrganization,
  useDeactivateOrganization,
  useDeleteOrganization,
} from '@/lib/hooks/useOrganizations';
import { useToast } from '@/components/admin/shared/Toast';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { OrgActionsMenu } from './OrgActionsMenu';
import { OrgDetailDrawer } from './OrgDetailDrawer';
import {
  ConfirmActionModal,
  type ConfirmAction,
} from '@/components/admin/shared/ConfirmActionModal';
import type { AccountStatus, Organization, VerificationStatus } from '@/types/admin';

const PAGE_SIZE = 20;

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Deactivated', value: 'deactivated' },
];

const VERIFICATION_OPTIONS = [
  { label: 'All Verification', value: '' },
  { label: 'Verified', value: 'approved' },
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' },
];

interface ModalState {
  action: ConfirmAction;
  orgId: string;
  orgName: string;
  orgEmail: string;
}

function OrgLogo({ org }: { org: Organization }): React.ReactElement {
  const initial = org.name[0]?.toUpperCase() ?? '?';
  if (org.logoUrl) {
    return (
      <Image
        src={org.logoUrl}
        alt={`${org.name} logo`}
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

function TableSkeleton(): React.ReactElement {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-[#E4E8EC]">
          <td className="w-10 px-4 py-3">
            <div className="h-4 w-4 animate-pulse rounded bg-[#E4E8EC]" />
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-[#E4E8EC]" />
              <div className="h-4 w-32 animate-pulse rounded bg-[#E4E8EC]" />
            </div>
          </td>
          <td className="px-4 py-3"><div className="h-4 w-36 animate-pulse rounded bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-4 w-10 animate-pulse rounded bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8EC]" /></td>
          <td className="px-4 py-3"><div className="h-6 w-6 animate-pulse rounded bg-[#E4E8EC]" /></td>
        </tr>
      ))}
    </>
  );
}

export function OrganizationsTable(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tableRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const currentSearch = searchParams.get('search') ?? '';
  const currentStatus = searchParams.get('status') ?? '';
  const currentVerification = searchParams.get('verificationStatus') ?? '';
  const currentPage = Number(searchParams.get('page') ?? '1');

  const [localSearch, setLocalSearch] = useState(currentSearch);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const suspendMutation = useSuspendOrganization();
  const deactivateMutation = useDeactivateOrganization();
  const deleteMutation = useDeleteOrganization();

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
    tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, isLoading, isError } = useOrganizations({
    search: currentSearch || undefined,
    status: currentStatus || undefined,
    verificationStatus: currentVerification || undefined,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const openModal = useCallback((action: ConfirmAction, org: Organization): void => {
    setModalError(null);
    setModal({ action, orgId: org.id, orgName: org.name, orgEmail: org.email });
  }, []);

  const closeModal = (): void => {
    setModal(null);
    setModalError(null);
  };

  const handleConfirm = async (reason?: string): Promise<void> => {
    if (!modal) return;
    setModalError(null);
    try {
      if (modal.action === 'suspend') {
        await suspendMutation.mutateAsync({ id: modal.orgId, reason });
        addToast(`${modal.orgName} has been suspended.`, 'warning');
      } else if (modal.action === 'deactivate') {
        await deactivateMutation.mutateAsync({ id: modal.orgId, reason });
        addToast(`${modal.orgName} has been deactivated.`, 'neutral');
      } else {
        await deleteMutation.mutateAsync(modal.orgId);
        if (selectedOrgId === modal.orgId) setSelectedOrgId(null);
        addToast(`${modal.orgName} has been deleted.`, 'success');
      }
      closeModal();
    } catch {
      setModalError('Something went wrong. Please try again.');
    }
  };

  const isMutating =
    suspendMutation.isPending || deactivateMutation.isPending || deleteMutation.isPending;

  const totalItems = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;
  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#263238]">Organizations</h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#E4E8EC] bg-white px-4 py-2 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9]"
        >
          <Download size={14} />
          Export CSV
        </button>
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
            placeholder="Search organizations…"
            className="w-full rounded-xl border border-[#E4E8EC] bg-white py-2 pl-10 pr-4 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]"
            aria-label="Search organizations"
          />
        </div>
        <FilterSelect
          value={currentStatus}
          onChange={(v) => updateParams({ status: v || null, page: null })}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          value={currentVerification}
          onChange={(v) => updateParams({ verificationStatus: v || null, page: null })}
          options={VERIFICATION_OPTIONS}
        />
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-[#E4E8EC] bg-white"
        style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
      >
        {!isLoading && !isError && data && (
          <div className="border-b border-[#E4E8EC] px-5 py-3">
            <p className="text-xs text-[#9E9E9E]">
              Showing {startItem}–{endItem} of {totalItems.toLocaleString()} organizations
            </p>
          </div>
        )}

        <div ref={tableRef} className="overflow-x-auto">
          {isError ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <AlertCircle size={20} className="text-[#9E9E9E]" />
              <p className="text-sm font-medium text-[#263238]">Failed to load organizations</p>
              <p className="text-xs text-[#9E9E9E]">Check your connection and try again.</p>
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E4E8EC] bg-[#F5F7F9]">
                  <th className="w-10 px-4 py-3 text-left">
                    <input type="checkbox" className="rounded border-[#E4E8EC]" aria-label="Select all" />
                  </th>
                  {['Organization', 'Email', 'Members', 'Verified', 'Status', ''].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#9E9E9E]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-sm text-[#9E9E9E]">
                      No organizations found.
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((org) => (
                    <tr
                      key={org.id}
                      className={cn(
                        'border-b border-[#E4E8EC] transition-colors last:border-0',
                        'hover:bg-[#F5F7F9]/60',
                      )}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-[#E4E8EC]"
                          aria-label={`Select ${org.name}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <OrgLogo org={org} />
                          <span className="text-sm font-medium text-[#263238]">{org.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#9E9E9E]">{org.email}</td>
                      <td className="px-4 py-3 text-sm text-[#263238]">{org.memberCount}</td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={org.verificationStatus as VerificationStatus}
                          label={org.verificationStatus === 'approved' ? 'Verified' : undefined}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={org.status as AccountStatus} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <OrgActionsMenu
                          orgId={org.id}
                          status={org.status as AccountStatus}
                          onViewDetails={() => setSelectedOrgId(org.id)}
                          onAction={(action) => openModal(action, org)}
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

      <OrgDetailDrawer
        orgId={selectedOrgId}
        onClose={() => setSelectedOrgId(null)}
        onAction={(action) => {
          if (!selectedOrgId) return;
          const org = data?.data?.find((o) => o.id === selectedOrgId);
          if (!org) return;
          openModal(action, org);
        }}
      />

      {modal && (
        <ConfirmActionModal
          key={`${modal.action}-${modal.orgId}`}
          isOpen={!!modal}
          onClose={closeModal}
          action={modal.action}
          entityName={modal.orgName}
          entityEmail={modal.orgEmail}
          onConfirm={handleConfirm}
          isLoading={isMutating}
          error={modalError}
        />
      )}
    </>
  );
}
