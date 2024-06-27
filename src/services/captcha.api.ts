import http from "@utils/http";

export interface captchaApi {
  capcha: string;
}
export interface captchaApiResponse {
  success: boolean;
  message: string;
  score: number;
}
export const callCaptcha = (_data: captchaApi) =>
  http<captchaApiResponse, typeof _data>({
    method: "post",
    url: "capcha/verify",
    data: _data,
  });
