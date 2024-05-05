import { FormDataChangePassword } from "@pages/ChangePassword/ChangePassword";
import { LoginFormData } from "@pages/Login/Login";
import { RecoveryForm } from "@pages/Recovery/Recovery";
import { IRegisterForm } from "@pages/Register/Register";
import http from "@utils/http";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export const register = (_data: Omit<IRegisterForm, "agreeToTerms">) =>
  http.post<TokenResponse>("user/register", _data);

export const login = (_data: LoginFormData) =>
  http.post<TokenResponse>("user/login", _data);
export const recovery = (_data: RecoveryForm) =>
  http.post<TokenResponse>("user/forgot-password", _data);
export const changePassword = (_data: FormDataChangePassword) =>
  http.post<TokenResponse>("user/reset-password", _data);
