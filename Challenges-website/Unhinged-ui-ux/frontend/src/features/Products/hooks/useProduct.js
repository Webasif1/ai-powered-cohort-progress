import { getProducts, getProductById } from "../Services/product.api.js";
import { useContext } from "react";
import { ProductContext } from "../state/ProductContext.jsx";
import { toast } from "sonner";

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  const { loading, setLoading, error, setError, products, setProducts } =
    context;

  const getallProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductsById = async (id) => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProducts(data);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, error, getallProducts, getProductsById };
}
