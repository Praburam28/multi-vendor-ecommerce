import api from "../api/api";

export async function getUsers() {
  const response = await api.get("/admin/users/");
  return response.data;
}