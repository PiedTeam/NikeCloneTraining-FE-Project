//utils
import { lazy } from "react";

// providers
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// hooks
import { Route, Routes, useNavigate } from "react-router-dom";
import Recovery from "@pages/Recovery";
import Password from "@pages/Password";
import CompareOtpPage from "@pages/Otp";
import ChangePassword from "@pages/ChangePassword";
import Account from "@pages/Account";
import Register from "@pages/Register";
import Login from "@pages/Login";

// components

// pages

const Homepage = lazy(() => import("@pages/Homepage"));
const VerifyAccount = lazy(() => import("@pages/VerifyAccount"));
const OAuth = lazy(() => import("@pages/OAuth"));

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/oauth" element={<OAuth />} />
          <Route path="/password" element={<Password />} />
          <Route path="/otp" element={<CompareOtpPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </NextUIProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
