import api from "../api/api";

export async function getOrders() {
  const response = await api.get("/admin/orders/");
  return response.data;
}