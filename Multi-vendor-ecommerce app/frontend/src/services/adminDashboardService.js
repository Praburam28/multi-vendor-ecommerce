import api from "../api/api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};