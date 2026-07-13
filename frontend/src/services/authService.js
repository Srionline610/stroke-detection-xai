import api from './api';

export const authService = {

  login: async (email, password, role) => {
    const response = await api.post('/auth/login', {
      email,
      password,
      role
    });
    // Store token and user info
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('userId', response.data.id);
    return response.data;
  },

  logout: () => {
    localStorage.clear();
    window.location.href = '/';
  },

  getCurrentUser: () => {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      userId: localStorage.getItem('userId'),
    };
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};