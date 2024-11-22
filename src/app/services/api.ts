import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const baseUrl = "http://localhost:8000/";

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const destroyToken = () => {
  deleteCookie("token");
};
