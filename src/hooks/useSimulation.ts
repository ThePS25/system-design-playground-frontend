import { useMutation } from '@tanstack/react-query';
import { simulationApi } from '@/api';
import type { SimulationResult } from '@/types';

interface RunSimulationParams {
  rps: number;
  nodes: unknown[];
  edges: unknown[];
  templateId?: string;
  disabledComponents?: string[];
}

export function useRunSimulation() {
  return useMutation({
    mutationFn: (params: RunSimulationParams) => simulationApi.run(params),
  });
}

export type { SimulationResult };
