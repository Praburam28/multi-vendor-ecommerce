import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    dashboard,
    loading,
  };
}