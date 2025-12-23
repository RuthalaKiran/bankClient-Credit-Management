import { useState } from "react";
import { createUserApi } from "../../apis/user.api";
import type { Role } from "../../types";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("RM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await createUserApi({
        username,
        email,
        password,
        role,
      });

      console.log("res of create user", res);

      if (!res.success) {
        toast.error(res.message || "Failed to create user");
        return;
      }

      toast.success("User created successfully");

      // reset
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("RM");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[90%] flex items-center justify-center">
      <div className="w-[50%] mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[1px] focus:border-blue-400"
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[1px] focus:border-blue-400"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[1px] focus:border-blue-400"
              placeholder="Enter password"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[1px] focus:border-blue-400"
            >
              <option value="RM">Relationship Manager</option>
              <option value="ANALYST">Analyst</option>
              {/* <option value="ADMIN">Admin</option> */}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
