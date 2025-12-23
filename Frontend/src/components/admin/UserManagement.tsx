import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUserStatusApi } from "../../apis/user.api";
import type { User } from "../../types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { setAdminActive } from "../../redux/menuSlice";

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (path: string) => {
    dispatch(setAdminActive(path));
  };

  // fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data);
      } else {
        toast.error(res.message || "Failed to fetch users");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // change status
  const handleToggle = async (user: User) => {
    try {
      const res = await updateUserStatusApi(user.id, !user.active);
      if (res.success) {
        toast.success("User status updated");
        fetchUsers();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const filteredUsers = users.filter((user: User) => user?.role !== "ADMIN");

  // ✅ extracted from nested ternary
  const getRoleLabel = (role: string) => {
    if (role === "RM") return "Relationship Manager";
    if (role === "ANALYST") return "Analyst";
    return "Admin";
  };

  // extracted from nested ternary
  let tableContent;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={5} className="px-4 py-6 text-center">
          Loading...
        </td>
      </tr>
    );
  } else if (filteredUsers.length === 0) {
    tableContent = (
      <tr>
        <td colSpan={5} className="px-4 py-6 text-center">
          No users found
        </td>
      </tr>
    );
  } else {
    tableContent = (
      <>
        {filteredUsers.map((u) => (
          <tr key={u.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3">{u.username}</td>
            <td className="px-4 py-3">{u.email}</td>
            <td className="px-4 py-3">
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                {getRoleLabel(u.role)}
              </span>
            </td>

            {/* Status Toggle */}
            <td className="px-4 py-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={u.active}
                  onChange={() => handleToggle(u)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                <span className="ml-2 text-xs">
                  {u.active ? "Active" : "Inactive"}
                </span>
              </label>
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-gray-500 text-sm">
            Manage system users and their roles
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/admin/users/create");
            handle("/admin/users/create");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 text-left text-sm">
            <tr>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">{tableContent}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
