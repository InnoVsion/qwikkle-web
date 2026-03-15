'use client';

import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EyeIcon, MoreHorizontal, OctagonX, PowerOff, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AccountStatus } from '@/types/admin';
import type { ConfirmAction } from '@/components/admin/shared/ConfirmActionModal';

interface UserActionsMenuProps {
  userId: string;
  status: AccountStatus;
  onViewDetails: () => void;
  onAction: (action: ConfirmAction) => void;
}

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'warning' | 'danger' | 'default';
}

export function UserActionsMenu({
  status,
  onViewDetails,
  onAction,
}: UserActionsMenuProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.closest('[data-actions-menu]')?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const isSuspended = status === 'suspended';
  const isDeactivated = status === 'deactivated';

  const menuItems: MenuItem[] = [
    {
      label: 'View Details',
      icon: EyeIcon,
      onClick: () => { onViewDetails(); setIsOpen(false); },
      variant: 'default',
    },
    {
      label: 'Suspend Account',
      icon: OctagonX,
      onClick: () => { onAction('suspend'); setIsOpen(false); },
      disabled: isSuspended || isDeactivated,
      variant: 'warning',
    },
    {
      label: 'Deactivate Account',
      icon: PowerOff,
      onClick: () => { onAction('deactivate'); setIsOpen(false); },
      disabled: isDeactivated,
      variant: 'warning',
    },
    {
      label: 'Delete Account',
      icon: Trash2,
      onClick: () => { onAction('delete'); setIsOpen(false); },
      variant: 'danger',
    },
  ];

  const variantStyles: Record<NonNullable<MenuItem['variant']>, string> = {
    default: 'text-[#263238] hover:bg-[#F5F7F9]',
    warning: 'text-[#E65100] hover:bg-[rgba(255,152,0,0.06)]',
    danger: 'text-[#C62828] hover:bg-[rgba(244,67,54,0.06)]',
  };

  return (
    <div className="relative" data-actions-menu="">
      <button
        ref={buttonRef}
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
            key="actions-menu"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-[#E4E8EC] bg-white py-1"
            style={{ boxShadow: '0 8px 32px rgba(38, 50, 56, 0.10)' }}
          >
            {menuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  {/* Separator before Suspend */}
                  {i === 1 && (
                    <div className="my-1 border-t border-[#E4E8EC]" aria-hidden="true" />
                  )}
                  {/* Separator before Delete */}
                  {i === 3 && (
                    <div className="my-1 border-t border-[#E4E8EC]" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={cn(
                      'flex w-full items-center gap-3 px-3.5 py-2 text-sm transition-colors',
                      item.disabled
                        ? 'cursor-not-allowed text-[#B0BEC5]'
                        : variantStyles[item.variant ?? 'default'],
                    )}
                  >
                    <Icon size={13} className="shrink-0" />
                    {item.label}
                  </button>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
