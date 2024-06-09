import { FormDataChangePasswordApi } from "@pages/ChangePassword/ChangePassword";
import { LoginFormData } from "@pages/Login";
import { compareOtpApi, sendOtp } from "@pages/Otp/CompareOtpPage";
import { passwordInterfaceApi } from "@pages/Password/Password";

import { RecoveryForm } from "@pages/Recovery/Recovery";
import { IRegisterForm } from "@pages/Register/Register";
import http from "@utils/http";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

type RecoveryResponse = {
  details: {
    otp: string;
  };
};
interface ApiResponse {
  message: string;
  data: object;
}

export const callRegister = (_data: Omit<IRegisterForm, "agreeToTerms">) =>
  http<TokenResponse, typeof _data>({
    method: "post",
    url: "user/register",
    data: _data,
  });

export const callLogin = (_data: LoginFormData) =>
  http<TokenResponse, typeof _data>({
    method: "post",
    url: "user/login",
    data: _data,
  });

export const callSendVerifyAccountOTP = (_data: { email_phone: string }) =>
  http({ url: "user/send-verify-account-otp", data: _data, method: "post" });

export const recovery = (_data: RecoveryForm) =>
  http<RecoveryResponse, typeof _data>({
    url: "user/forgot-password",
    data: _data,
    method: "post",
  });

export const getMe = (accessToken: string) =>
  http<ApiResponse>({ url: "user/me", method: "get", token: accessToken });

// export const getMe: GetMeFunction<ApiResponse> = (accessToken: string) =>
//   http("user/me", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

export const updatePassword = (
  accessToken: string,
  _data: passwordInterfaceApi | undefined,
) =>
  http<any, typeof _data>({
    url: "pass/updatePass",
    data: _data,
    method: "post",
    token: accessToken,
  });

// export const updatePassword = (
//   accessToken: string,
//   _data: passwordInterfaceApi | undefined,
// ) =>
//   http.post("pass/updatePass", _data, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

export const getOtp = (accessToken: string, _data: sendOtp | undefined) =>
  http<>({ url: "user/send-verify-account-otp", data: _data, method: "post" });

http.post("user/forgot-password", _data, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const compareOtp = (
  accessToken: string,
  _data: compareOtpApi | undefined,
) =>
  http<, typeof _data>({
    url: "user/verify-otp",
    data: _data,
    method: "post",
    token: accessToken,
  });

// export const compareOtp = (
//   accessToken: string,
//   _data: compareOtpApi | undefined,
// ) =>
//   http.post("user/verify-otp", _data, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

export const changePassword = (
  accessToken: string,
  _data: FormDataChangePasswordApi | undefined,
) => http<, typeof _data>({ url: "user/change-password", data: _data, method: "post", token: accessToken })

  // export const changePassword = (
  //   accessToken: string,
  //   _data: FormDataChangePasswordApi | undefined,
  // ) =>
  //   http.post("user/change-password", _data, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });

export const verifyAccount = (_data: {
  email_phone: string;
  verify_account_otp: string;
}) => http<,typeof _data>({url: "user/verify-account", data: _data, method: "post"});

// export const verifyAccount = (_data: {
//   email_phone: string;
//   verify_account_otp: string;
// }) => http.post("user/verify-account", _data);
