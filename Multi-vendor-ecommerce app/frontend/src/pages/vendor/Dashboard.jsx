import { useEffect, useState } from "react";
import {
  IndianRupee,
  Package,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

import VendorLayout from "../../layouts/vendor/VendorLayout";
import DashboardCard from "../../components/vendor/DashboardCard";
import RevenueChart from "../../components/vendor/RevenueChart";
import { getVendorDashboard } from "../../services/vendorDashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getVendorDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <VendorLayout>
        <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <h1 className="mb-8 text-4xl font-bold dark:text-white">
        Vendor Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Revenue"
          value={`₹${dashboard.revenue}`}
          icon={IndianRupee}
          color="bg-green-500"
        />

        <DashboardCard
          title="Products"
          value={dashboard.products}
          icon={Package}
          color="bg-blue-500"
        />

        <DashboardCard
          title="Orders"
          value={dashboard.orders}
          icon={ShoppingCart}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Low Stock"
          value={dashboard.low_stock}
          icon={AlertTriangle}
          color="bg-red-500"
        />

      </div>

      <div className="mt-10">
        <RevenueChart />
      </div>

      <div className="mt-10 rounded-lg bg-white dark:bg-gray-800 shadow p-6">

        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Recent Orders
        </h2>

        {dashboard.latest_orders.length === 0 ? (
          <p className="text-gray-500">
            No recent orders found.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.latest_orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b"
                >
                  <td>#{order.id}</td>
                  <td>{order.status}</td>
                  <td>₹{order.amount}</td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </VendorLayout>
  );
}