import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@styles/index.scss";
import { BrowserRouter } from "react-router-dom";

let rootElement = document.getElementById("root");

if (!rootElement) {
  rootElement = document.createElement("div");
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
