import { create } from 'zustand';
import type { AppModule } from '@/types';

interface UiState {
  sidebarCollapsed: boolean;
  sidePanelOpen: boolean;
  activeModule: AppModule;
  toggleSidebar: () => void;
  setSidePanelOpen: (open: boolean) => void;
  setActiveModule: (module: AppModule) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  sidePanelOpen: false,
  activeModule: 'home',

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidePanelOpen: (open) => set({ sidePanelOpen: open }),
  setActiveModule: (module) => set({ activeModule: module }),
}));
