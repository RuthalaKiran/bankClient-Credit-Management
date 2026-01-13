import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// protected route to check if user is authenticated
const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
