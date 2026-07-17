import api from "../api/api";

export const getVendorDashboard = async () => {
  const { data } = await api.get("/vendors/dashboard");
  return data;
};