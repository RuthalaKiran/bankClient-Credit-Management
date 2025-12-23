import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit } from "react-icons/fi";
import { getMyClientsApi } from "../../apis/client.api";
import type { Client } from "../../types";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setRmActive } from "../../redux/menuSlice";

const RMClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handle = (path: string) => dispatch(setRmActive(path));

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await getMyClientsApi(name, industry);
      if (res.success) setClients(res.data);
      else toast.error(res.message || "Failed to fetch clients");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to fetch clients"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  //  Extracted from nested ternary
  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={6} className="px-4 py-6 text-center">
          Loading...
        </td>
      </tr>
    );
  } else if (clients.length === 0) {
    tableContent = (
      <tr>
        <td colSpan={6} className="px-4 py-6 text-center">
          No clients found
        </td>
      </tr>
    );
  } else {
    tableContent = (
      <>
        {clients.map((c) => {
          // ✅ Extracted from ternary (documents status)
          let docClass =
            "bg-yellow-100 text-yellow-700";
          let docLabel = "Pending";

          if (c.documentsSubmitted) {
            docClass =
              "bg-green-100 text-green-700";
            docLabel = "Submitted";
          }

          return (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">
                {c.companyName}
              </td>
              <td className="px-4 py-2">
                {c.industry}
              </td>
              <td className="px-4 py-2">
                {c.primaryContact.name}
              </td>
              <td className="px-4 py-2">
                {c.annualTurnover}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${docClass}`}
                >
                  {docLabel}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/rm/clients/${c.id}`)
                  }
                >
                  <FiEye />
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/rm/clients/${c.id}/edit`
                    )
                  }
                >
                  <FiEdit />
                </button>
              </td>
            </tr>
          );
        })}
      </>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Clients
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your client portfolio
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/rm/clients/create");
            handle("/rm/clients/create");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by company name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-md w-64"
        />
        <input
          type="text"
          placeholder="Industry..."
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border px-3 py-2 rounded-md w-48"
        />
        <button
          onClick={fetchClients}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">
                Company
              </th>
              <th className="px-4 py-3 text-left">
                Industry
              </th>
              <th className="px-4 py-3 text-left">
                Contact
              </th>
              <th className="px-4 py-3 text-left">
                Turnover (Cr)
              </th>
              <th className="px-4 py-3 text-left">
                Docs
              </th>
              <th className="px-4 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </div>
  );
};

export default RMClients;
