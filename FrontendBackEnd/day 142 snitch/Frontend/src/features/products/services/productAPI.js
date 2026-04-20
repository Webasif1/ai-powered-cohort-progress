import axios from "axios";

const productAPI = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  try {
    const res = await productAPI.post("/", formData);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSellerProducts = async () => {
  try {
    const res = await productAPI.get("/seller");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await productAPI.get("/");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleProduct = async (id) => {
  try {
    const res = await productAPI.get(`/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
