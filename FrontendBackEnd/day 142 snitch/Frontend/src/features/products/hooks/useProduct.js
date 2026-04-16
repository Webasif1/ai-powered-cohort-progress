import { useDispatch } from "react-redux";
import { createProduct, getSellerProducts } from "../services/productAPI";
import {
  setIsLoading,
  setError,
  setSellerProducts,
} from "../state/product.slice";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct({
    title,
    description,
    priceAmount,
    priceCurrency,
    images,
  }) {
    try {
      dispatch(setIsLoading(true));
      const res = await createProduct({
        title,
        description,
        priceAmount,
        priceCurrency,
        images,
      });
      dispatch(setSellerProducts(res.product));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to create product"),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGerSellerProoducts() {
    try {
      dispatch(setIsLoading(true));
      const res = await getSellerProducts();
      dispatch(setSellerProducts(res.products));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to get seller products",
        ),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }
  return { handleCreateProduct, handleGerSellerProoducts };
}
