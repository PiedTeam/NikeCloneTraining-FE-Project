import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  return searchParamsObject;
};

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}
