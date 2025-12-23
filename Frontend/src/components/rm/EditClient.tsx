import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientByIdApi, updateClientApi } from "../../apis/client.api";
import type { ClientCreateRequest } from "../../types";
import { toast } from "react-toastify";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<ClientCreateRequest | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getClientByIdApi(id!);
        if (res.success) {
          const c = res.data;
          setForm({
            companyName: c.companyName,
            industry: c.industry,
            address: c.address,
            primaryContact: c.primaryContact,
            annualTurnover: c.annualTurnover,
            documentsSubmitted: c.documentsSubmitted,
          });
        }
      } catch {
        toast.error("Failed to load client");
      }
    };
    fetch();
  }, [id]);

  if (!form) return <p className="p-6">Loading...</p>;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("primaryContact.")) {
      const key = name.split(".")[1];
      setForm((p) => ({
        ...p!,
        primaryContact: { ...p!.primaryContact, [key]: value },
      }));
    } else {
      setForm((p) => ({
        ...p!,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await updateClientApi(id!, form);
      if (res.success) {
        toast.success("Client updated");
        navigate("/rm/clients");
      } else toast.error(res.message);
    } catch {
      toast.error("Failed to update client");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Client</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />
        <input
          name="industry"
          value={form.industry}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />

        <input
          name="primaryContact.name"
          value={form.primaryContact.name}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />
        <input
          name="primaryContact.email"
          value={form.primaryContact.email}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />
        <input
          name="primaryContact.phone"
          value={form.primaryContact.phone}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />

        <input
          type="number"
          name="annualTurnover"
          value={form.annualTurnover}
          onChange={handleChange}
          className="border w-full px-3 py-2"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="documentsSubmitted"
            checked={form.documentsSubmitted}
            onChange={handleChange}
          />
          <span>Documents Submitted</span>
        </label>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Update Client
        </button>
      </form>
    </div>
  );
};

export default EditClient;
