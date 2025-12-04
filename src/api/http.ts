import axios from 'axios';
import { API_BASE_URL } from '../config/agoraConfig';
import { useUserStore } from '../store/userStore';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

http.interceptors.request.use(config => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
