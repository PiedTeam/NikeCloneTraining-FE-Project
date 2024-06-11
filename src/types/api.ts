export interface ApiState<TData, TError> {
  data: TData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: TData | string;
  error: TError | string;
}
