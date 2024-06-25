import { Navigate, Outlet, useLocation } from "react-router-dom";
import { redirectPath } from "routes";

export const NestedRoute = (): JSX.Element => {
  const location = useLocation();
  const origin = location.state?.from;

  if (
    origin !== redirectPath.find((item) => item.to === location.pathname)?.from
  ) {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};
