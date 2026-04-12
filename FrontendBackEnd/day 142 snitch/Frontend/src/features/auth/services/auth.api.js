import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({
  email,
  contact,
  password,
  fullName,
  isSeller,
}) => {
  try {
    const res = await authApi.post("/register", {
      email,
      contact,
      password,
      fullName,
      isSeller,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, contact, password }) => {
  try {
    const res = await authApi.post("/login", { email, contact, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};
