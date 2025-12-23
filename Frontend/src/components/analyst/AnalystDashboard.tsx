import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getCreditRequestsApi } from "../../apis/credit.api";
import type { CreditRequest } from "../../types";
import { toast } from "react-toastify";

const AnalystDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await getCreditRequestsApi();
        if (res.success) setRequests(res.data);
        else toast.error(res.message);
      } catch {
        toast.error("Failed to fetch credit requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  //  Extracted from nested ternary 
  let content;

  if (loading) {
    content = <p>Loading...</p>;
  } else if (requests.length === 0) {
    content = (
      <p className="text-gray-500">No credit requests found.</p>
    );
  } else {
    content = (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left border">Client ID</th>
              {/* <th className="px-4 py-2 text-left border">RM ID</th> */}
              <th className="px-4 py-2 text-left border">Amount</th>
              <th className="px-4 py-2 text-left border">Tenure</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Created</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => {
              // ✅ Extracted from nested ternary (status badge classes)
              let statusClass =
                "bg-yellow-100 text-yellow-700";

              if (r.status === "APPROVED") {
                statusClass =
                  "bg-green-100 text-green-700";
              } else if (r.status === "REJECTED") {
                statusClass =
                  "bg-red-100 text-red-700";
              }

              return (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {r.clientId}
                  </td>
                  {/* <td className="px-4 py-2 border">
                    {r.submittedBy}
                  </td> */}
                  <td className="px-4 py-2 border">
                    ₹ {r.requestAmount}
                  </td>
                  <td className="px-4 py-2 border">
                    {r.tenureMonths} months
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(
                      r.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className=" p-6 ">
        <h2 className="text-2xl font-semibold">
          Welcome, {user?.username}
        </h2>
        <p className="text-gray-500">{user?.email}</p>
        <p className="mt-1 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          Credit Analyst
        </p>
      </div>

      {/* Credit Requests Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">
          All Credit Requests
        </h3>

        {content}
      </div>
    </div>
  );
};

export default AnalystDashboard;
