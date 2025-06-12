import axios from "axios";
import store from "../redux/store";
import { PublicRoutes } from "../routes/routes";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de request para agregar token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response para redirigir en caso de 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = `/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`; // o tu ruta específica
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
