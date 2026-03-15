'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type ConfirmAction = 'suspend' | 'deactivate' | 'delete';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ConfirmAction;
  /** Display name of the entity, e.g. "John Smith" */
  entityName: string;
  /** Email of the entity — used for delete confirmation match */
  entityEmail: string;
  /** Called with optional reason string when confirmed */
  onConfirm: (reason?: string) => Promise<void>;
  isLoading: boolean;
  /** Error message returned from API on failure */
  error?: string | null;
}

const ACTION_CONFIG = {
  suspend: {
    title: 'Suspend Account',
    body: (name: string) =>
      `Are you sure you want to suspend ${name}'s account? They will not be able to sign in until the suspension is lifted. This action can be reversed.`,
    showReason: true,
    reasonLabel: 'Reason (optional)',
    confirmLabel: 'Suspend Account',
    confirmStyle: {
      background: '#FF9800',
      boxShadow: '0 4px 14px rgba(255, 152, 0, 0.30)',
    },
    confirmHoverClass: 'hover:opacity-90',
  },
  deactivate: {
    title: 'Deactivate Account',
    body: (name: string) =>
      `Are you sure you want to deactivate ${name}'s account? Their account will be disabled and their data will be retained. They can be reactivated later.`,
    showReason: true,
    reasonLabel: 'Reason (optional)',
    confirmLabel: 'Deactivate Account',
    confirmStyle: {
      background: '#757575',
      boxShadow: 'none',
    },
    confirmHoverClass: 'hover:opacity-90',
  },
  delete: {
    title: 'Delete Account Permanently',
    body: (name: string) =>
      `Permanently deleting ${name}'s account will remove all of their data, messages, and history. This cannot be recovered.`,
    showReason: false,
    reasonLabel: '',
    confirmLabel: 'Delete Permanently',
    confirmStyle: {
      background: '#F44336',
      boxShadow: '0 4px 14px rgba(244, 67, 54, 0.30)',
    },
    confirmHoverClass: 'hover:opacity-90',
  },
} as const;

export function ConfirmActionModal({
  isOpen,
  onClose,
  action,
  entityName,
  entityEmail,
  onConfirm,
  isLoading,
  error,
}: ConfirmActionModalProps): React.ReactElement {
  const config = ACTION_CONFIG[action];
  const [reason, setReason] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, isLoading, onClose]);

  const isDeleteConfirmed = action !== 'delete' || emailInput === entityEmail;
  const canConfirm = !isLoading && isDeleteConfirmed;

  const handleConfirm = async (): Promise<void> => {
    if (!canConfirm) return;
    await onConfirm(config.showReason ? reason || undefined : undefined);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => { if (!isLoading) onClose(); }}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-[#E4E8EC] bg-white"
              style={{ boxShadow: '0 16px 48px rgba(38, 50, 56, 0.16)' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E4E8EC] px-5 py-4">
                <h2 id="modal-title" className="text-base font-semibold text-[#263238]">
                  {config.title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="rounded-lg p-1.5 text-[#9E9E9E] transition-colors hover:bg-[#F5F7F9] hover:text-[#263238] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="p-5">
                {/* Delete warning */}
                {action === 'delete' && (
                  <div
                    className="mb-4 flex items-start gap-2.5 rounded-xl p-3 text-sm"
                    style={{
                      background: 'rgba(244, 67, 54, 0.06)',
                      border: '1px solid rgba(244, 67, 54, 0.20)',
                      color: '#C62828',
                    }}
                  >
                    <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                    This action cannot be undone.
                  </div>
                )}

                <p className="text-sm text-[#9E9E9E]">{config.body(entityName)}</p>

                {/* Reason field (suspend / deactivate) */}
                {config.showReason && (
                  <div className="mt-4">
                    <label
                      htmlFor="action-reason"
                      className="mb-1.5 block text-sm font-medium text-[#263238]"
                    >
                      {config.reasonLabel}
                    </label>
                    <textarea
                      id="action-reason"
                      ref={reasonRef}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      disabled={isLoading}
                      rows={2}
                      placeholder="Provide context for internal audit logs."
                      className="w-full resize-none rounded-xl border border-[#E4E8EC] bg-white px-3.5 py-2.5 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)] disabled:opacity-60"
                    />
                  </div>
                )}

                {/* Delete email confirmation */}
                {action === 'delete' && (
                  <div className="mt-4">
                    <label
                      htmlFor="delete-confirm-email"
                      className="mb-1.5 block text-sm font-medium text-[#263238]"
                    >
                      To confirm, type the user&apos;s email address below:
                    </label>
                    <p className="mb-2 font-mono text-xs text-[#9E9E9E]">{entityEmail}</p>
                    <input
                      id="delete-confirm-email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isLoading}
                      autoComplete="off"
                      placeholder={entityEmail}
                      className="w-full rounded-xl border border-[#E4E8EC] px-3.5 py-2.5 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[rgba(244,67,54,0.60)] focus:ring-2 focus:ring-[rgba(244,67,54,0.15)] disabled:opacity-60"
                    />
                  </div>
                )}

                {/* API error */}
                {error && (
                  <p
                    className="mt-3 text-xs font-medium"
                    style={{ color: '#C62828' }}
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="rounded-xl border border-[#E4E8EC] bg-white px-4 py-2 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all',
                      config.confirmHoverClass,
                      'disabled:cursor-not-allowed disabled:opacity-50',
                    )}
                    style={config.confirmStyle}
                  >
                    {isLoading && <Loader2 size={13} className="animate-spin" />}
                    {config.confirmLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
