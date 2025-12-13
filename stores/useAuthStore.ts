import { create } from "zustand";
import type { User } from "@/types";
import { currentUser } from "@/lib/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser, // Mock: start with current user
  isAuthenticated: true, // Mock: always authenticated
  login: async (email: string, password: string) => {
    // Mock login - in real app, this would call API
    set({ user: currentUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));

