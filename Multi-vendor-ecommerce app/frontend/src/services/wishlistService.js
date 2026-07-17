import api from "../api/api";

export async function addWishlist(id) {
  return api.post(`/wishlist/${id}`);
}

export async function removeWishlist(id) {
  return api.delete(`/wishlist/${id}`);
}

export async function getWishlist() {
  const response = await api.get("/wishlist/");
  return response.data;
}