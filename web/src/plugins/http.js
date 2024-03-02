import axios from 'axios'

const config = {
  baseURL: import.meta.env.VITE_API_URL,
};

const http = axios.create(config);

http.interceptors.request.use((config) => {
  delete config.headers["Authorization"];

  const token = localStorage.getItem('geraldo-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default http;
