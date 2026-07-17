import api from "../api/api";

export async function getVendorOrders() {
  const response = await api.get("/vendor/orders/");
  return response.data;
}

export async function updateVendorOrderStatus(
  id,
  status
) {
  return api.patch(
    `/vendor/orders/${id}`,
    {
      status,
    }
  );
}