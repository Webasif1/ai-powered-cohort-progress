import axios from "axios";

const productAPI = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export const createProduct = async ({
  title,
  description,
  priceAmount,
  priceCurrency,
  images,
}) => {
  try {
    const res = await productAPI.post("/create-product", {
      title,
      description,
      priceAmount,
      priceCurrency,
      images,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
