import { useEffect, useState } from "react";
import { getAllUsers } from "../../apis/user.api";
import type { User } from "../../types";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const AdminDashboard = () => {
  const { user } = useSelector((s:RootState) => s.auth);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();

      if (!res.success) {
        toast.error(res.message || "Failed to fetch users");
        return;
      }

      setUsers(res.data || []);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Something went wrong try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const filteredUsers = users.filter((user:User)=>user?.role !== "ADMIN");

  console.log(filteredUsers)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, Admin
        </h2>
        <p className="text-gray-500">
          {user?.email}
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            All Users
          </h3>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-3">
                        {u.username}
                      </td>
                      <td className="px-6 py-3">
                        {u.email}
                      </td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {u.active ? (
                          <span className="text-green-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
