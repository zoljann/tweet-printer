import axios from 'axios';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
  timeout: 20000,
});

export default http;
