import { getProducts, getProductById } from "../Services/product.api";
import { useContext } from "react";
import { ProductContext } from "../state/ProductContext.jsx";

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  const { loading, setLoading, error, setError, setProducts } = context;

  const getallProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return { getallProducts };
}
