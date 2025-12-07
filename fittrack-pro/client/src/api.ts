import axios from 'axios';

// REPLACE THIS STRING WITH YOUR ACTUAL RENDER BACKEND URL e.g. 'https://fittrack-api.onrender.com'
// DO NOT LEAVE IT AS LOCALHOST IF DEPLOYING
const BASE_URL = import.meta.env.VITE_API_URL || 'https://YOUR-RENDER-APP-NAME.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;