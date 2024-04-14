//utils
import { lazy } from "react";

// providers
import { NextUIProvider } from "@nextui-org/react";

// hooks
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// components

// pages
const Register = lazy(() => import("@pages/Register"));
const Homepage = lazy(() => import("@pages/Homepage"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
