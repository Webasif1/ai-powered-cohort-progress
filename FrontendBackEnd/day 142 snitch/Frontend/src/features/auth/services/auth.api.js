import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({ email, contact, password, fullName }) => {
  try {
    const res = await authApi.post("/register", {
      email,
      contact,
      password,
      fullName,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await authApi.post("/login", { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};
