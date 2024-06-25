/* eslint-disable @typescript-eslint/no-empty-function */
import axios from "axios";
import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

enum ACTIONS {
  SETTOKEN = "SETTOKEN",
  CLEARTOKEN = "CLEARTOKEN",
}

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

interface AuthState {
  token: string | null;
}

type AuthAction =
  | { type: ACTIONS.SETTOKEN; payload: string }
  | { type: ACTIONS.CLEARTOKEN };

const initialState: AuthState = {
  token: localStorage.getItem("token"),
};
const AuthContext = createContext<AuthContextType>({
  token: initialState.token,
  setToken: () => {},
  clearToken: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ACTIONS.SETTOKEN:
      axios.defaults.headers.common.Authorization = `Bearer ${action.payload}`;
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case ACTIONS.CLEARTOKEN:
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
      return { ...state, token: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState,
  );

  const setToken = (newToken: string): void => {
    dispatch({ type: ACTIONS.SETTOKEN, payload: newToken });
  };

  const clearToken = (): void => {
    dispatch({ type: ACTIONS.CLEARTOKEN });
  };

  const contextValue = useMemo(
    () => ({ ...state, setToken, clearToken }),
    [state],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export default AuthProvider;
