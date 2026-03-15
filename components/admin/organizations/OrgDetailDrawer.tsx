'use client';

import Link from 'next/link';
import type { Route } from 'next';
import Image from 'next/image';
import { ArrowRight, FileText, OctagonX, PowerOff, Trash2 } from 'lucide-react';
import { BaseDrawer } from '@/components/admin/shared/BaseDrawer';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import type { ConfirmAction } from '@/components/admin/shared/ConfirmActionModal';
import { useOrganization } from '@/lib/hooks/useOrganizations';
import { formatDate } from '@/lib/utils/formatDate';
import type { DocumentType } from '@/types/admin';

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  registration_certificate: 'Reg. Certificate',
  tax_id: 'Tax ID',
  proof_of_address: 'Proof of Address',
  id_document: 'ID Document',
  other: 'Other',
};

interface OrgDetailDrawerProps {
  orgId: string | null;
  onClose: () => void;
  onAction: (action: ConfirmAction) => void;
}

function SkeletonLine({ width = 'full' }: { width?: string }): React.ReactElement {
  return (
    <div
      className="h-4 animate-pulse rounded bg-[#E4E8EC]"
      style={{ width: width === 'full' ? '100%' : width }}
    />
  );
}

function DrawerContent({
  orgId,
  onAction,
}: {
  orgId: string;
  onAction: (a: ConfirmAction) => void;
}): React.ReactElement {
  const { data: org, isLoading, isError } = useOrganization(orgId);

  if (isLoading) {
    return (
      <div className="space-y-6 p-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-xl bg-[#E4E8EC]" />
          <div className="flex-1 space-y-2">
            <SkeletonLine width="55%" />
            <SkeletonLine width="70%" />
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <SkeletonLine width="28%" />
              <SkeletonLine width="40%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !org) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-sm font-medium text-[#263238]">Failed to load organization</p>
        <p className="mt-1 text-xs text-[#9E9E9E]">Please try closing and reopening the panel.</p>
      </div>
    );
  }

  const nameInitial = org.name[0]?.toUpperCase() ?? '?';
  const isSuspended = org.status === 'suspended';
  const isDeactivated = org.status === 'deactivated';

  return (
    <div className="divide-y divide-[#E4E8EC]">
      {/* Identity */}
      <div className="p-5">
        <div className="flex items-center gap-4">
          {org.logoUrl ? (
            <Image
              src={org.logoUrl}
              alt={`${org.name} logo`}
              width={48}
              height={48}
              unoptimized
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
              style={{ background: '#E91E63' }}
              aria-hidden="true"
            >
              {nameInitial}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#263238]">{org.name}</p>
            <p className="truncate text-sm text-[#9E9E9E]">{org.email}</p>
            {org.phone && <p className="truncate text-sm text-[#9E9E9E]">{org.phone}</p>}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge status={org.status} />
          <StatusBadge
            status={org.verificationStatus}
            label={org.verificationStatus === 'approved' ? 'Verified' : undefined}
          />
        </div>
      </div>

      {/* Organization information */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
          Organization Information
        </p>
        <dl className="space-y-2.5">
          {[
            { label: 'Org ID', value: org.id },
            { label: 'Registered', value: formatDate(org.createdAt) },
            { label: 'Members', value: String(org.memberCount) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 font-medium text-[#9E9E9E]">{label}</dt>
              <dd className="truncate text-right font-mono text-xs text-[#263238]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Documents */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
          Documents ({org.documents.length})
        </p>

        {org.documents.length === 0 ? (
          <p className="text-sm text-[#9E9E9E]">No documents uploaded.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {org.documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-[#263238]">
                  <FileText size={13} className="shrink-0 text-[#9E9E9E]" />
                  {DOC_TYPE_LABELS[doc.type]}
                </span>
                <StatusBadge status={doc.status} />
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/admin/documents?orgId=${org.id}` as Route<string>}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E91E63] transition-colors hover:text-[#880E4F]"
        >
          Review Documents
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Actions */}
      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
          Actions
        </p>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onAction('suspend')}
              disabled={isSuspended || isDeactivated}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor: 'rgba(255, 152, 0, 0.30)',
                color: '#E65100',
                background: 'rgba(255, 152, 0, 0.04)',
              }}
            >
              <OctagonX size={13} />
              Suspend
            </button>
            <button
              type="button"
              onClick={() => onAction('deactivate')}
              disabled={isDeactivated}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E4E8EC] bg-white px-3 py-2.5 text-sm font-medium text-[#757575] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PowerOff size={13} />
              Deactivate
            </button>
          </div>
          <button
            type="button"
            onClick={() => onAction('delete')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: 'rgba(244, 67, 54, 0.30)',
              color: '#C62828',
              background: 'rgba(244, 67, 54, 0.04)',
            }}
          >
            <Trash2 size={13} />
            Delete Organization
          </button>
        </div>
      </div>
    </div>
  );
}

export function OrgDetailDrawer({
  orgId,
  onClose,
  onAction,
}: OrgDetailDrawerProps): React.ReactElement {
  return (
    <BaseDrawer isOpen={!!orgId} onClose={onClose} title="Organization Details">
      {orgId && <DrawerContent orgId={orgId} onAction={onAction} />}
    </BaseDrawer>
  );
}
