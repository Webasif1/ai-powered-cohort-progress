import axios from "axios";

const api = axios.create({
  baseURL: "/api/products",
});
export const getProducts = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};
