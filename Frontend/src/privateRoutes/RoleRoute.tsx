import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../redux/store";


const RoleRoute = ({ role }: { role: "ADMIN" | "RM" | "ANALYST" }) => {
  const userRole = useSelector((s:RootState) => s.auth.role);
  return userRole === role ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleRoute;
