//utils
import { useEffect } from "react";
// providers
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// hooks
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Recovery from "@pages/Recovery";
import Password from "@pages/Password";
import ChangePassword from "@pages/ChangePassword";

// components

// pages
import Login from "@pages/Login";
import CompareOtpPage from "@pages/CompareOtpPage";
import { useAuthStore } from "@stores/AuthStore";
import { ProtectedRoute } from "./components";
import Homepage from "@pages/Homepage";
import Register from "@pages/Register";
import VerifyAccount from "@pages/VerifyAccount";
import OAuth from "@pages/OAuth";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const { auth } = useAuthStore();
  const path = useLocation().pathname;

  useEffect(() => {}, [path]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route
            element={
              <ProtectedRoute
                isAllowed={auth?.isAuthenticated || false}
                redirectPath="/404"
              />
            }
          >
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route path="/password" element={<Password />} />
            <Route path="/otp" element={<CompareOtpPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/oauth" element={<OAuth />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </NextUIProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
