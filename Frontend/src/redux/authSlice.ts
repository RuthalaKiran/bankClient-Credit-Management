import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../types";

interface User {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "RM" | "ANALYST";
  active: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  role: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).role
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserFromStorage(state) {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        const user = JSON.parse(userStr);
        state.token = token;
        state.user = user;
        state.role = user.role;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
