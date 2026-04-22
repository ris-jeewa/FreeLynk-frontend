import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

let getAccessToken = null;

export const setAccessTokenGetter = (getter) => {
  getAccessToken = getter;
};

api.interceptors.request.use(
  async (config) => {
    if (getAccessToken) {
      try {
        const token = await getAccessToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (_) {
        // not authenticated, proceed without token
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
