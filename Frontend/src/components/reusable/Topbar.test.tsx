import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Topbar from "./Topbar";
import { store } from "../../redux/store";
import { loginSuccess, logout } from "../../redux/authSlice";

// mock navigate
vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Topbar", () => {
  const renderComp = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Topbar />
        </MemoryRouter>
      </Provider>
    );

  beforeEach(() => {
    store.dispatch(logout());
  });

  test("should render topbar with user info when logged in", () => {
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "1",
          username: "john",
          email: "john@test.com",
          role: "RM",
          active: true,
        },
      })
    );

    renderComp();

    expect(
      screen.getByText("Client & Credit Management")
    ).toBeInTheDocument();

    expect(screen.getByText("john")).toBeInTheDocument();
    expect(screen.getByText("Relationship Manager")).toBeInTheDocument();
  });

});
