import { USER_API } from "@constants/user/api";
import axios, { AxiosResponse, Method } from "axios";

// interface response = {
//   data: {
//     data: ErrorData;
//   };
// };

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
    baseURL: "https://nikeclonetraining-be-project-hoang.onrender.com/",
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
