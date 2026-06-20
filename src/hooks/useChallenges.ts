import { useQuery } from '@tanstack/react-query';
import { challengesApi } from '@/api';

export function useChallenges(difficulty?: string) {
  return useQuery({
    queryKey: ['challenges', difficulty],
    queryFn: () => challengesApi.list(difficulty),
    staleTime: 5 * 60 * 1000,
  });
}

export function useChallenge(id: string) {
  return useQuery({
    queryKey: ['challenges', id],
    queryFn: () => challengesApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
