import { create } from 'zustand';
import type { ValidationResult } from '@/types';

interface ChallengeState {
  activeChallengeId: string | null;
  validationResult: ValidationResult | null;
  setActiveChallengeId: (id: string | null) => void;
  setValidationResult: (result: ValidationResult | null) => void;
  reset: () => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  activeChallengeId: null,
  validationResult: null,
  setActiveChallengeId: (id) => set({ activeChallengeId: id }),
  setValidationResult: (result) => set({ validationResult: result }),
  reset: () => set({ activeChallengeId: null, validationResult: null }),
}));
