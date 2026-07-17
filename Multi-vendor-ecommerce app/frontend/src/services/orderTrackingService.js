import api from "../api/api";

export async function getMyOrders() {
  const response = await api.get("/my-orders/");
  return response.data;
}