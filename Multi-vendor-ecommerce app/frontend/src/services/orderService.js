import api from "../api/api";

export const checkoutOrder = async () => {
  const response = await api.post("/orders/checkout");
  return response.data;
};