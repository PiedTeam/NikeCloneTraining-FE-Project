import { USER_API } from "@constants/user/api";
import axios, { AxiosResponse, Method } from "axios";

export const isProduction = process.env.NODE_ENV === "production";
const backendURL = isProduction
  ? (import.meta.env.VITE_PRODUCTION_BACKEND_URL as string)
  : (import.meta.env.VITE_DEVELOPMENT_BACKEND_URL as string);

const http = <T extends object, U = unknown>({
  method = "get",
  url,
  data,
  token,
}: {
  method?: Method;
  url: USER_API;
  data?: U;
  token?: string;
}): Promise<AxiosResponse<T>> =>
  axios<T>({
    baseURL: backendURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
    method: method,
    url: url,
    data: data,
  });

export default http;
