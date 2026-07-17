import api from "../api/api";

export const getVendors = async () => {
  const response = await api.get("/admin/vendors/");
  return response.data;
};

export const approveVendor = async (id) => {
  return api.patch(`/admin/vendors/${id}/approve`);
};

export const rejectVendor = async (id) => {
  return api.patch(`/admin/vendors/${id}/reject`);
};