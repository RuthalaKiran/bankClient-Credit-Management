import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import AnalystDashboard from "./AnalystDashboard";
import { store } from "../../redux/store";
import { loginSuccess } from "../../redux/authSlice";
import * as creditApi from "../../apis/credit.api";



describe("AnalystDashboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // set analyst user in redux
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "10",
          username: "analyst1",
          email: "analyst@test.com",
          role: "ANALYST",
          active: true,
        },
      })
    );
  });

  test("should render analyst info and credit requests", async () => {
    vi.spyOn(creditApi, "getCreditRequestsApi").mockResolvedValue({
      success: true,
      data: [
        {
          id: "c1",
          clientId: "client1",
          submittedBy: "rm1",
          requestAmount: 500000,
          tenureMonths: 12,
          purpose: "WC",
          status: "PENDING",
          remarks: "",
          createdAt: new Date().toISOString(),
        },
      ],
    } as any);

    render(
      <Provider store={store}>
        <AnalystDashboard />
      </Provider>
    );

    // header
    expect(
      screen.getByText(/Welcome, analyst1/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("analyst@test.com")
    ).toBeInTheDocument();

    // wait for table row
    await waitFor(() => {
      expect(screen.getByText("client1")).toBeInTheDocument();
      expect(screen.getByText(/500000/i)).toBeInTheDocument();
      expect(screen.getByText("PENDING")).toBeInTheDocument();
    });
  });
});
