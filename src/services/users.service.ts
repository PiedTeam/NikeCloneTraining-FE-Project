import {
  FormDataChangePasswordApi,
  LoginFormData,
  RecoveryForm,
  RegisterForm,
  callLogin,
  callRegister,
  callSendVerifyAccountOTP,
  changePassword,
  compareOtp,
  compareOtpApi,
  getMe,
  getOtp,
  passwordInterfaceApi,
  recovery,
  sendOtp,
  updatePassword,
  verifyAccount,
} from "./users.api";

class UsersService {
  register = (data: Omit<RegisterForm, "agreeToTerms">) => callRegister(data);

  login = (data: LoginFormData) => callLogin(data);

  sendVerifyAccountOTP = (data: { email_phone: string }) =>
    callSendVerifyAccountOTP(data);

  recovery = (data: RecoveryForm) => recovery(data);

  getMe = (accessToken: string) => getMe(accessToken);

  updatePassword = (
    accessToken: string,
    data: passwordInterfaceApi | undefined,
  ) => updatePassword(accessToken, data);

  getOtp = (accessToken: string, _data: sendOtp | undefined) =>
    getOtp(accessToken, _data);

  compareOtp = (accessToken: string, _data: compareOtpApi | undefined) =>
    compareOtp(accessToken, _data);

  changePassword = (
    accessToken: string,
    _data: FormDataChangePasswordApi | undefined,
  ) => changePassword(accessToken, _data);

  verifyAccount = (_data: {
    email_phone: string;
    verify_account_otp: string;
  }) => verifyAccount(_data);
}

const usersService = new UsersService();

export default usersService;
