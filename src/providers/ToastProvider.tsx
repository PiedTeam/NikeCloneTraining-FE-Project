/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ToastType = {
  id: number;
  color: "success" | "danger" | "warning";
  message: string;
  timeout: number;
};

type ToastContextType = {
  list: ToastType[];
  setList: React.Dispatch<React.SetStateAction<ToastType[]>>;
  toast: {
    success: ({
      message,
      timeout,
    }: {
      message: string;
      timeout?: number;
    }) => void;
    danger: ({
      message,
      timeout,
    }: {
      message: string;
      timeout?: number;
    }) => void;
    warning: ({
      message,
      timeout,
    }: {
      message: string;
      timeout?: number;
    }) => void;
  };
};

const ToastContext = createContext<ToastContextType>({
  list: [],
  setList: () => {},
  toast: {
    success: () => {},
    danger: () => {},
    warning: () => {},
  },
});

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<ToastType[]>([]);
  let toastProps: ToastType | null = null;

  const success = useCallback(
    ({ message, timeout = 3000 }: { message: string; timeout?: number }) => {
      toastProps = {
        id: Date.now(),
        message,
        color: "success",
        timeout,
      };

      setList([...list, toastProps]);
    },
    [list, setList],
  );

  const danger = useCallback(
    ({ message, timeout = 3000 }: { message: string; timeout?: number }) => {
      toastProps = {
        id: Date.now(),
        message,
        color: "danger",
        timeout,
      };

      setList([...list, toastProps]);
    },
    [list, setList],
  );

  const warning = useCallback(
    ({ message, timeout = 3000 }: { message: string; timeout?: number }) => {
      toastProps = {
        id: Date.now(),
        message,
        color: "warning",
        timeout,
      };

      setList([...list, toastProps]);
    },
    [list, setList],
  );

  const contextValue = useMemo(
    () => ({
      toast: {
        success,
        danger,
        warning,
      },
      list,
      setList,
    }),
    [success, danger, warning, list, setList],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

export default ToastProvider;
