import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerLayout from "../layouts/customer/CustomerLayout";

import ShippingForm from "../components/customer/checkout/ShippingForm";
import OrderSummary from "../components/customer/checkout/OrderSummary";

import useCart from "../hooks/useCart";

import { checkoutOrder } from "../services/orderService";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const [shipping, setShipping] = useState(null);

  const placeOrder = async () => {
    try {
      const order = await checkoutOrder();

      navigate("/payment", {
        state: {
          orderId: order.order_id,
          total: order.total_amount,
        },
      });
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Unable to place order."
      );
    }
  };

  return (
    <CustomerLayout>

      <div className="mx-auto max-w-7xl px-8 py-16">

        <h1 className="mb-10 text-4xl font-bold">
          Checkout
        </h1>

        <div className="grid gap-10 md:grid-cols-2">

          <ShippingForm
            onContinue={setShipping}
          />

          <OrderSummary
            cart={cart}
            onPlaceOrder={placeOrder}
          />

        </div>

      </div>

    </CustomerLayout>
  );
}