import type { LoginRequest } from "../types";
import api from "./axios";

export const loginApi = async (formData: LoginRequest) => {
  const res = await api.post("/api/auth/login", formData);
  console.log(res);
  return res.data;
};
