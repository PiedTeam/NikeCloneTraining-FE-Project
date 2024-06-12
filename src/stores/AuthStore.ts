import { create } from "zustand";
import { UserInfo } from "types/user.types";

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user: UserInfo | null;
  status: "UNVERIFIED" | "VERIFIED" | "BLOCKED" | null;
}

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
