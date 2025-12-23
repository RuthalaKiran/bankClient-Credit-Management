import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import AdminDashboard from "../admin/AdminDashboard";
import RMDashboard from "../rm/RMDashboard";
import AnalystDashboard from "../analyst/AnalystDashboard";

const RoleDashboard = () => {
  const role = useSelector((s:RootState) => s.auth.role);

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "RM") return <RMDashboard />;
  if (role === "ANALYST") return <AnalystDashboard />;

  return null;
};

export default RoleDashboard;
