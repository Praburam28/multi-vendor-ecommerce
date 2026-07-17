import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/api";

export default function ProductInfo({ product }) {

  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        product_id: product.id,
        quantity,
      });

      toast.success("Added to Cart");
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Unable to add product."
      );
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-2 text-yellow-500">
        ⭐⭐⭐⭐⭐
        <span className="text-gray-600">
          (4.8)
        </span>
      </div>

      <h2 className="mt-6 text-4xl font-bold text-indigo-600">
        ₹ {product.price}
      </h2>

      <p className="mt-4 text-green-600">
        {product.stock > 0
          ? "In Stock"
          : "Out of Stock"}
      </p>

      <div className="mt-8 flex items-center gap-5">

        <button
          onClick={() =>
            setQuantity(
              Math.max(1, quantity - 1)
            )
          }
          className="rounded-lg border px-4 py-2"
        >
          -
        </button>

        <span className="text-xl">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="rounded-lg border px-4 py-2"
        >
          +
        </button>

      </div>

      <button
        onClick={addToCart}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-4 text-white"
      >
        <ShoppingCart />
        Add To Cart
      </button>

      <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border py-4">
        <Heart />
        Wishlist
      </button>

    </div>
  );
}