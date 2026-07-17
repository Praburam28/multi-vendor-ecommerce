import { useEffect, useState } from "react";

import CustomerLayout from "../layouts/customer/CustomerLayout";

import OrderTimeline from "../components/customer/order/OrderTimeline";

import { getMyOrders } from "../services/orderTrackingService";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getMyOrders();
    setOrders(data);
  }

  return (
    <CustomerLayout>

      <div className="mx-auto max-w-7xl px-8 py-16">

        <h1 className="mb-10 text-5xl font-bold">
          My Orders
        </h1>

        {orders.map(order => (

          <div
            key={order.id}
            className="mb-8 rounded-xl bg-white p-8 shadow"
          >

            <h2 className="text-2xl font-bold">
              Order #{order.id}
            </h2>

            <p className="mt-2">
              Total: ₹{order.total_amount}
            </p>

            <OrderTimeline
              status={order.status}
            />

          </div>

        ))}

      </div>

    </CustomerLayout>
  );
}