import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

export default function useCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return {
    cart,
    loading,
    refresh: loadCart,
  };
}