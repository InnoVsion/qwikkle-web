'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Loader2,
  OctagonX,
  X,
} from 'lucide-react';
import { BaseDrawer } from '@/components/admin/shared/BaseDrawer';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { DocumentPreview } from './DocumentPreview';
import { useDocument, useApproveDocument, useRejectDocument } from '@/lib/hooks/useDocuments';
import { formatDate } from '@/lib/utils/formatDate';
import type { DocumentType, DocumentStatus } from '@/types/admin';

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
  registration_certificate: 'Registration Certificate',
  tax_id: 'Tax ID',
  proof_of_address: 'Proof of Address',
  id_document: 'ID Document',
  other: 'Other',
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Approve Confirmation Modal ───────────────────────────────────────────────

interface ApproveModalProps {
  isOpen: boolean;
  docTypeName: string;
  orgName: string;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

function ApproveConfirmModal({
  isOpen,
  docTypeName,
  orgName,
  isLoading,
  error,
  onClose,
  onConfirm,
}: ApproveModalProps): React.ReactElement {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="approve-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-60 bg-black/40"
            onClick={() => { if (!isLoading) onClose(); }}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              key="approve-panel"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-[#E4E8EC] bg-white"
              style={{ boxShadow: '0 16px 48px rgba(38, 50, 56, 0.16)' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="approve-modal-title"
            >
              <div className="flex items-center justify-between border-b border-[#E4E8EC] px-5 py-4">
                <h2
                  id="approve-modal-title"
                  className="text-base font-semibold text-[#263238]"
                >
                  Confirm Document Approval
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
                <p className="text-sm text-[#9E9E9E]">You are about to approve:</p>
                <div className="mt-3 rounded-xl border border-[#E4E8EC] bg-[#F5F7F9] px-4 py-3">
                  <p className="font-semibold text-[#263238]">{docTypeName}</p>
                  <p className="text-sm text-[#9E9E9E]">Uploaded by {orgName}</p>
                </div>
                <p className="mt-3 text-sm text-[#9E9E9E]">
                  This grants the organisation verified status on the platform. Ensure you have
                  reviewed the document thoroughly.
                </p>

                {error && (
                  <p className="mt-3 text-xs font-medium text-[#C62828]" role="alert">
                    {error}
                  </p>
                )}

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
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      background: '#2E7D32',
                      boxShadow: '0 4px 14px rgba(46, 125, 50, 0.30)',
                    }}
                  >
                    {isLoading && <Loader2 size={13} className="animate-spin" />}
                    Confirm Approval
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonLine({ width = 'full' }: { width?: string }): React.ReactElement {
  return (
    <div
      className="h-4 animate-pulse rounded bg-[#E4E8EC]"
      style={{ width: width === 'full' ? '100%' : width }}
    />
  );
}

// ─── Drawer Content ───────────────────────────────────────────────────────────

type ReviewPhase =
  | 'idle'
  | 'reject-reason'
  | 'confirm-approve'
  | 'success-approved'
  | 'success-rejected';

function DrawerContent({ docId }: { docId: string }): React.ReactElement {
  const { data: doc, isLoading, isError } = useDocument(docId);
  const approveMutation = useApproveDocument();
  const rejectMutation = useRejectDocument();

  const [phase, setPhase] = useState<ReviewPhase>('idle');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);
  const [localReviewedAt, setLocalReviewedAt] = useState<string | null>(null);
  const [localRejectionReason, setLocalRejectionReason] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6 p-5">
        <div className="space-y-2">
          <SkeletonLine width="40%" />
          <SkeletonLine width="60%" />
          <SkeletonLine width="50%" />
        </div>
        <div className="h-[400px] animate-pulse rounded-xl bg-[#E4E8EC]" />
        <div className="space-y-2">
          <SkeletonLine width="30%" />
          <SkeletonLine width="80%" />
        </div>
      </div>
    );
  }

