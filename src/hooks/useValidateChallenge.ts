import { useMutation } from '@tanstack/react-query';
import { challengesApi } from '@/api';

export function useValidateChallenge() {
  return useMutation({
    mutationFn: challengesApi.validate,
  });
}
