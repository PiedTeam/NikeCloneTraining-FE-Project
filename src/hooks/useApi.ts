import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { PasswordForm } from "@pages/Password/Password";

interface ApiResponse {
  message: string;
  data: object;
}
type GetMeFunction = (
  accessToken: string,
  data?: PasswordForm | undefined,
) => Promise<AxiosResponse<ApiResponse>>;

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string;
}

export const runApi = async <T>(
  fn: GetMeFunction,
  accessToken: string,
  data: PasswordForm | undefined,
  method: "GET" | "POST",
): Promise<ApiState<T>> => {
  const initialState: ApiState<T> = {
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: "",
  };

  let apiCall: Promise<AxiosResponse<ApiResponse>>;
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
    return {
      ...initialState,
      data: res.data as T,
      isLoading: false,
      isSuccess: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        ...initialState,
        isError: true,
        error: err.message || "failed to fetch",
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
  fn: GetMeFunction,
  accessToken: string,
  data?: PasswordForm | undefined,
  method: "GET" | "POST" = "GET",
) => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: "",
  });
  const fetchData = useCallback(async () => {
    const newState = await runApi<T>(fn, accessToken, data, method);
    setState(newState);
  }, [fn, accessToken, data, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};

export default useApi;
