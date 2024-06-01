import { GetMeFunction } from "@hooks/useApi";
import { FormDataChangePasswordApi } from "@pages/ChangePassword/ChangePassword";
import { LoginFormData } from "@pages/Login";
import { compareOtpApi, sendOtp } from "@pages/Otp/CompareOtpPage";
import { passwordInterfaceApi } from "@pages/Password/Password";

import { RecoveryForm } from "@pages/Recovery/Recovery";
import { IRegisterForm } from "@pages/Register/Register";
import http from "@utils/http";

type TokenResponse = {
  data: { access_token: string; refresh_token: string };
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

export const registerApi = (_data: Omit<IRegisterForm, "agreeToTerms">) =>
  http.post<TokenResponse>("user/register", _data);

export const login = (_data: LoginFormData) => http.post<TokenResponse>("user/login", _data);

export const sendVerifyAccountOTP = (_data: { email_phone: string }) =>
  http.post("user/send-verify-account-otp", _data);

export const recovery = (_data: RecoveryForm) => http.post<RecoveryResponse>("user/forgot-password", _data);
export const getMe: GetMeFunction<ApiResponse> = (accessToken: string) =>
  http.get("user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const updatePassword = (accessToken: string, _data: passwordInterfaceApi | undefined) =>
  http.post("pass/updatePass", _data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
export const getOtp = (accessToken: string, _data: sendOtp | undefined) =>
  http.post("user/forgot-password", _data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
export const compareOtp = (accessToken: string, _data: compareOtpApi | undefined) =>
  http.post("user/verify-otp", _data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
export const changePassword = (accessToken: string, _data: FormDataChangePasswordApi | undefined) =>
  http.post("user/change-password", _data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
export const verifyAccount = (_data: { email_phone: string; verify_account_otp: string }) =>
  http.post("user/verify-account", _data);
