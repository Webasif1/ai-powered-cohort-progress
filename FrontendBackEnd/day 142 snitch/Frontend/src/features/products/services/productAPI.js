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
    const res = await productAPI.post("/", {
      title,
      description,
      priceAmount,
      priceCurrency,
      images,
    });
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
