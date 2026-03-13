'use client';

// Populate store after token validation on first admin page load
import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

/**
 * Client-side auth state.
 * Source of truth for the currently authenticated admin user.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
