import { useState } from "react";
import { createClientApi } from "../../apis/client.api";
import type { ClientCreateRequest } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setRmActive } from "../../redux/menuSlice";

const CreateRMClients = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handle = (path: string) => dispatch(setRmActive(path));

  const [form, setForm] = useState<ClientCreateRequest>({
    companyName: "",
    industry: "",
    address: "",
    primaryContact: {
      name: "",
      email: "",
      phone: "",
    },
    annualTurnover: 0,
    documentsSubmitted: false,
  });

  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setForm({
      companyName: "",
      industry: "",
      address: "",
      primaryContact: { name: "", email: "", phone: "" },
      annualTurnover: 0,
      documentsSubmitted: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;

    if (name.startsWith("primaryContact.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        primaryContact: {
          ...prev.primaryContact,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.companyName ||
      !form.industry ||
      !form.primaryContact.email ||
      form.annualTurnover <= 0
    ) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      setLoading(true);
      const res = await createClientApi(form);

      if (!res.success) {
        toast.error(res.message || "Failed to create client");
        return;
      }

      toast.success("Client created successfully");
      navigate("/rm/clients");
      handle("/rm/clients");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Create Corporate Client</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company Name */}
        <div>
          <label
            htmlFor="companyname"
            className="block text-sm font-medium mb-1"
          >
            Company Name *
          </label>
          <input
            id="companyname"
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="ABC Textiles Ltd."
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium mb-1">
            Industry *
          </label>
          <input
            id="industry"
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Manufacturing"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Mumbai"
          />
        </div>

        {/* Primary Contact */}
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-3">Primary Contact</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="primaryContact.name"
              value={form.primaryContact.name}
              onChange={handleChange}
              placeholder="Name"
              className="border rounded-md px-3 py-2"
            />

            <input
              type="email"
              name="primaryContact.email"
              value={form.primaryContact.email}
              onChange={handleChange}
              placeholder="Email *"
              className="border rounded-md px-3 py-2"
            />

            <input
              type="text"
              name="primaryContact.phone"
              value={form.primaryContact.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Annual Turnover */}
        <div>
          <label
            htmlFor="annualturnover"
            className="block text-sm font-medium mb-1"
          >
            Annual Turnover (in Cr) *
          </label>
          <input
            id="annualturnover"
            type="number"
            name="annualTurnover"
            value={form.annualTurnover}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
            min={0}
          />
        </div>

        {/* Documents Submitted */}
        <div className="flex items-center gap-2">
          <input
            id="documentssubmitted"
            type="checkbox"
            name="documentsSubmitted"
            checked={form.documentsSubmitted}
            onChange={handleChange}
          />
          <label htmlFor="documentssubmitted" className="text-sm">
            Documents Submitted
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Client"}
          </button>

          <button
            type="reset"
            onClick={handleReset}
            className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRMClients;
