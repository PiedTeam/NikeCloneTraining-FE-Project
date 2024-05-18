import axios, { AxiosInstance } from "axios";

export const isProduction = process.env.NODE_ENV === "production";
console.log("ahihi");
console.log("isProduction", isProduction);
const backendURL = isProduction
  ? (import.meta.env.VITE_PRODUCTION_BACKEND_URL as string)
  : (import.meta.env.VITE_DEVELOPMENT_BACKEND_URL as string);

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${backendURL}`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const http = new Http().instance;

export default http;
