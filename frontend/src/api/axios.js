import axios from "axios";

const ROOT = process.env.REACT_APP_API_URL || "https://mini-drive1-2.onrender.com";

// ✅ always include /api
const BASE_URL = ROOT.endsWith("/api") ? ROOT : `${ROOT}/api`;

console.log("✅ BASE_URL USED:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
