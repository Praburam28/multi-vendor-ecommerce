import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="py-24 text-center">

      <ShoppingCart
        size={80}
        className="mx-auto text-gray-400"
      />

      <h2 className="mt-6 text-3xl font-bold">
        Your Cart is Empty
      </h2>

      <p className="mt-3 text-gray-500">
        Browse products and add them to your cart.
      </p>

      <Link
        to="/products"
        className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-3 text-white"
      >
        Continue Shopping
      </Link>

    </div>
  );
}