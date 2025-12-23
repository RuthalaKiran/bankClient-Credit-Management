import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { Client, CreditRequest } from "../../types";
import type { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { getMyClientsApi } from "../../apis/client.api";
import { getCreditRequestsApi } from "../../apis/credit.api";

const RMDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [clients, setClients] = useState<Client[]>([]);
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [clientsRes, requestsRes] = await Promise.all([
        getMyClientsApi(),
        getCreditRequestsApi(),
      ]);

      if (clientsRes.success) {
        setClients(clientsRes.data);
      } else {
        toast.error(clientsRes.message || "Failed to fetch clients");
      }

      if (requestsRes.success) {
        setRequests(requestsRes.data);
      } else {
        toast.error(
          requestsRes.message || "Failed to fetch credit requests"
        );
      }
    } catch (err) {
      console.log("failed in rm dashboard", err);
      toast.error("Failed to load RM dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.username}
        </h1>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {loading && <p>Loading...</p>}

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">My Clients</h2>

        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Company</th>
              <th className="px-3 py-2 text-left">Industry</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Contact</th>
              <th className="px-3 py-2 text-left">Turnover (Cr)</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2">{c.companyName}</td>
                <td className="px-3 py-2">{c.industry}</td>
                <td className="px-3 py-2">{c.address}</td>
                <td className="px-3 py-2">
                  {c.primaryContact.name}
                </td>
                <td className="px-3 py-2">
                  {c.annualTurnover}
                </td>
              </tr>
            ))}

            {clients.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-4 text-center text-gray-500"
                >
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Credit Requests Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          My Credit Requests
        </h2>

        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Client ID</th>
              <th className="px-3 py-2 text-left">Amount</th>
              <th className="px-3 py-2 text-left">Tenure</th>
              <th className="px-3 py-2 text-left">Purpose</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => {
              // Extracted from nested ternary
              let statusClass =
                "bg-red-100 text-red-700";

              if (r.status === "PENDING") {
                statusClass =
                  "bg-yellow-100 text-yellow-700";
              } else if (r.status === "APPROVED") {
                statusClass =
                  "bg-green-100 text-green-700";
              }

              return (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">
                    {r.clientId}
                  </td>
                  <td className="px-3 py-2">
                    ₹ {r.requestAmount}
                  </td>
                  <td className="px-3 py-2">
                    {r.tenureMonths} months
                  </td>
                  <td className="px-3 py-2">
                    {r.purpose}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${statusClass}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {requests.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-4 text-center text-gray-500"
                >
                  No credit requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RMDashboard;
