import axios from 'axios'

const config = {
  baseURL: import.meta.env.VITE_API_URL,
};

const http = axios.create(config);

export default http;
