import { useSelector } from "react-redux";
import AdminMenu from "../admin/AdminMenu";
import AnalystMenu from "../analyst/AnalystMenu";
import RMMenu from "../rm/RMMenu";
import type { RootState } from "../../redux/store";
import { CiBank } from "react-icons/ci";

const Sidebar = () => {
  const role = useSelector((s: RootState) => s.auth.role);

  return (
    <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">
      <div className=" flex items-center justify-center gap-3 mb-6 text-center">
        <CiBank size={40} className="text-gray-300" />
       <div className="flex flex-col items-start justify-center">
         <p className="text-gray-100">Corporate Bank</p>
        <p className="text-gray-400">Credit Management</p>
       </div>
      </div>

      <nav className="flex-1 space-y-2">
        {role === "ADMIN" && <AdminMenu />}
        {role === "RM" && <RMMenu />}
        {role === "ANALYST" && <AnalystMenu />}
      </nav>

      <div className="text-xs text-slate-400 text-center mt-4">
        © 2025 Corporate Bank
      </div>
    </aside>
  );
};

export default Sidebar;
