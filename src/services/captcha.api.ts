import http from "@utils/http";

export interface CapchaApi {
  capcha: string;
}
export type CaptchaApiResponse = {
  success: boolean;
  score: number;
  message: string;
};
export const callCaptcha = (_data: CapchaApi) =>
  http<CaptchaApiResponse, typeof _data>({
    method: "post",
    url: "user/login",
    data: _data,
  });
