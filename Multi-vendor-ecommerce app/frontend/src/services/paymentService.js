import api from "../api/api";

export const makePayment = async (orderId, paymentMethod) => {
  const response = await api.post(
    `/payments/${orderId}`,
    null,
    {
      params: {
        payment_method: paymentMethod,
      },
    }
  );

  return response.data;
};