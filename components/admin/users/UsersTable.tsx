'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Download, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUsers, useSuspendUser, useDeactivateUser, useDeleteUser } from '@/lib/hooks/useUsers';
import { useToast } from '@/components/admin/shared/Toast';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { UserActionsMenu } from './UserActionsMenu';
import { UserDetailDrawer } from './UserDetailDrawer';
import {
  ConfirmActionModal,
  type ConfirmAction,
} from '@/components/admin/shared/ConfirmActionModal';
import { formatDate } from '@/lib/utils/formatDate';
import type { AdminListUser, AccountStatus } from '@/types/admin';

const PAGE_SIZE = 20;

const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Deactivated', value: 'deactivated' },
];

const DATE_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Time', value: '' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
];

interface ModalState {
  action: ConfirmAction;
  userId: string;
  userName: string;
  userEmail: string;
}

function UserAvatar({ user }: { user: AdminListUser }): React.ReactElement {
  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: '#E91E63' }}
      aria-hidden="true"
    >
      {initials}
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
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#E4E8EC]" />
              <div className="h-4 w-32 animate-pulse rounded bg-[#E4E8EC]" />
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 w-40 animate-pulse rounded bg-[#E4E8EC]" />
          </td>
          <td className="px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-[#E4E8EC]" />
          </td>
          <td className="px-4 py-3">
            <div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8EC]" />
          </td>
          <td className="px-4 py-3">
            <div className="h-6 w-6 animate-pulse rounded bg-[#E4E8EC]" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function UsersTable(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tableRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  // Derive filter state from URL
  const currentSearch = searchParams.get('search') ?? '';
  const currentStatus = searchParams.get('status') ?? '';
  const currentDateRange = searchParams.get('dateRange') ?? '';
  const currentPage = Number(searchParams.get('page') ?? '1');

  // Local search state — debounced before writing to URL
  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Modal and drawer state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const suspendMutation = useSuspendUser();
  const deactivateMutation = useDeactivateUser();
  const deleteMutation = useDeleteUser();

  // Sync local search input to URL with 300ms debounce
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

  const { data, isLoading, isError } = useUsers({
    search: currentSearch || undefined,
    status: currentStatus || undefined,
    dateRange: currentDateRange || undefined,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const openModal = useCallback(
    (action: ConfirmAction, user: AdminListUser): void => {
      setModalError(null);
      setModal({
        action,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
      });
    },
    [],
  );

  const closeModal = (): void => {
    setModal(null);
    setModalError(null);
  };

  const handleConfirm = async (reason?: string): Promise<void> => {
    if (!modal) return;
    setModalError(null);

    try {
      if (modal.action === 'suspend') {
        await suspendMutation.mutateAsync({ id: modal.userId, reason });
        addToast(`${modal.userName}'s account has been suspended.`, 'warning');
      } else if (modal.action === 'deactivate') {
        await deactivateMutation.mutateAsync({ id: modal.userId, reason });
        addToast(`${modal.userName}'s account has been deactivated.`, 'neutral');
      } else {
        await deleteMutation.mutateAsync(modal.userId);
        if (selectedUserId === modal.userId) setSelectedUserId(null);
        addToast(`${modal.userName}'s account has been deleted.`, 'success');
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
      {/* Page header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#263238]">Users</h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#E4E8EC] bg-white px-4 py-2 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9]"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
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
            placeholder="Search users…"
            className="w-full rounded-xl border border-[#E4E8EC] bg-white py-2 pl-10 pr-4 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)]"
            aria-label="Search users"
          />
        </div>
        <FilterSelect
          value={currentStatus}
          onChange={(v) => updateParams({ status: v || null, page: null })}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          value={currentDateRange}
          onChange={(v) => updateParams({ dateRange: v || null, page: null })}
          options={DATE_OPTIONS}
        />
      </div>

      {/* Table card */}
      <div
        className="overflow-hidden rounded-2xl border border-[#E4E8EC] bg-white"
        style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
      >
        {/* Result count */}
        {!isLoading && !isError && data && (
          <div className="border-b border-[#E4E8EC] px-5 py-3">
            <p className="text-xs text-[#9E9E9E]">
              Showing {startItem}–{endItem} of {totalItems.toLocaleString()} users
            </p>
          </div>
        )}

        {/* Scrollable table area */}
        <div ref={tableRef} className="overflow-x-auto">
          {isError ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <AlertCircle size={20} className="text-[#9E9E9E]" />
              <p className="text-sm font-medium text-[#263238]">Failed to load users</p>
              <p className="text-xs text-[#9E9E9E]">Check your connection and try again.</p>
            </div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E4E8EC] bg-[#F5F7F9]">
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-[#E4E8EC]"
                      aria-label="Select all"
                    />
                  </th>
                  {['User', 'Email', 'Joined', 'Status', ''].map((col) => (
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
                    <td colSpan={6} className="py-16 text-center text-sm text-[#9E9E9E]">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((user) => (
                    <tr
                      key={user.id}
                      className={cn(
                        'border-b border-[#E4E8EC] transition-colors last:border-0',
                        'hover:bg-[#F5F7F9]/60',
                      )}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-[#E4E8EC]"
                          aria-label={`Select ${user.firstName} ${user.lastName}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />
                          <span className="text-sm font-medium text-[#263238]">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#9E9E9E]">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-[#9E9E9E]">
                        {formatDate(user.createdAt, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.status as AccountStatus} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <UserActionsMenu
                          userId={user.id}
                          status={user.status as AccountStatus}
                          onViewDetails={() => setSelectedUserId(user.id)}
                          onAction={(action) => openModal(action, user)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
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

      {/* User detail drawer */}
      <UserDetailDrawer
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
        onAction={(action) => {
          if (!selectedUserId) return;
          const user = data?.data?.find((u) => u.id === selectedUserId);
          if (!user) return;
          openModal(action, user);
        }}
      />

      {/* Confirm action modal */}
      {modal && (
        <ConfirmActionModal
          key={`${modal.action}-${modal.userId}`}
          isOpen={!!modal}
          onClose={closeModal}
          action={modal.action}
          entityName={modal.userName}
          entityEmail={modal.userEmail}
          onConfirm={handleConfirm}
          isLoading={isMutating}
          error={modalError}
        />
      )}
    </>
  );
}
