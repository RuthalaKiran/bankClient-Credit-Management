import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import RoleDashboard from "./RoleDashboard";
import { store } from "../../redux/store";
import { loginSuccess, logout } from "../../redux/authSlice";

// mock dashboards urls
vi.mock("../admin/AdminDashboard", () => ({
  default: () => <div>Admin Dashboard</div>,
}));

vi.mock("../rm/RMDashboard", () => ({
  default: () => <div>RM Dashboard</div>,
}));

vi.mock("../analyst/AnalystDashboard", () => ({
  default: () => <div>Analyst Dashboard</div>,
}));

describe("RoleDashboard", () => {
  const renderComp = () =>
    render(
      <Provider store={store}>
        <RoleDashboard />
      </Provider>
    );

  beforeEach(() => {
    store.dispatch(logout());
  });

  test("should render AdminDashboard when role is ADMIN", () => {
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

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  test("should render RMDashboard when role is RM", () => {
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

    expect(screen.getByText("RM Dashboard")).toBeInTheDocument();
  });

  test("should render AnalystDashboard when role is ANALYST", () => {
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

    expect(screen.getByText("Analyst Dashboard")).toBeInTheDocument();
  });
});
