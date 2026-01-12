import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL || "https://mini-drive1-2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
