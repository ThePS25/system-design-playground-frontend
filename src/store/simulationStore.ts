import { create } from 'zustand';
import type { SimulationResult } from '@/types';

interface SimulationState {
  rps: number;
  result: SimulationResult | null;
  isRunning: boolean;
  disabledComponents: string[];
  setRps: (rps: number) => void;
  setResult: (result: SimulationResult | null) => void;
  setIsRunning: (running: boolean) => void;
  toggleDisabledComponent: (slug: string) => void;
  reset: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  rps: 1000,
  result: null,
  isRunning: false,
  disabledComponents: [],

  setRps: (rps) => set({ rps }),
  setResult: (result) => set({ result }),
  setIsRunning: (isRunning) => set({ isRunning }),

  toggleDisabledComponent: (slug) => {
    const current = get().disabledComponents;
    set({
      disabledComponents: current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    });
  },

  reset: () => set({ rps: 1000, result: null, isRunning: false, disabledComponents: [] }),
}));
