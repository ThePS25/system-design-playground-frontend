import { useQuery } from '@tanstack/react-query';
import { componentsApi } from '@/api';

export function useComponents(params?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: ['components', params],
    queryFn: () => componentsApi.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useComponent(id: string | null) {
  return useQuery({
    queryKey: ['components', id],
    queryFn: () => componentsApi.get(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
