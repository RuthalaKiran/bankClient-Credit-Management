import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import Login from "./Login";
import { store } from "../../redux/store";
import * as authApi from "../../apis/auth.api";

// mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login", () => {
  const renderLogin = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  //  render all elements
  test("should render login form", () => {
    renderLogin();

    expect(screen.getByText(/Corporate Bank/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your password/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  //success
  test("should login successfully and navigate", async () => {
    vi.spyOn(authApi, "loginApi").mockResolvedValue({
      success: true,
      message: "ok",
      data: {
        token: "token",
        user: {
          id: "1",
          username: "john",
          email: "john@test.com",
          role: "RM",
          active: true,
        },
      },
    } as any);

    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "john@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "123456");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(authApi.loginApi).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  // failed response
  test("should not navigate when login fails", async () => {
    vi.spyOn(authApi, "loginApi").mockResolvedValue({
      success: false,
      message: "Invalid",
      data: null,
    } as any);

    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "wrong@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "wrong");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(authApi.loginApi).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // api throws
  test("should not navigate when api throws error", async () => {
    vi.spyOn(authApi, "loginApi").mockRejectedValue(new Error("error"));

    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), "john@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "123456");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(authApi.loginApi).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
