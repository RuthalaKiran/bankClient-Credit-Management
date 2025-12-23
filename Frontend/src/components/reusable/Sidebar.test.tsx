import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import Sidebar from "./Sidebar";
import { store } from "../../redux/store";
import { loginSuccess, logout } from "../../redux/authSlice";

// mock menus
vi.mock("../admin/AdminMenu", () => ({
  default: () => <div>Admin Menu</div>,
}));
vi.mock("../rm/RMMenu", () => ({
  default: () => <div>RM Menu</div>,
}));
vi.mock("../analyst/AnalystMenu", () => ({
  default: () => <div>Analyst Menu</div>,
}));

describe("Sidebar", () => {
  const renderComp = () =>
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

  beforeEach(() => {
    store.dispatch(logout());
  });

  test("should render Admin menu when role is ADMIN", () => {
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "1",
          username: "admin",
          email: "admin@test.com",
          role: "ADMIN",
          active: true,
        },
      })
    );

    renderComp();

    expect(screen.getByText("Admin Menu")).toBeInTheDocument();
    expect(screen.getByText("Corporate Bank")).toBeInTheDocument();
  });

  test("should render RM menu when role is RM", () => {
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "2",
          username: "rm",
          email: "rm@test.com",
          role: "RM",
          active: true,
        },
      })
    );

    renderComp();

    expect(screen.getByText("RM Menu")).toBeInTheDocument();
  });

  test("should render Analyst menu when role is ANALYST", () => {
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "3",
          username: "analyst",
          email: "analyst@test.com",
          role: "ANALYST",
          active: true,
        },
      })
    );

    renderComp();

    expect(screen.getByText("Analyst Menu")).toBeInTheDocument();
  });
});
