import { IRegisterForm } from "@pages/Register/Register";
import http from "@utils/http";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export const register = (_data: Omit<IRegisterForm, "agreeToTerms">) =>
  http.post<TokenResponse>("user/register", _data);
