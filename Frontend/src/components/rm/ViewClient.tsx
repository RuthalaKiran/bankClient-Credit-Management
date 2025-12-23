import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientByIdApi } from "../../apis/client.api";
import type { Client } from "../../types";
import { toast } from "react-toastify";

const ViewClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientByIdApi(id!);
        if (res.success) setClient(res.data);
        else toast.error(res.message);
      } catch {
        toast.error("Failed to fetch client");
      }
    };
    fetch();
  }, [id]);

  if (!client) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Client Details</h2>
          <p className="text-gray-500">
            Complete overview of the client profile
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
          <p className="text-gray-500">Company Name</p>
          <p className="font-medium text-base">
            {client.companyName}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Industry</p>
          <p className="font-medium text-base">
            {client.industry}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p className="font-medium text-base">
            {client.address}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Annual Turnover</p>
          <p className="font-medium text-base">
            ₹ {client.annualTurnover.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Documents</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
              client.documentsSubmitted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {client.documentsSubmitted ? "Submitted" : "Pending"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Primary Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Primary Contact
        </h3>

        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium text-base">
              {client.primaryContact.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-base">
              {client.primaryContact.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium text-base">
              {client.primaryContact.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;
