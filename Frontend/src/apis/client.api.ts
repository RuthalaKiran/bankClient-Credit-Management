import type { ClientCreateRequest } from "../types";
import api from "./axios";

//  create client
export const createClientApi = async (payload: ClientCreateRequest) => {
  const res = await api.post("/api/rm/clients", payload);
  return res.data;
};


// Get RM's clients with optional filters
export const getMyClientsApi = async (
  name?: string,
  industry?: string
) => {
  const res = await api.get("/api/clients", {
    params: {
      name: name || undefined,
      industry: industry || undefined,
    },
  });
  return res.data;
};

// Get client by ID
export const getClientByIdApi = async (id: string) => {
  const res = await api.get(`/api/clients/${id}`);
  return res.data;
};

// Update client by ID
export const updateClientApi = async (
  id: string,
  payload: ClientCreateRequest
) => {
  const res = await api.put(`/api/clients/${id}`, payload);
  return res.data;
};