import {
  ChangePasswordResponse,
  ErrorData,
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
  passwordInterfaceApi,
  recovery,
  resetPassword,
  updatePassword,
  verifyAccount,
} from "./users.api";
import { AxiosResponse } from "axios";
import { isAxiosUnprocessableEntityError } from "@utils/utils";
import ApiState from "types/api";

const wrapApi = async <TInput, TResponse extends { message: string }, TError>(
  func: (
    data: TInput,
  ) => Promise<AxiosResponse<TResponse> | AxiosResponse<TError>>,
  _data: TInput,
) => {
  const initialState: ApiState<TResponse, TError | string> = {
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    message: "",
    error: "",
  };

  try {
    const res = await func(_data);
    if ((res.data as TResponse).message !== undefined) {
      return {
        ...initialState,
        data: res.data as TResponse,
        message: (res.data as TResponse).message,
        isLoading: false,
        isSuccess: true,
      };
    } else {
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        error: res.data,
      };
    }
  } catch (err) {
    if (isAxiosUnprocessableEntityError(err)) {
      let errorResponse: { response: { data: { data: TError } } } | string =
        "Validation error";
      if (err.response && err.response.data) {
        const errorData = err.response.data as { data: TError };
        errorResponse = {
          response: {
            data: errorData,
          },
        };
      }
      return {
        ...initialState,
        isError: true,
        error: errorResponse,
      };
    } else {
      return {
        ...initialState,
        isError: true,
        error: "Unknown error",
      };
    }
  }
};

class UsersService {
  register = (data: Omit<RegisterForm, "agreeToTerms">) => callRegister(data);

  login = (data: LoginFormData) => callLogin(data);

  sendVerifyAccountOTP = (data: { email_phone: string; token: string }) =>
    callSendVerifyAccountOTP(data);

  recovery = (data: RecoveryForm) => recovery(data);

  getMe = (accessToken: string) => wrapApi(getMe, accessToken);

  updatePassword = ({
    access_token,
    _data,
  }: {
    access_token: string;
    _data: passwordInterfaceApi | undefined;
  }) => wrapApi(updatePassword, { access_token, _data });

  compareOtp = ({ _data }: { _data: compareOtpApi | undefined }) =>
    compareOtp({ _data });

  changePassword = ({
    accessToken,
    _data,
  }: {
    accessToken: string;
    _data: FormDataChangePasswordApi | undefined;
  }) =>
    wrapApi<
      {
        accessToken: string;
        _data: FormDataChangePasswordApi | undefined;
      },
      ChangePasswordResponse,
      ErrorData
    >(changePassword, {
      accessToken,
      _data,
    });

  verifyAccount = (_data: {
    email_phone: string;
    otp: string;
    token: string;
  }) => verifyAccount(_data);

  resetPassword = (_data: {
    email_phone: string;
    password: string;
    confirm_password: string;
    otp: string;
  }) => resetPassword(_data);
}

const usersService = new UsersService();

export default usersService;
