import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send httpOnly cookies automatically
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const isAdmin = window.location.pathname.startsWith("/admin");
      window.location.href = isAdmin ? "/auth/admin/login" : "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
