import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

let rootElement = document.getElementById("root");

if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_SITE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
);