  if (isError || !doc) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <p className="text-sm font-medium text-[#263238]">Failed to load document</p>
        <p className="mt-1 text-xs text-[#9E9E9E]">Please try closing and reopening the panel.</p>
      </div>
    );
  }

  const effectiveStatus: DocumentStatus =
    phase === 'success-approved'
      ? 'approved'
      : phase === 'success-rejected'
        ? 'rejected'
        : doc.status;

  const isPending = effectiveStatus === 'pending';
  const isApproved = effectiveStatus === 'approved';
  const isRejected = effectiveStatus === 'rejected';

  const handleApproveConfirm = async (): Promise<void> => {
    setActionError(null);
    try {
      await approveMutation.mutateAsync(doc.id);
      setLocalReviewedAt(new Date().toISOString());
      setPhase('success-approved');
    } catch {
      setActionError('Something went wrong. Please try again.');
    }
  };

  const handleRejectConfirm = async (): Promise<void> => {
    if (!rejectionReason.trim()) return;
    setActionError(null);
    try {
      await rejectMutation.mutateAsync({ id: doc.id, reason: rejectionReason.trim() });
      setLocalRejectionReason(rejectionReason.trim());
      setLocalReviewedAt(new Date().toISOString());
      setPhase('success-rejected');
    } catch {
      setActionError('Something went wrong. Please try again.');
    }
  };

  const isMutating = approveMutation.isPending || rejectMutation.isPending;

  const displayedRejectionReason =
    phase === 'success-rejected' ? localRejectionReason : doc.rejectionReason;

  const displayedReviewedAt =
    phase === 'success-approved' || phase === 'success-rejected'
      ? localReviewedAt
      : doc.reviewedAt;

  return (
    <>
      <div className="divide-y divide-[#E4E8EC]">
        {/* Document Details */}
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
            Document Details
          </p>
          <dl className="space-y-2.5">
            {[
              { label: 'Organization', value: doc.organizationName },
              { label: 'Document Type', value: DOC_TYPE_LABELS[doc.type] },
              { label: 'File Name', value: doc.fileName },
              { label: 'File Size', value: formatFileSize(doc.fileSize) },
              { label: 'Uploaded', value: formatDate(doc.uploadedAt) },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4 text-sm">
                <dt className="shrink-0 font-medium text-[#9E9E9E]">{label}</dt>
                <dd className="truncate text-right text-[#263238]">{value}</dd>
              </div>
            ))}
            <div className="flex items-start justify-between gap-4 text-sm">
              <dt className="shrink-0 font-medium text-[#9E9E9E]">Status</dt>
              <dd>
                <StatusBadge status={effectiveStatus} />
              </dd>
            </div>
          </dl>
        </div>

        {/* Document Preview */}
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
            Document Preview
          </p>
          <DocumentPreview
            mimeType={doc.mimeType}
            downloadUrl={doc.downloadUrl}
            fileName={doc.fileName}
          />
          <a
            href={doc.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 text-sm font-medium text-[#263238] transition-colors hover:text-[#E91E63]"
          >
            <Download size={13} />
            Download Document
          </a>
        </div>

        {/* Review Decision */}
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#B0BEC5]">
            Review Decision
          </p>

          {/* Already-reviewed: approved */}
          {isApproved && !isPending && (
            <div className="flex items-center gap-2 text-sm font-medium text-[#2E7D32]">
              <CheckCircle2 size={15} className="shrink-0" />
              Approved{displayedReviewedAt ? ` on ${formatDate(displayedReviewedAt)}` : ''}
            </div>
          )}

          {/* Already-reviewed: rejected */}
          {isRejected && !isPending && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[#C62828]">
                <OctagonX size={15} className="shrink-0" />
                Rejected{displayedReviewedAt ? ` on ${formatDate(displayedReviewedAt)}` : ''}
              </div>
              {displayedRejectionReason && (
                <div
                  className="rounded-xl p-3 text-sm"
                  style={{
                    background: 'rgba(244, 67, 54, 0.06)',
                    border: '1px solid rgba(244, 67, 54, 0.20)',
                    color: '#C62828',
                  }}
                >
                  <p className="mb-1 font-semibold">Rejection reason:</p>
                  <p>{displayedRejectionReason}</p>
                </div>
              )}
            </div>
          )}

          {/* Pending: action buttons */}
          {isPending && (
            <div className="space-y-3">
              {/* Approve + Reject buttons */}
              {phase !== 'success-approved' && phase !== 'success-rejected' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setActionError(null); setPhase('confirm-approve'); }}
                    disabled={isMutating || phase === 'reject-reason'}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      borderColor: 'rgba(46, 125, 50, 0.30)',
                      color: '#2E7D32',
                      background: 'rgba(46, 125, 50, 0.04)',
                    }}
                  >
                    <CheckCircle2 size={13} />
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActionError(null);
                      setPhase(phase === 'reject-reason' ? 'idle' : 'reject-reason');
                    }}
                    disabled={isMutating}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      borderColor: 'rgba(244, 67, 54, 0.30)',
                      color: '#C62828',
                      background:
                        phase === 'reject-reason'
                          ? 'rgba(244, 67, 54, 0.08)'
                          : 'rgba(244, 67, 54, 0.04)',
                    }}
                  >
                    <OctagonX size={13} />
                    Reject
                  </button>
                </div>
              )}

              {/* Rejection reason textarea (animated) */}
              <AnimatePresence>
                {phase === 'reject-reason' && (
                  <motion.div
                    key="reject-form"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pt-1">
                      <div>
                        <label
                          htmlFor="rejection-reason"
                          className="mb-1.5 block text-sm font-medium text-[#263238]"
                        >
                          Rejection Reason <span className="text-[#E91E63]">*</span>
                        </label>
                        <textarea
                          id="rejection-reason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          disabled={isMutating}
                          rows={3}
                          placeholder="Required — explain why so the organisation can resubmit."
                          className="w-full resize-none rounded-xl border border-[#E4E8EC] bg-white px-3.5 py-2.5 text-sm text-[#263238] outline-none placeholder:text-[#B0BEC5] focus:border-[#E91E63] focus:ring-2 focus:ring-[rgba(233,30,99,0.15)] disabled:opacity-60"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => { setPhase('idle'); setRejectionReason(''); setActionError(null); }}
                          disabled={isMutating}
                          className="flex-1 rounded-xl border border-[#E4E8EC] bg-white px-3 py-2 text-sm font-medium text-[#263238] transition-colors hover:bg-[#F5F7F9] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleRejectConfirm}
                          disabled={isMutating || !rejectionReason.trim()}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          style={{
                            background: '#C62828',
                            boxShadow: '0 4px 14px rgba(198, 40, 40, 0.30)',
                          }}
                        >
                          {rejectMutation.isPending && (
                            <Loader2 size={13} className="animate-spin" />
                          )}
                          Confirm Rejection
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* API error */}
              {actionError && (
                <div
                  className="flex items-center gap-2 rounded-xl p-3 text-xs font-medium"
                  style={{
                    background: 'rgba(244, 67, 54, 0.06)',
                    border: '1px solid rgba(244, 67, 54, 0.20)',
                    color: '#C62828',
                  }}
                  role="alert"
                >
                  <AlertTriangle size={13} className="shrink-0" />
                  {actionError}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Approve confirmation modal — rendered outside the scrollable area */}
      <ApproveConfirmModal
        isOpen={phase === 'confirm-approve'}
        docTypeName={DOC_TYPE_LABELS[doc.type]}
        orgName={doc.organizationName}
        isLoading={approveMutation.isPending}
        error={actionError}
        onClose={() => { setPhase('idle'); setActionError(null); }}
        onConfirm={handleApproveConfirm}
      />
    </>
  );
}

// ─── Public Export ─────────────────────────────────────────────────────────────

interface DocumentReviewDrawerProps {
  docId: string | null;
  onClose: () => void;
}

export function DocumentReviewDrawer({
  docId,
  onClose,
}: DocumentReviewDrawerProps): React.ReactElement {
  return (
    <BaseDrawer isOpen={!!docId} onClose={onClose} title="Review Document" width={520}>
      {docId && <DrawerContent key={docId} docId={docId} />}
    </BaseDrawer>
  );
}
