import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@provider/AuthProvider";
import Routes from "./routes";
import { useNavigate } from "react-router-dom";

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NextUIProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
