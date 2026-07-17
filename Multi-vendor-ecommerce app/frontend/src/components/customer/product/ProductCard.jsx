import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../../api/api";
import { getImageUrl } from "../../../utils/image";
import { addWishlist } from "../../../services/wishlistService";

export default function ProductCard({ product }) {
  async function addToCart() {
    try {
      await api.post("/cart/add", {
        product_id: product.id,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Unable to add product."
      );
    }
  }

  async function handleWishlist() {
    try {
      await addWishlist(product.id);
      toast.success("Added to Wishlist");
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
        "Unable to add wishlist."
      );
    }
  }

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800">

      {/* Product Image */}

      <div className="relative overflow-hidden">

        <Link to={`/products/${product.id}`}>

          <img
            src={getImageUrl(product.image_url)}
            alt={product.name}
            className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400?text=No+Image";
            }}
          />

        </Link>

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:bg-red-100"
        >
          <Heart size={18} />
        </button>

        {/* Quick View */}

        <Link
          to={`/products/${product.id}`}
          className="absolute bottom-4 right-4 rounded-full bg-indigo-600 p-2 text-white opacity-0 transition group-hover:opacity-100"
        >
          <Eye size={18} />
        </Link>

      </div>

      {/* Product Details */}

      <div className="space-y-3 p-5">

        <h3 className="truncate text-xl font-bold dark:text-white">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-300">
          {product.description}
        </p>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1 text-yellow-500">

            <Star
              size={18}
              fill="currentColor"
            />

            <span>4.8</span>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
          </h2>

        </div>

        <button
          onClick={addToCart}
          disabled={product.stock === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-400"
        >

          <ShoppingCart size={18} />

          Add To Cart

        </button>

      </div>

    </div>
  );
}