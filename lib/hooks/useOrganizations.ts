'use client';

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import {
  getOrganizations,
  getOrganization,
  suspendOrganization,
  deactivateOrganization,
  deleteOrganization,
  type GetOrganizationsParams,
} from '@/lib/api/organizations';

export function useOrganizations(params: GetOrganizationsParams) {
  return useQuery({
    queryKey: ['admin', 'organizations', params],
    queryFn: () => getOrganizations(params),
    placeholderData: keepPreviousData,
  });
}

export function useOrganization(id: string | null) {
  return useQuery({
    queryKey: ['admin', 'organization', id],
    queryFn: () => getOrganization(id!),
    enabled: !!id,
  });
}

export function useSuspendOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      suspendOrganization(id, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'organizations'] });
    },
  });
}

export function useDeactivateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      deactivateOrganization(id, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'organizations'] });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'organizations'] });
      queryClient.removeQueries({ queryKey: ['admin', 'organization', id] });
    },
  });
}
