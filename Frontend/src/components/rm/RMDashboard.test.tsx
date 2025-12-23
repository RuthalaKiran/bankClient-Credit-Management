import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import RMDashboard from "./RMDashboard";
import { store } from "../../redux/store";
import { loginSuccess } from "../../redux/authSlice";
import * as clientApi from "../../apis/client.api";
import * as creditApi from "../../apis/credit.api";



describe("RMDashboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // set RM user in store
    store.dispatch(
      loginSuccess({
        token: "t",
        user: {
          id: "rm1",
          username: "rmuser",
          email: "rm@test.com",
          role: "RM",
          active: true,
        },
      })
    );
  });

  test("should render RM info, clients and credit requests", async () => {
    vi.spyOn(clientApi, "getMyClientsApi").mockResolvedValue({
      success: true,
      data: [
        {
          id: "c1",
          companyName: "ABC Ltd",
          industry: "IT",
          address: "Hyderabad",
          primaryContact: {
            name: "John",
            email: "john@abc.com",
            phone: "9999999999",
          },
          annualTurnover: 20,
          documentsSubmitted: true,
          rmId: "rm1",
        },
      ],
    } as any);

    vi.spyOn(creditApi, "getCreditRequestsApi").mockResolvedValue({
      success: true,
      data: [
        {
          id: "cr1",
          clientId: "c1",
          submittedBy: "rm1",
          requestAmount: 500000,
          tenureMonths: 12,
          purpose: "Working Capital",
          status: "PENDING",
          remarks: "",
          createdAt: new Date().toISOString(),
        },
      ],
    } as any);

    render(
      <Provider store={store}>
        <RMDashboard />
      </Provider>
    );

    // header
    expect(
      screen.getByText(/Welcome, rmuser/i)
    ).toBeInTheDocument();
    expect(screen.getByText("rm@test.com")).toBeInTheDocument();

    // wait for API data to render
    await waitFor(() => {
      // client row
      expect(screen.getByText("ABC Ltd")).toBeInTheDocument();
      expect(screen.getByText("IT")).toBeInTheDocument();

      // credit request row
      expect(screen.getByText("Working Capital")).toBeInTheDocument();
      expect(screen.getByText("PENDING")).toBeInTheDocument();
    });
  });
});
