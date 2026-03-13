'use client';

// Add additional UI state as needed (e.g. active modal, toast queue)
import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

/**
 * Global UI state for layout interactions (mobile nav, modals, etc.).
 */
export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
