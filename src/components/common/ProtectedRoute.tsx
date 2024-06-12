import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/404",
  children,
}: {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
