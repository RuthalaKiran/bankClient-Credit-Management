import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import { getCreditRequestsApi } from "../../apis/credit.api";
import type { CreditRequest } from "../../types";
import { FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setRmActive } from "../../redux/menuSlice";

const RMCreditRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

  const handle = (path: string) => dispatch(setRmActive(path));

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await getCreditRequestsApi();
      if (res.success) {
        setRequests(res.data);
      } else {
        toast.error(res.message || "Failed to fetch credit requests");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-semibold">Credit Requests</h2>
          <p className="text-gray-500">
            View and manage your credit requests
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/rm/credit-requests/create")
            handle("/rm/credit-requests/create")
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Request
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Client ID</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Tenure</th>
                <th className="px-4 py-2 text-left">Purpose</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    No credit requests found
                  </td>
                </tr>
              ) : (
                requests.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-2">{r.clientId}</td>
                    <td className="px-4 py-2">₹{r.requestAmount}</td>
                    <td className="px-4 py-2">
                      {r.tenureMonths} months
                    </td>
                    <td className="px-4 py-2">{r.purpose}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex  gap-3">
                      <button
                        onClick={() =>
                          navigate(`/rm/credit-requests/${r.id}`)
                        }
                        title="View"
                      >
                        <FiEye />
                      </button>

                      {/* <button
                        disabled
                        className="text-gray-400 cursor-not-allowed"
                        title="Edit (disabled)"
                      >
                        <FiEdit />
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RMCreditRequests;
