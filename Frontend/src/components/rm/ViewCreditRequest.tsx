import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getCreditRequestByIdApi } from "../../apis/credit.api";
import type { CreditRequest } from "../../types";

const ViewRMCreditRequest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [credit, setCredit] = useState<CreditRequest | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) loadCredit();
  }, [id]);

  const loadCredit = async () => {
    try {
      setLoading(true);
      const res = await getCreditRequestByIdApi(id!);

      if (res.success) {
        setCredit(res.data);
      } else {
        toast.error(res.message || "Failed to load credit request");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch credit request"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!credit) return <p>No data found</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600";
      case "REJECTED":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Credit Request Details
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Client ID</p>
          <p className="font-medium">{credit.clientId}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Submitted By</p>
          <p className="font-medium">{credit.submittedBy}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Request Amount</p>
          <p className="font-medium">₹{credit.requestAmount}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Tenure</p>
          <p className="font-medium">
            {credit.tenureMonths} months
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500 text-sm">Purpose</p>
          <p className="font-medium">{credit.purpose}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <p className={`font-semibold ${getStatusColor(credit.status)}`}>
            {credit.status}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Remarks</p>
          <p className="font-medium">
            {credit.remarks || "-"}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500 text-sm">Created At</p>
          <p className="font-medium">
            {new Date(credit.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewRMCreditRequest;
