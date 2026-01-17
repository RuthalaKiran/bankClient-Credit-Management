import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://65.1.128.65:8081"

});

// add the jwt token for every reques
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto logout if status code is 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
