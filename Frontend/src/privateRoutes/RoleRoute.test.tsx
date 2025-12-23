import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RoleRoute from "./RoleRoute";
import { store } from "../redux/store";
import { loginSuccess } from "../redux/authSlice";

describe("RoleRoute", () => {
  const renderWithRoleRoute = (role: "ADMIN" | "RM" | "ANALYST") =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/role"]}>
          <Routes>
            <Route element={<RoleRoute role={role} />}>
              <Route path="/role" element={<div>Role Page</div>} />
            </Route>
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  test("should allow access when role matches", () => {
    store.dispatch(
      loginSuccess({
        token: "token",
        user: {
          id: "1",
          username: "admin",
          email: "admin@test.com",
          role: "ADMIN",
          active: true,
        },
      })
    );

    renderWithRoleRoute("ADMIN");

    expect(screen.getByText("Role Page")).toBeInTheDocument();
  });

  test("should redirect when role does not match", () => {
    store.dispatch(
      loginSuccess({
        token: "token",
        user: {
          id: "2",
          username: "rm",
          email: "rm@test.com",
          role: "RM",
          active: true,
        },
      })
    );

    renderWithRoleRoute("ADMIN");

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
