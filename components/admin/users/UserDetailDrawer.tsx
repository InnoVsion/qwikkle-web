'use client';

import { OctagonX, PowerOff, Trash2 } from 'lucide-react';
import { BaseDrawer } from '@/components/admin/shared/BaseDrawer';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import type { ConfirmAction } from '@/components/admin/shared/ConfirmActionModal';
import { useUser } from '@/lib/hooks/useUsers';
import { formatDate } from '@/lib/utils/formatDate';

interface UserDetailDrawerProps {
  userId: string | null;
  onClose: () => void;
  onAction: (action: ConfirmAction) => void;
}

function SkeletonLine({ width = 'full' }: { width?: string }): React.ReactElement {
  return (
    <div
      className={`h-4 animate-pulse rounded bg-[#E4E8EC]`}
      style={{ width: width === 'full' ? '100%' : width }}
    />
  );
}

function DrawerContent({ userId, onAction }: { userId: string; onAction: (a: ConfirmAction) => void }): React.ReactElement {
  const { data: user, isLoading, isError } = useUser(userId);

  if (isLoading) {
    return (
      <div className="p-5 space-y-6">
        {/* Avatar + info skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-[#E4E8EC]" />
          <div className="flex-1 space-y-2">
            <SkeletonLine width="60%" />
            <SkeletonLine width="75%" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <SkeletonLine width="30%" />
              <SkeletonLine width="45%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-sm font-medium text-[#263238]">Failed to load user</p>
        <p className="mt-1 text-xs text-[#9E9E9E]">Please try closing and reopening the panel.</p>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
  const isSuspended = user.status === 'suspended';
  const isDeactivated = user.status === 'deactivated';

  const infoRows: { label: string; value: string }[] = [
    { label: 'User ID', value: user.id },
    { label: 'Joined', value: formatDate(user.createdAt) },
    ...(user.lastActiveAt ? [{ label: 'Last Active', value: formatDate(user.lastActiveAt) }] : []),
    ...(user.organizationId ? [{ label: 'Organization ID', value: user.organizationId }] : []),
  ];

  return (
    <div className="divide-y divide-[#E4E8EC]">
      {/* Identity */}
      <div className="p-5">
        <div className="flex items-center gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
            style={{ background: '#E91E63' }}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#263238]">{fullName}</p>
            <p className="truncate text-sm text-[#9E9E9E]">{user.email}</p>
            {user.phone && <p className="truncate text-sm text-[#9E9E9E]">{user.phone}</p>}
          </div>
        </div>
        <div className="mt-3">
          <StatusBadge status={user.status} />
        </div>
      </div>

      {/* Account information */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
          Account Information
        </p>
        <dl className="space-y-2.5">
          {infoRows.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 font-medium text-[#9E9E9E]">{label}</dt>
              <dd className="truncate text-right font-mono text-xs text-[#263238]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Actions */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
          Actions
        </p>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onAction('suspend')}
            disabled={isSuspended || isDeactivated}
            className="flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              borderColor: 'rgba(255, 152, 0, 0.30)',
              color: '#E65100',
              background: 'rgba(255, 152, 0, 0.04)',
            }}
          >
            <OctagonX size={14} />
            Suspend Account
          </button>
          <button
            type="button"
            onClick={() => onAction('deactivate')}
            disabled={isDeactivated}
            className="flex items-center gap-2.5 rounded-xl border border-[#E4E8EC] bg-white px-4 py-2.5 text-sm font-medium text-[#757575] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PowerOff size={14} />
            Deactivate Account
          </button>
          <button
            type="button"
            onClick={() => onAction('delete')}
            className="flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: 'rgba(244, 67, 54, 0.30)',
              color: '#C62828',
              background: 'rgba(244, 67, 54, 0.04)',
            }}
          >
            <Trash2 size={14} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export function UserDetailDrawer({
  userId,
  onClose,
  onAction,
}: UserDetailDrawerProps): React.ReactElement {
  return (
    <BaseDrawer isOpen={!!userId} onClose={onClose} title="User Details">
      {userId && <DrawerContent userId={userId} onAction={onAction} />}
    </BaseDrawer>
  );
}
