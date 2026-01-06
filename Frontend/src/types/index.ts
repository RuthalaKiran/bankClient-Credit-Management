//  AUTH TYPES

export type Role = "ADMIN" | "RM" | "ANALYST";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthData {
  token: string;
  role: Role;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

//  CLIENT TYPES

export interface PrimaryContact {
  name: string;
  email: string;
  phone: string;
}

export interface Client {
  id: string;
  companyName: string;
  industry: string;
  address: string;
  primaryContact: PrimaryContact;
  annualTurnover: number;
  documentsSubmitted: boolean;
  rmId: string;
}

export interface ClientCreateRequest {
  companyName: string;
  industry: string;
  address: string;
  primaryContact: PrimaryContact;
  annualTurnover: number;
  documentsSubmitted: boolean;
}

//  CREDIT REQUEST TYPES

export type CreditStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface CreditRequest {
  id: string;
  clientId: string;
  submittedBy: string;
  requestAmount: number;
  tenureMonths: number;
  purpose: string;
  status: CreditStatus;
  remarks: string;
  createdAt: string;
}

export interface CreditRequestCreate {
  clientId: string;
  requestAmount: number;
  tenureMonths: number;
  purpose: string;
}

export interface CreditRequestUpdate {
  status: CreditStatus;
  remarks: string;
}

//  MENU TYPES

export interface MenuState {
  adminActivePath: string;
  rmActivePath: string;
  analystActivePath: string;
}



