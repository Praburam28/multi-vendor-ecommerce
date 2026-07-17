import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts(filters);

        console.log("Products:", data);

        setProducts(data);
        setError("");
      } catch (err) {
        console.error(err);

        if (err.response) {
          setError(JSON.stringify(err.response.data));
        } else {
          setError(err.message);
        }
      } finally {
        // THIS IS IMPORTANT
        setLoading(false);
      }
    }

    loadProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
  };
}