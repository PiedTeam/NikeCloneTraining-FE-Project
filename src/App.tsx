//utils
import { lazy } from "react";

// providers
import { NextUIProvider } from "@nextui-org/react";

// hooks
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// components

// pages
const Homepage = lazy(() => import("@pages/Homepage"));
const Login = lazy(() => import("@pages/Login"));

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
