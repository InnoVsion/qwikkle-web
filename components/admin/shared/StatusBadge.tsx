import type { AccountStatus, VerificationStatus, DocumentStatus } from '@/types/admin';

export type StatusBadgeVariant = AccountStatus | VerificationStatus | DocumentStatus;

interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  label: string;
}

const STATUS_CONFIG: Record<StatusBadgeVariant, StatusConfig> = {
  active: {
    bg: 'rgba(0, 230, 118, 0.08)',
    text: '#00C853',
    border: 'rgba(0, 230, 118, 0.18)',
    label: 'Active',
  },
  suspended: {
    bg: 'rgba(255, 152, 0, 0.06)',
    text: '#E65100',
    border: 'rgba(255, 152, 0, 0.20)',
    label: 'Suspended',
  },
  deactivated: {
    bg: 'rgba(158, 158, 158, 0.08)',
    text: '#757575',
    border: 'rgba(158, 158, 158, 0.20)',
    label: 'Deactivated',
  },
  pending: {
    bg: 'rgba(33, 150, 243, 0.06)',
    text: '#1565C0',
    border: 'rgba(33, 150, 243, 0.20)',
    label: 'Pending',
  },
  approved: {
    bg: 'rgba(0, 230, 118, 0.08)',
    text: '#00C853',
    border: 'rgba(0, 230, 118, 0.18)',
    label: 'Approved',
  },
  rejected: {
    bg: 'rgba(244, 67, 54, 0.06)',
    text: '#C62828',
    border: 'rgba(244, 67, 54, 0.20)',
    label: 'Rejected',
  },
};

interface StatusBadgeProps {
  status: StatusBadgeVariant;
  /** Overrides the default label derived from status */
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps): React.ReactElement {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: config.text }}
        aria-hidden="true"
      />
      {label ?? config.label}
    </span>
  );
}
