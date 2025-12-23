import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCreditRequestByIdApi } from "../../apis/credit.api";
import type { CreditRequest } from "../../types";
import { toast } from "react-toastify";

const ViewCreditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [credit, setCredit] = useState<CreditRequest | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCreditRequestByIdApi(id!);
        if (res.success) setCredit(res.data);
        else toast.error(res.message);
      } catch {
        toast.error("Failed to fetch credit request");
      }
    };
    fetch();
  }, [id]);

  if (!credit) return <p className="p-6">Loading...</p>;

  // Extracted from nested ternary 
  let statusClass =
    "bg-yellow-100 text-yellow-700";

  if (credit.status === "APPROVED") {
    statusClass = "bg-green-100 text-green-700";
  } else if (credit.status === "REJECTED") {
    statusClass = "bg-red-100 text-red-700";
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Credit Request Details
          </h2>
          <p className="text-gray-500">
            Review submitted credit request information
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-500">Client ID</p>
          <p className="font-medium text-base">
            {credit.clientId}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Submitted By (RM)</p>
          <p className="font-medium text-base">
            {credit.submittedBy}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Request Amount</p>
          <p className="font-medium text-base">
            ₹ {credit.requestAmount}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Tenure</p>
          <p className="font-medium text-base">
            {credit.tenureMonths} months
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Purpose</p>
          <p className="font-medium text-base">
            {credit.purpose}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
          >
            {credit.status}
          </span>
        </div>

        <div>
          <p className="text-gray-500">Created At</p>
          <p className="font-medium text-base">
            {new Date(
              credit.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-gray-500">Remarks</p>
          <p className="font-medium text-base">
            {credit.remarks || "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCreditRequest;
