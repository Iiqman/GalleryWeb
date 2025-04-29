import API from './api';

const register = async (email, password) => {
  const response = await API.post('/auth/signup', {
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await API.post('/auth/signin', {
    email,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
};

export default AuthService;