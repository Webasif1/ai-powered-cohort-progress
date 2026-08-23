import { api } from "@/lib/axios";
import { LoginBody, RegisterBody } from "@/types/user.types";

export const registerUser = async (data:RegisterBody) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data:LoginBody) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
