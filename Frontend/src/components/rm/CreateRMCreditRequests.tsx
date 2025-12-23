import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getMyClientsApi } from "../../apis/client.api";
import { createCreditRequestApi } from "../../apis/credit.api";
import type { Client, CreditRequestCreate } from "../../types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setRmActive } from "../../redux/menuSlice";

const CreateRMCreditRequests = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handle = (path: string) => dispatch(setRmActive(path));

  const [form, setForm] = useState<CreditRequestCreate>({
    clientId: "",
    requestAmount: 0,
    tenureMonths: 0,
    purpose: "",
  });

  const handleReset = () => {
    setForm({ clientId: "", requestAmount: 0, tenureMonths: 0, purpose: "" });
  };

  // 🔹 Load RM clients for dropdown
  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await getMyClientsApi();
        if (res.success) {
          setClients(res.data);
        }
      } catch {
        toast.error("Failed to load clients");
      }
    };
    loadClients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "requestAmount" || name === "tenureMonths"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.clientId ||
      !form.purpose ||
      form.requestAmount <= 0 ||
      form.tenureMonths <= 0
    ) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);
      const res = await createCreditRequestApi(form);

      if (res.success) {
        toast.success("Credit request created");
        navigate("/rm/credit-requests");
        handle("/rm/cdeirt - requests");
      } else {
        toast.error(res.message || "Failed to create request");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Credit Request</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client */}
        <div>
          <label htmlFor="client" className="block mb-1 font-medium">
            Client
          </label>
          <select
            id="client"
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="requestamount" className="block mb-1 font-medium">
            Request Amount (₹)
          </label>
          <input
            id="requestamount"
            type="number"
            name="requestAmount"
            value={form.requestAmount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter amount"
            min={0}
          />
        </div>

        {/* Tenure */}
        <div>
          <label htmlFor="tenure" className="block mb-1 font-medium">
            Tenure (months)
          </label>
          <input
            id="tenure"
            type="number"
            name="tenureMonths"
            value={form.tenureMonths}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter tenure"
          />
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block mb-1 font-medium">
            Purpose
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="Purpose of credit"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRMCreditRequests;
