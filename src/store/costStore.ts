import { create } from 'zustand';
import type { CostEstimate, InfraConfiguration } from '@/types';

const DEFAULT_CONFIG: InfraConfiguration = {
  applicationServers: { count: 4 },
  redisClusters: { count: 2, memoryGb: 16 },
  databases: { count: 1, readReplicas: 2 },
  cdn: { enabled: true, bandwidthTb: 5 },
  loadBalancers: { count: 2 },
  kafkaClusters: { count: 0 },
  objectStorage: { storageTb: 10 },
  searchServices: { count: 0 },
};

interface CostState {
  rps: number;
  configuration: InfraConfiguration;
  estimate: CostEstimate | null;
  setRps: (rps: number) => void;
  setConfiguration: (config: InfraConfiguration) => void;
  updateConfig: (partial: Partial<InfraConfiguration>) => void;
  setEstimate: (estimate: CostEstimate | null) => void;
  reset: () => void;
}

export const useCostStore = create<CostState>((set, get) => ({
  rps: 10000,
  configuration: DEFAULT_CONFIG,
  estimate: null,

  setRps: (rps) => set({ rps }),
  setConfiguration: (configuration) => set({ configuration }),
  updateConfig: (partial) =>
    set({ configuration: { ...get().configuration, ...partial } }),
  setEstimate: (estimate) => set({ estimate }),
  reset: () => set({ rps: 10000, configuration: DEFAULT_CONFIG, estimate: null }),
}));
