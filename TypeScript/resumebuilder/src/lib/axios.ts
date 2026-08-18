import axios from "axios";
import { clearSessionHint } from "./sessionHint";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 or 500 with auth error, redirect to login
    if (
      error.response?.status === 401 ||
      (error.response?.status === 500 &&
        error.response?.data?.message?.includes("expired"))
    ) {
      if (typeof window !== "undefined") {
        // Without this the login page would paint signed-in header chrome
        // from a hint the server has just told us is stale.
        clearSessionHint();
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
