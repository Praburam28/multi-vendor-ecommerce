import { ShoppingCart } from "lucide-react";

export default function ProductInfo({ product }) {

  return (

    <div>

      <h1 className="text-4xl font-bold">

        {product.name}

      </h1>

      <p className="mt-4 text-gray-600">

        {product.description}

      </p>

      <h2 className="mt-6 text-3xl font-bold text-indigo-600">

        ₹ {product.price}

      </h2>

      <p className="mt-3">

        Stock : {product.stock}

      </p>

      <button className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-white">

        <ShoppingCart />

        Add to Cart

      </button>

    </div>

  );

}