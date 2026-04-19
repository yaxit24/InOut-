import axios from 'axios';

// Get token from localStorage if available
function getToken() {
  return localStorage.getItem('token');
}

export const api = axios.create({
  baseURL: 'https://mygate-x53m.onrender.com/api', // Live Production Backend
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optionally handle 401s centrally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);
