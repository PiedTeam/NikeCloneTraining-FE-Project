import { callCaptcha, captchaApi, captchaApiResponse } from "./captcha.api";

class CaptchaService {
  captcha = (data: captchaApi) => callCaptcha(data);
}
const captchaService = new CaptchaService();
export default captchaService;
