import API from './api';

const getProfile = async () => {
  const response = await API.get('/users/profile');
  return response.data;
};

const updateProfile = async (userData) => {
  const response = await API.put('/users/profile', userData);
  return response.data;
};

const UserService = {
  getProfile,
  updateProfile,
};

export default UserService;