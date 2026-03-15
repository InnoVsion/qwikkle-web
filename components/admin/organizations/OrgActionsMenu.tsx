'use client';

import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EyeIcon, MoreHorizontal, OctagonX, PowerOff, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AccountStatus } from '@/types/admin';
import type { ConfirmAction } from '@/components/admin/shared/ConfirmActionModal';

interface OrgActionsMenuProps {
  orgId: string;
  status: AccountStatus;
  onViewDetails: () => void;
  onAction: (action: ConfirmAction) => void;
}

export function OrgActionsMenu({
  status,
  onViewDetails,
  onAction,
}: OrgActionsMenuProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const isSuspended = status === 'suspended';
  const isDeactivated = status === 'deactivated';

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'rounded-lg p-1.5 transition-colors',
          isOpen
            ? 'bg-[#F5F7F9] text-[#263238]'
            : 'text-[#9E9E9E] hover:bg-[#F5F7F9] hover:text-[#263238]',
        )}
        aria-label="Row actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="org-actions-menu"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[#E4E8EC] bg-white py-1"
            style={{ boxShadow: '0 8px 32px rgba(38, 50, 56, 0.10)' }}
          >
            <button
              type="button"
              onClick={() => { onViewDetails(); setIsOpen(false); }}
              className="flex w-full items-center gap-3 px-3.5 py-2 text-sm text-[#263238] transition-colors hover:bg-[#F5F7F9]"
            >
              <EyeIcon size={13} className="shrink-0" />
              View Details
            </button>

            <div className="my-1 border-t border-[#E4E8EC]" aria-hidden="true" />

            <button
              type="button"
              onClick={() => { onAction('suspend'); setIsOpen(false); }}
              disabled={isSuspended || isDeactivated}
              className="flex w-full items-center gap-3 px-3.5 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:text-[#B0BEC5] enabled:text-[#E65100] enabled:hover:bg-[rgba(255,152,0,0.06)]"
            >
              <OctagonX size={13} className="shrink-0" />
              Suspend Organization
            </button>
            <button
              type="button"
              onClick={() => { onAction('deactivate'); setIsOpen(false); }}
              disabled={isDeactivated}
              className="flex w-full items-center gap-3 px-3.5 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:text-[#B0BEC5] enabled:text-[#E65100] enabled:hover:bg-[rgba(255,152,0,0.06)]"
            >
              <PowerOff size={13} className="shrink-0" />
              Deactivate Organization
            </button>

            <div className="my-1 border-t border-[#E4E8EC]" aria-hidden="true" />

            <button
              type="button"
              onClick={() => { onAction('delete'); setIsOpen(false); }}
              className="flex w-full items-center gap-3 px-3.5 py-2 text-sm text-[#C62828] transition-colors hover:bg-[rgba(244,67,54,0.06)]"
            >
              <Trash2 size={13} className="shrink-0" />
              Delete Organization
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
