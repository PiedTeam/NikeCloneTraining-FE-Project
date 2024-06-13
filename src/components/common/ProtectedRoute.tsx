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
  if (redirectFromURL && origin !== redirectFromURL && origin !== "/oauth") {
    return <Navigate to={redirectPath} replace />;
  }

  if (isAllowed === "user" && !auth?.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
