import { LoginFormData } from "@pages/Login/Login";
import { PasswordForm } from "@pages/Password/Password";
import { RecoveryForm } from "@pages/Recovery/Recovery";
import { IRegisterForm } from "@pages/Register/Register";
import http from "@utils/http";
import { AxiosResponse } from "axios";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};
interface ApiResponse {
  message: string;
  data: object;
}

export const register = (_data: Omit<IRegisterForm, "agreeToTerms">) =>
  http.post<TokenResponse>("user/register", _data);

export const login = (_data: LoginFormData) =>
  http.post<TokenResponse>("user/login", _data);

export const sendVerifyAccountOTP = (_data: { email_phone: string }) =>
  http.post("user/send-verify-account-otp", _data);

export const recovery = (_data: RecoveryForm) =>
  http.post<TokenResponse>("user/forgot-password", _data);
export const getMe = (
  accessToken: string,
): Promise<AxiosResponse<ApiResponse>> =>
  http.get("user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
export const updatePassword = (
  accessToken: string,
  _data: PasswordForm | undefined,
): Promise<AxiosResponse<ApiResponse>> =>
  http.post("pass/updatePass", _data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const verifyAccount = (_data: {
  email_phone: string;
  verify_account_otp: string;
}) => http.post("user/verify-account", _data);
