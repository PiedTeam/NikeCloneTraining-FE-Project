import ChangePassword from "@pages/ChangePassword";
import Homepage from "@pages/Homepage";
import Login from "@pages/Login";
import OAuth from "@pages/OAuth";
import PageNotFound from "@pages/PageNotFound";
import Recovery from "@pages/Recovery";
import Register from "@pages/Register";
import VerifyAccount from "@pages/VerifyAccount";
import { useAuth } from "provider/AuthProvider";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { NestedRoute } from "./NestedRoute";
import Password from "@pages/Password";
import CompareOtpPage from "@pages/CompareOtpPage";

// eslint-disable-next-line react-refresh/only-export-components
export const redirectPath = [
  {
    from: "/recovery",
    to: "/otp",
  },
  {
    from: "/otp",
    to: "/password",
  },
];

interface RouteType {
  path: string;
  element: JSX.Element;
  children?: RouteType[];
}

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/404",
    element: <PageNotFound />,
  },
];

const authenticatedRoutes: RouteType[] = [
  {
    path: "/verify-account",
    element: <VerifyAccount />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
];

const unauthenticatedRoutes: RouteType[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/oauth",
    element: <OAuth />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/",
    element: <NestedRoute />,
    children: [
      {
        path: "/otp",
        element: <CompareOtpPage />,
      },
      {
        path: "/password",
        element: <Password />,
      },
    ],
  },
];

const Routes = (): JSX.Element => {
  const { token } = useAuth();

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(token ? authenticatedRoutes : unauthenticatedRoutes),
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
