import { CapchaApi, callCaptcha } from "./captcha.api";

class CaptchaService {
  captcha = (data: CapchaApi) => callCaptcha(data);
}
const useCaptcha = new CaptchaService();
export default useCaptcha;
