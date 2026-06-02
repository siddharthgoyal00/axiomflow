import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type":"application/json" },
});
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("axiomflow-auth");
  if (raw) {
    try { const { state } = JSON.parse(raw); if (state?.token) config.headers.Authorization = `Bearer ${state.token}`; }
    catch(_) {}
  }
  return config;
});
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) { localStorage.removeItem("axiomflow-auth"); window.location.href = "/login"; }
    return Promise.reject(err);
  }
);
export default api;
