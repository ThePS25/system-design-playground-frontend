import { useQuery } from '@tanstack/react-query';
import { templatesApi } from '@/api';

export function useTemplates(params?: { difficulty?: string; tag?: string }) {
  return useQuery({
    queryKey: ['templates', params],
    queryFn: () => templatesApi.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => templatesApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
