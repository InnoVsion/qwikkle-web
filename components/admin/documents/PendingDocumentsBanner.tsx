'use client';

import { Info } from 'lucide-react';

interface PendingDocumentsBannerProps {
  count: number;
  onClick: () => void;
}

export function PendingDocumentsBanner({
  count,
  onClick,
}: PendingDocumentsBannerProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-opacity hover:opacity-80"
      style={{
        background: 'rgba(33, 150, 243, 0.06)',
        borderColor: 'rgba(33, 150, 243, 0.20)',
        color: '#1565C0',
      }}
    >
      <Info size={15} className="shrink-0" />
      <span>
        <span className="font-semibold">{count}</span>{' '}
        {count === 1 ? 'document' : 'documents'} pending review
      </span>
      <span className="ml-auto text-xs opacity-70">Filter to pending →</span>
    </button>
  );
}
