import { useNavigate } from "react-router-dom";

export default function CartSummary({ total }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>
        <span>₹ {total}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Shipping</span>
        <span className="text-green-600">
          FREE
        </span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Discount</span>
        <span className="text-green-600">
          ₹500
        </span>
      </div>

      <hr className="my-5" />

      <div className="flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>₹ {Math.max(total - 500, 0)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-white hover:bg-indigo-700"
      >
        Proceed To Checkout
      </button>

    </div>
  );
}