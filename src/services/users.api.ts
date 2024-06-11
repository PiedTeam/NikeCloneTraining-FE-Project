import http from "@utils/http";

export interface ErrorData {
  password: string;
  forgot_password_otp: string;
  old_password: string;
}

export interface passwordInterfaceApi {
  email: string;
  password: string;
}

export interface sendOtp {
  email_phone: string;
}
export interface compareOtpApi {
  email_phone: string;
  forgot_password_otp: string;
}

export type TokenResponse = {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
};

export interface LoginFormData {
  email_phone: string;
  password: string;
  email?: string;
  phone_number?: string;
}

export interface FormDataChangePasswordApi {
  old_password: string;
  new_password: string;
}

export interface RecoveryForm {
  email_phone: string;
  phone_number?: string;
  email?: string;
}

export interface FormDataChangePassword {
  oldPassword: string;
  confirmPassword: string;
  password: string;
}

export type RegisterForm = {
  first_name: string;
  last_name: string;
  email_phone: string;
  email?: string;
  phone_number?: string;
  password: string;
  agreeToTerms: boolean;
  subcribe?: boolean;
};

export type RecoveryResponse = {
  details: {
    otp: string;
  };
};
export interface ApiResponse {
  message: string;
  data: {
    email: string;
  };
}

export type SendVerifyAccountOtpResponse = {
  message: string;
  details: {
    otp_id: string;
    otp: string;
  };
};

export type UpdatePasswordResponse = {
  message: string;
  data: {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    email: string;
    role: number;
    created_at: Date;
    updated_at: Date;
    status: number;
    notice: number;
    avatar_url: string;
    subscription: number;
  };
};

export type CompareOTPResponse = {
  message: string;
};

export type ChangePasswordResponse = {
  message: string;
  detail: boolean;
};

export type VerifyAccountResponse = {
  message: string;
  detail: boolean;
};

export const callRegister = (_data: Omit<RegisterForm, "agreeToTerms">) =>
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
  http<SendVerifyAccountOtpResponse, typeof _data>({
    url: "user/send-verify-account-otp",
    data: _data,
    method: "post",
  });

export const getOtp = ({
  access_token,
  _data,
}: {
  access_token: string;
  _data: sendOtp | undefined;
}) =>
  http<SendVerifyAccountOtpResponse, typeof _data>({
    url: "user/send-verify-account-otp",
    data: _data,
    method: "post",
    token: access_token,
  });

export const recovery = (_data: RecoveryForm) =>
  http<RecoveryResponse, typeof _data>({
    url: "user/forgot-password",
    data: _data,
    method: "post",
  });

export const getMe = (accessToken: string) =>
  http<ApiResponse>({ url: "user/me", method: "get", token: accessToken });

export const updatePassword = ({
  access_token,
  _data,
}: {
  access_token: string;
  _data: passwordInterfaceApi | undefined;
}) =>
  http<UpdatePasswordResponse, typeof _data>({
    url: "pass/updatePass",
    data: _data,
    method: "post",
    token: access_token,
  });

export const compareOtp = ({
  access_token,
  _data,
}: {
  access_token: string;
  _data: compareOtpApi | undefined;
}) =>
  http<CompareOTPResponse, typeof _data>({
    url: "user/verify-otp",
    data: _data,
    method: "post",
    token: access_token,
  });

export const changePassword = ({
  accessToken,
  _data,
}: {
  accessToken: string;
  _data: FormDataChangePasswordApi | undefined;
}) =>
  http<ChangePasswordResponse, typeof _data>({
    url: "user/change-password",
    data: _data,
    method: "post",
    token: accessToken,
  });

export const verifyAccount = (_data: {
  email_phone: string;
  verify_account_otp: string;
}) =>
  http<VerifyAccountResponse, typeof _data>({
    url: "user/verify-account",
    data: _data,
    method: "post",
  });
