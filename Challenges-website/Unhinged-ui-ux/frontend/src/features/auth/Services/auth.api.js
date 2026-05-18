import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});
export const signup = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const signin = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await api.get(`/me`);
  return response.data;
};
