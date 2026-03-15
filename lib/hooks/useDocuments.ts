'use client';

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import {
  getDocuments,
  getDocument,
  approveDocument,
  rejectDocument,
  type GetDocumentsParams,
} from '@/lib/api/documents';

export function useDocuments(params: GetDocumentsParams) {
  return useQuery({
    queryKey: ['admin', 'documents', params],
    queryFn: () => getDocuments(params),
    placeholderData: keepPreviousData,
  });
}

export function useDocument(id: string | null) {
  return useQuery({
    queryKey: ['admin', 'document', id],
    queryFn: () => getDocument(id!),
    enabled: !!id,
  });
}

export function useApproveDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveDocument(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'document', id] });
    },
  });
}

export function useRejectDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      rejectDocument(id, { reason }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'document', id] });
    },
  });
}
