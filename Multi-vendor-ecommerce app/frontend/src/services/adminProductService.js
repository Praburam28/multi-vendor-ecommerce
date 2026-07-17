import api from "../api/api";

export const getAllProducts = async () => {
  const response = await api.get("/products/");
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};