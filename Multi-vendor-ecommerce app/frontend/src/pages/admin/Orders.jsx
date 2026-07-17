import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/admin/AdminLayout";
import OrderTable from "../../components/admin/OrderTable";

import { getOrders } from "../../services/adminOrderService";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getOrders();
    setOrders(data);
  }

  return (
    <AdminLayout>

      <h1 className="mb-8 text-4xl font-bold dark:text-white">
        Order Management
      </h1>

      <OrderTable orders={orders} />

    </AdminLayout>
  );
}