import "./App.css";
import { Route, Routes } from "react-router-dom";
import RoleRoute from "./privateRoutes/RoleRoute";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import MainLayout from "./components/reusable/MainLayout";
import Login from "./components/auth/Login";
import RoleDashboard from "./components/reusable/RoleDashboard";
import UserManagement from "./components/admin/UserManagement";
import { ToastContainer } from "react-toastify";
import RMClients from "./components/rm/RMClients";
import CreateRMClients from "./components/rm/CreateRMClients";
import RMCreditRequests from "./components/rm/RMCreditRequests";
import CreateRMCreditRequests from "./components/rm/CreateRMCreditRequests";
import CreditReview from "./components/analyst/CreditReview";
import CreateUser from "./components/admin/CreateUser";
import ViewClient from "./components/rm/ViewClient";
import EditClient from "./components/rm/EditClient";
import ViewRMCreditRequest from "./components/rm/ViewCreditRequest";
import ViewCreditRequest from "./components/analyst/ViewCreditRequest";

function App() {
  return (
    <div>
      <ToastContainer />{" "}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* main private route */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RoleDashboard />} />

            {/* role route for ADMIN */}
            <Route element={<RoleRoute role="ADMIN" />}>
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/create" element={<CreateUser />} />
            </Route>

            {/* role route for RM */}
            <Route element={<RoleRoute role="RM" />}>
              <Route path="/rm/clients" element={<RMClients />} />
              <Route path="/rm/clients/create" element={<CreateRMClients />} />
              <Route path="/rm/clients/:id" element={<ViewClient />} />
              <Route path="/rm/clients/:id/edit" element={<EditClient />} />
              <Route
                path="/rm/credit-requests"
                element={<RMCreditRequests />}
              />
              <Route
                path="/rm/credit-requests/create"
                element={<CreateRMCreditRequests />}
              />
              <Route
                path="/rm/credit-requests/:id"
                element={<ViewRMCreditRequest />}
              />
            </Route>

            {/* role route for ANALYST */}
            <Route element={<RoleRoute role="ANALYST" />}>
              <Route path="/analyst/credit-review" element={<CreditReview />} />
              <Route
                path="/analyst/credit-requests/:id"
                element={<ViewCreditRequest />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
