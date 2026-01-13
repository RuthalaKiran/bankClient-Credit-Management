import type { CreateUserRequest } from "../types";
import api from "./axios";

// get all users
export const getAllUsers = async () => {
  const res = await api.get("/api/users");
  console.log(res);
  return res.data;
};

// create user
export const createUserApi = async (formData: CreateUserRequest) => {
  const res = await api.post("/api/auth/register", formData);
  return res.data;
};

// update user status api
export const updateUserStatusApi = async (
  id: string,
  active: boolean
) => {
  const res = await api.put(
    `/api/admin/users/${id}/status`,
    { active }
  );
  return res.data;
};