import { UserInfo } from "types/user.types";

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user: UserInfo | null;
}
