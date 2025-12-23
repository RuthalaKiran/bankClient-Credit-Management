import api from "./axios";
import type {
  CreditRequestCreate,
  CreditRequestUpdate,
} from "../types";

// RM: create credit request
export const createCreditRequestApi = async (
  payload: CreditRequestCreate
) => {
  const res = await api.post("/api/credit-requests", payload);
  return res.data;
};

// RM / Analyst: get credit requests
export const getCreditRequestsApi = async () => {
  const res = await api.get("/api/credit-requests");
  return res.data;
};

// Get by id
export const getCreditRequestByIdApi = async (id: string) => {
  const res = await api.get(`/api/credit-requests/${id}`);
  return res.data;
};

// Analyst: update status & remarks
export const updateCreditRequestApi = async (
  id: string,
  payload: CreditRequestUpdate
) => {
  const res = await api.put(`/api/credit-requests/${id}`, payload);
  return res.data;
};
