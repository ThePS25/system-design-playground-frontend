import { create } from 'zustand';

import type { FailureAnalysis } from '@/services/failure/failureEngine';

interface FailureState {
  failedComponents: string[];
  analysis: FailureAnalysis | null;
  toggleFailure: (slug: string) => void;
  clearFailures: () => void;
  setAnalysis: (analysis: FailureAnalysis | null) => void;
}

export const useFailureStore = create<FailureState>((set, get) => ({
  failedComponents: [],
  analysis: null,

  toggleFailure: (slug) => {
    const current = get().failedComponents;
    set({
      failedComponents: current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    });
  },

  clearFailures: () => set({ failedComponents: [], analysis: null }),

  setAnalysis: (analysis) => set({ analysis }),
}));
