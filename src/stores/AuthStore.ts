import AuthState from "types/auth";
import { create } from "zustand";

type AuthStore = {
  auth: AuthState | null;
  setAuth: (auth: AuthState | null) => void;
  logOut: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
    status: null,
  },
  setAuth: (auth) => set({ auth }),
  logOut: () =>
    set({
      auth: {
        isAuthenticated: false,
        isInitialized: false,
        user: null,
        status: null,
      },
    }),
}));
