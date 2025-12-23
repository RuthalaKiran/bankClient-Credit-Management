import { useState } from "react";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../redux/authSlice";
import { resetMenu } from "../../redux/menuSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((s: RootState) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetMenu());
    navigate("/login");
  };

  if (!user) return null;

  // ✅ Extracted from nested ternary
  const getRoleLabel = (role: string) => {
    if (role === "RM") return "Relationship Manager";
    if (role === "ANALYST") return "Analyst";
    return "Admin";
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left Title */}
      <h1 className="text-lg font-semibold text-gray-800">
        Client & Credit Management
      </h1>

      {/* Right User Section */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 py-1 px-3 rounded-md duration-300"
        >
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full text-lg bg-blue-200 flex items-center justify-center text-blue-600 font-semibold">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          {/* Name + Role */}
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user.username}
            </p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {getRoleLabel(user.role)}
            </span>
          </div>

          <FaChevronDown className="text-gray-500 text-xs" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
            <div className="px-4 py-3 border-b hover:bg-blue-50">
              <p className="text-sm font-medium text-gray-800">
                {user.username}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
