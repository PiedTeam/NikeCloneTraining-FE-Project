import UserInfo from "./user";

export default interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: UserInfo | null;
  status: "UNVERIFIED" | "VERIFIED" | "BLOCKED" | null;
}
