import api from './api';

// Get Profile Information
export const getProfile = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data.user;
};

// Update Profile Information
export const updateProfile = async (id, profileData) => {
  const response = await api.patch(`/users/${id}`, profileData);
  return response.data.user;
};

// Change Password
export const changePassword = async (id, passwords) => {
  const response = await api.patch(`/users/${id}/password`, passwords);
  return response.data;
};