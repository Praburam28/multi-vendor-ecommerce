import api from "../api/api";

export const getReviews = async (productId) => {
  const response = await api.get(`/reviews/product/${productId}`);
  return response.data;
};