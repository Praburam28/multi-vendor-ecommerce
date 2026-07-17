import { useEffect, useState } from "react";
import {
  Users,
  Store,
  Package,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

import AdminLayout from "../../layouts/admin/AdminLayout";
import AdminDashboardCard from "../../components/admin/AdminDashboardCard";
import { getDashboardStats } from "../../services/adminDashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="text-center py-10">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Dashboard UI */}
    </AdminLayout>
  );
}