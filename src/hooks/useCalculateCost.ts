import { useMutation } from '@tanstack/react-query';
import { costApi } from '@/api';
import type { CostEstimate, InfraConfiguration } from '@/types';

export function useCalculateCost() {
  return useMutation({
    mutationFn: (payload: { rps: number; configuration: InfraConfiguration }) =>
      costApi.calculate(payload),
  });
}

export type { CostEstimate };
