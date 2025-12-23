import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  adminActivePath: string;
  rmActivePath: string;
  analystActivePath: string;
}

const initialState: MenuState = {
  adminActivePath: localStorage.getItem("adminActivePath") || "/",
  rmActivePath: localStorage.getItem("rmActivePath") || "/",
  analystActivePath: localStorage.getItem("analystActivePath") || "/",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setAdminActive(state, action: PayloadAction<string>) {
      state.adminActivePath = action.payload;
      localStorage.setItem("adminActivePath", action.payload);
    },
    setRmActive(state, action: PayloadAction<string>) {
      state.rmActivePath = action.payload;
      localStorage.setItem("rmActivePath", action.payload);
    },
    setAnalystActive(state, action: PayloadAction<string>) {
      state.analystActivePath = action.payload;
      localStorage.setItem("analystActivePath", action.payload);
    },
    resetMenu(state) {
      state.adminActivePath = "/";
      state.rmActivePath = "/";
      state.analystActivePath = "/";
      localStorage.removeItem("adminActivePath");
      localStorage.removeItem("rmActivePath");
      localStorage.removeItem("analystActivePath");
    },
  },
});

export const {
  setAdminActive,
  setRmActive,
  setAnalystActive,
  resetMenu,
} = menuSlice.actions;

export default menuSlice.reducer;
