import { useAuthStore } from "@stores/AuthStore";
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/404",
  children,
  redirectFromURL,
}: {
  isAllowed?: "user" | "admin";
  redirectPath?: string;
  children?: ReactNode;
  redirectFromURL?: string;
}) => {
  const { auth } = useAuthStore();
  const location = useLocation();
  const origin = location.state?.from;
  if (origin !== redirectFromURL) {
    return <Navigate to={redirectPath} replace />;
  }
  switch (isAllowed) {
    case "user": {
      if (!auth?.user) {
        return <Navigate to={redirectPath} replace />;
      }
      break;
    }
    case "admin": {
      // check if user is admin
      break;
    }
    default: {
      return children ? children : <Outlet />;
    }
  }
};

export default ProtectedRoute;
