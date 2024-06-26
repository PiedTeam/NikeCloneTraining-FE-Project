//utils
import { useEffect } from "react";
// providers
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// hooks
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Recovery from "@pages/Recovery";
import Password from "@pages/Password";
import ChangePassword from "@pages/ChangePassword";

// components
// pages
import Login from "@pages/Login";
import CompareOtpPage from "@pages/CompareOtpPage";
import { ProtectedRoute } from "./components";
import Homepage from "@pages/Homepage";
import Register from "@pages/Register";
import VerifyAccount from "@pages/VerifyAccount";
import OAuth from "@pages/OAuth";
import PageNotFound from "@pages/PageNotFound";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {}, [path]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute isAllowed="guest">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAllowed="guest">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/recovery" element={<Recovery />} />
          {/* <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/otp" element={<CompareOtpPage />} />
          <Route path="/password" element={<Password />} />
          <Route path="/change-password" element={<ChangePassword />} /> */}
          <Route
            path="/verify-account"
            element={
              <ProtectedRoute isAllowed="user">
                <VerifyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <ProtectedRoute redirectFromURL="/recovery">
                <CompareOtpPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoute redirectFromURL="/otp">
                <Password />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute isAllowed="user">
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route path="/oauth" element={<OAuth />} />
          <Route path="/404" element={<PageNotFound />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </NextUIProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
