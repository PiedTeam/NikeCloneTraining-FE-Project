import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { isAxiosUnprocessableEntityError } from "@utils/utils";

export interface ApiResponse {
  message: string;
  data: {
    email: string;
  };
}

interface ErrorData {
  password: string;
  forgot_password_otp: string;
  old_password: string;
}

export interface ErrorForm {
  response: {
    data: {
      data: ErrorData;
    };
  };
}

export type GetMeFunction<T> = (
  accessToken: string,
  data?: T,
) => Promise<AxiosResponse<ApiResponse> | AxiosResponse<ErrorForm>>;
interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: T | string;
  error: ErrorForm | string;
}
const isApiResponse = (
  res: AxiosResponse<ApiResponse> | AxiosResponse<ErrorForm>,
): res is AxiosResponse<ApiResponse> => {
  return (res.data as ApiResponse).message !== undefined;
};

export const runApi = async <T>(
  fn: GetMeFunction<T>,
  accessToken: string,
  data: T,
  method: "GET" | "POST",
): Promise<ApiState<T>> => {
  const initialState: ApiState<T> = {
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    message: "",
    error: "",
  };

  let apiCall: Promise<AxiosResponse<ApiResponse> | AxiosResponse<ErrorForm>>;
  if (method === "GET") {
    apiCall = fn(accessToken);
  } else if (method === "POST") {
    apiCall = fn(accessToken, data);
  } else {
    return {
      ...initialState,
      isLoading: false,
      isError: true,
      error: `Unsupported method: ${method}`,
    };
  }

  try {
    const res = await apiCall;
    if (isApiResponse(res)) {
      return {
        ...initialState,
        data: res.data as T,
        message: res.data.message,
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
      let errorResponse: ErrorForm | string = "Validation error";
      if (err.response && err.response.data) {
        const errorData = err.response.data as { data: ErrorData };
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
      console.error("Unknown error:", err);
      return {
        ...initialState,
        isError: true,
        error: "Unknown error",
      };
    }
  }
};

const useApi = <T>(
  fn: GetMeFunction<T>,
  accessToken: string,
  data?: T,
  method: "GET" | "POST" = "GET",
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    message: "",
    error: "",
  });
  const fetchData = useCallback(async () => {
    const newState = await runApi<T>(fn, accessToken, data!, method);
    setState(newState);
  }, [fn, accessToken, data, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

export default useApi;
