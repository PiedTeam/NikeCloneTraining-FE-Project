export type USER_API =
  | "user/register"
  | "user/login"
  | "user/send-verify-account-otp"
  | "user/me"
  | "pass/updatePass"
  | "user/forgot-password"
  | "user/verify-otp"
  | "user/change-password"
  | "user/verify-account";

// export const USER_API_DETAIL: Record<
//   USER_API,
//   { url: string; method: METHOD_TYPE }
// > = {
//   "user/register": { url: "user/register", method: "post" },
//   "user/login": { url: "user/login", method: "post" },
//   "user/send-verify-account-otp": {
//     url: "user/send-verify-account-otp",
//     method: "post",
//   },
//   "user/me": { url: "user/me", method: "get" },
//   "pass/updatePass": { url: "pass/updatePass", method: "post" },
//   "user/forgot-password": { url: "user/forgot-password", method: "post" },
//   "user/verify-otp": { url: "user/verify-otp", method: "post" },
//   "user/change-password": { url: "user/change-password", method: "post" },
//   "user/verify-account": { url: "user/verify-account", method: "post" },
// };
