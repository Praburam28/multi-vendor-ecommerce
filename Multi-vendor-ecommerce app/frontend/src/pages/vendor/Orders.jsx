import { useEffect, useState } from "react";

import VendorLayout from "../../layouts/vendor/VendorLayout";

import VendorOrderTable from "../../components/vendor/VendorOrderTable";

import {
  getVendorOrders,
} from "../../services/vendorOrderService";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getVendorOrders();
    setOrders(data);
  }

  return (

    <VendorLayout>

      <h1 className="mb-8 text-4xl font-bold">

        Vendor Orders

      </h1>

      <VendorOrderTable
        orders={orders}
      />

    </VendorLayout>

  );

}