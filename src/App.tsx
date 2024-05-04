//utils
import { lazy } from "react";

// providers
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// hooks
import { Route, Routes, useNavigate } from "react-router-dom";
import Recovery from "@pages/Recovery";

// components

// pages
const Register = lazy(() => import("@pages/Register"));
const Homepage = lazy(() => import("@pages/Homepage"));
const Login = lazy(() => import("@pages/Login"));
const VerifyAccount = lazy(() => import("@pages/VerifyAccount"));
const OAuth = lazy(() => import("@pages/OAuth"));

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/oauth" element={<OAuth />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
