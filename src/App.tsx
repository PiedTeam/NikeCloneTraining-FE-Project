// providers
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// hooks
import { Route, Routes, useNavigate } from "react-router-dom";

// components

// pages
import Login from "@pages/Login";
import CompareOtpPage from "@pages/CompareOtpPage";
import Homepage from "@pages/Homepage";
import Register from "@pages/Register";
import VerifyAccount from "@pages/VerifyAccount";
import OAuth from "@pages/OAuth";
import Recovery from "@pages/Recovery";
import Password from "@pages/Password";
import ChangePassword from "@pages/ChangePassword";

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
<<<<<<< HEAD
          <Route path="/recovery" element={<Recovery />} />
=======
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
>>>>>>> 52a4344 (valid prevent xss)
          <Route path="/oauth" element={<OAuth />} />
          <Route path="/password" element={<Password />} />
          <Route path="/otp" element={<CompareOtpPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
        </Routes>
      </NextUIProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
