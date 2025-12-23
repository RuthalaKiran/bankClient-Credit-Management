import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import { store } from "../../redux/store";
import { loginSuccess } from "../../redux/authSlice";
import * as userApi from "../../apis/user.api";



describe("AdminDashboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // set admin in store
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
  });

  test("should render admin info and users list", async () => {
    vi.spyOn(userApi, "getAllUsers").mockResolvedValue({
      success: true,
      data: [
        {
          id: "1",
          username: "admin",
          email: "admin@test.com",
          role: "ADMIN",
          active: true,
        },
        {
          id: "2",
          username: "rm1",
          email: "rm1@test.com",
          role: "RM",
          active: true,
        },
        {
          id: "3",
          username: "analyst1",
          email: "analyst@test.com",
          role: "ANALYST",
          active: false,
        },
      ],
    } as any);

    render(
      <Provider store={store}>
        <AdminDashboard />
      </Provider>
    );

    // welcome text
    expect(screen.getByText("Welcome, Admin")).toBeInTheDocument();
    expect(screen.getByText("admin@test.com")).toBeInTheDocument();

    // wait for users to render (admin should be filtered out)
    await waitFor(() => {
      expect(screen.getByText("rm1")).toBeInTheDocument();
      expect(screen.getByText("analyst1")).toBeInTheDocument();
    });

    // admin user should NOT be in table
    expect(screen.queryByText("admin")).not.toBeInTheDocument();
  });
});
