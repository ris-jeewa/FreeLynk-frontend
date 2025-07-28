import api from '../api/apiClient'; 

export const register = async (userData) => {
  return api.post('/api/auth/register', userData);
};
