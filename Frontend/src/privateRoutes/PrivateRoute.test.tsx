import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { store } from "../redux/store";
import { loginSuccess, logout } from "../redux/authSlice";

describe("PrivateRoute", () => {
  const renderWithRoute = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/protected" element={<div>Protected Page</div>} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  test("should allow access when authenticated", () => {
    store.dispatch(
      loginSuccess({
        token: "token",
        user: {
          id: "1",
          username: "john",
          email: "john@test.com",
          role: "RM",
          active: true,
        },
      })
    );

    renderWithRoute();

    expect(screen.getByText("Protected Page")).toBeInTheDocument();
  });

  test("should redirect to login when not authenticated", () => {
    store.dispatch(logout());

    renderWithRoute();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
