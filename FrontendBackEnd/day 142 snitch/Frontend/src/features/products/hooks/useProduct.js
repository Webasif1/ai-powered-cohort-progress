import { useDispatch } from "react-redux";
import {
  createProduct,
  getSellerProducts,
  getAllProducts,
  getSingleProduct,
  addProductVariant
} from "../services/productAPI.js";
import {
  setIsLoading,
  setAllProducts,
  setError,
  setSellerProducts,
} from "../state/product.slice.js";

export function useProduct() {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    try {
      dispatch(setIsLoading(true));
      const res = await createProduct(formData);
      dispatch(setSellerProducts(res.product));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to create product"),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetSellerProoducts() {
    try {
      dispatch(setIsLoading(true));
      const res = await getSellerProducts();
      dispatch(setSellerProducts(res.products));
      return res.products;
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

  async function handleGetAllProducts() {
    try {
      dispatch(setIsLoading(true));
      const res = await getAllProducts();
      dispatch(setAllProducts(res.products));
      return res.products;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to get all products"),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetSingleProduct(id) {
    try {
      dispatch(setIsLoading(true));
      const res = await getSingleProduct(id);
      return res.product;
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to get single product",
        ),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  async function handleGetProductVariants(productId, newProductVariant) {
    try {
      dispatch(setIsLoading(true));
      const data = await addProductVariant(productId, newProductVariant);
      return data
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Failed to get product variants",
        ),
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  return {
    handleCreateProduct,
    handleGetSellerProoducts,
    handleGetAllProducts,
    handleGetSingleProduct,
  };
}
