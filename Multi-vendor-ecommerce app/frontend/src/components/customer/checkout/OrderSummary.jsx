import { getImageUrl } from "../../../utils/image";

export default function OrderSummary({ cart, onPlaceOrder }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Order Summary
      </h2>

      {cart.items.map((item) => (
        <div
          key={item.cart_item_id}
          className="mb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">

            <img
              src={getImageUrl(item.image_url)}
              alt={item.product_name}
              className="h-16 w-16 rounded-lg object-cover border"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/100x100?text=No+Image";
              }}
            />

            <div>
              <h3 className="font-semibold">
                {item.product_name}
              </h3>

              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

          </div>

          <span className="font-semibold">
            ₹ {item.subtotal}
          </span>
        </div>
      ))}

      <hr className="my-5" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹ {cart.total}</span>
      </div>

      <button
        onClick={onPlaceOrder}
        className="mt-8 w-full rounded-xl bg-green-600 py-4 text-white hover:bg-green-700"
      >
        Place Order
      </button>

    </div>
  );
}