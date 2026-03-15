'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideProps } from 'lucide-react';
import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'neutral';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 5000;

const toastConfig: Record<
  ToastType,
  { bg: string; border: string; text: string; icon: React.ComponentType<LucideProps> }
> = {
  success: {
    bg: 'rgba(0, 200, 83, 0.08)',
    border: 'rgba(0, 230, 118, 0.25)',
    text: '#00C853',
    icon: CheckCircle,
  },
  error: {
    bg: 'rgba(244, 67, 54, 0.06)',
    border: 'rgba(244, 67, 54, 0.25)',
    text: '#C62828',
    icon: AlertCircle,
  },
  warning: {
    bg: 'rgba(255, 152, 0, 0.08)',
    border: 'rgba(255, 152, 0, 0.25)',
    text: '#E65100',
    icon: AlertTriangle,
  },
  neutral: {
    bg: 'rgba(158, 158, 158, 0.08)',
    border: 'rgba(158, 158, 158, 0.25)',
    text: '#616161',
    icon: CheckCircle,
  },
};

function ToastItemComponent({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}): React.ReactElement {
  const config = toastConfig[toast.type];
  const Icon = config.icon;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(toast.id), TOAST_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-80 overflow-hidden rounded-xl border bg-white"
      style={{
        boxShadow: '0 8px 32px rgba(38, 50, 56, 0.12)',
        borderColor: config.border,
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon size={16} style={{ color: config.text, flexShrink: 0 }} />
        <p className="flex-1 text-sm font-medium text-[#263238]">{toast.message}</p>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="rounded p-0.5 text-[#9E9E9E] transition-colors hover:text-[#263238]"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
      {/* Progress bar */}
      <div
        className="h-0.5"
        style={{ background: config.border }}
        aria-hidden="true"
      >
        <div
          className="h-full origin-left"
          style={{
            background: config.text,
            animation: `toast-shrink ${TOAST_DURATION}ms linear forwards`,
          }}
        />
      </div>
      <style>{`
        @keyframes toast-shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType): void => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast stack — bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItemComponent key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Returns `addToast(message, type)` for triggering toast notifications.
 * Must be used inside a `ToastProvider`.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
