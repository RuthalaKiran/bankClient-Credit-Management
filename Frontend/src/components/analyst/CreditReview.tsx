import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCreditRequestsApi,
  updateCreditRequestApi,
} from "../../apis/credit.api";
import type { CreditRequest, CreditStatus } from "../../types";
import { toast } from "react-toastify";
import { FaEye, FaEdit } from "react-icons/fa";

const CreditReview = () => {
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<CreditRequest | null>(null);
  const [status, setStatus] = useState<CreditStatus>("PENDING");
  const [remarks, setRemarks] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const openUpdate = (req: CreditRequest) => {
    setSelected(req);
    setStatus(req.status);
    setRemarks(req.remarks || "");
  };

  const handleUpdate = async () => {
    if (!selected) return;
    if (!status && remarks === "") return;

    try {
      const res = await updateCreditRequestApi(selected.id, {
        status,
        remarks,
      });

      if (res.success) {
        toast.success("Credit request updated");
        setSelected(null);
        fetchRequests();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  // Extracted from nested ternary 
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
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-3 py-2">Client</th>
              {/* <th className="border px-3 py-2">RM</th> */}
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Tenure</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => {
              //  Extracted from nested ternary (status badge)
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
                  <td className="border px-3 py-2">
                    {r.clientId}
                  </td>
                  {/* <td className="border px-3 py-2">
                    {r.submittedBy}
                  </td> */}
                  <td className="border px-3 py-2">
                    ₹ {r.requestAmount}
                  </td>
                  <td className="border px-3 py-2">
                    {r.tenureMonths} months
                  </td>
                  <td className="border px-3 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusClass}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2 flex gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/analyst/credit-requests/${r.id}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openUpdate(r)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaEdit />
                    </button>
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
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Credit Review</h2>

      {content}

      {/* Update Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">
              Update Credit Request
            </h3>

            <div>
              <label htmlFor="status" className="text-sm">
                Status
              </label>
              <select
                id="status"
                value={status}
                required
                onChange={(e) =>
                  setStatus(e.target.value as CreditStatus)
                }
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label htmlFor="remarks" className="text-sm">
                Remarks
              </label>
              <textarea
                id="remarks"
                value={remarks}
                required
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditReview;
