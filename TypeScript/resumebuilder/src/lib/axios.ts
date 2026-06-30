import axios from "axios";

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
      // Clear any stored auth data
      if (typeof window !== "undefined") {
        // Redirect to login
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
