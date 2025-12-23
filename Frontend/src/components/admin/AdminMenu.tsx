import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setAdminActive } from "../../redux/menuSlice";

const AdminMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useSelector((s: RootState) => s.menu.adminActivePath);

  const handle = (path: string) => {
    dispatch(setAdminActive(path));
  };

  return (
    <div>
      <div>
        <p className="mt-4 mb-1 text-sm text-gray-400">Administration</p>
        <Link
          to="/"
          className={`${
            active === "/" ? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"
          }  block p-2 rounded-sm`}
          onClick={() => handle("/")}
        >
          Dashboard
        </Link>
      </div>

      <div>
        <p className="mt-4 mb-1 text-xs text-gray-400">Administration</p>
        <Link
          to="/admin/users/create"
          className={`${
            active === "/admin/users/create"
              ? "bg-blue-950 text-blue-500"
              : "hover:bg-gray-700"
          }  block p-2 rounded-sm`}
          onClick={() => handle("/admin/users/create")}
        >
          Create User
        </Link>
        <Link
          to="/admin/users"
          className={`${
            active === "/admin/users"
              ? "bg-blue-950 text-blue-500"
              : "hover:bg-gray-700"
          }  block p-2 rounded-sm`}
          onClick={() => handle("/admin/users")}
        >
          User Management
        </Link>
      </div>

      {/* <div>
          <p className="mt-4 mb-1 text-xs text-gray-400">Read Only</p>
          <Link
            // to="/admin/clients"
            to="#"
            className="hover:bg-gray-700 block p-2 rounded-sm"
            onClick={() => handle("/admin/clients")}
          >
            Clients
          </Link>
          <Link
            // to="/admin/credit-requests"
            to="#"
            className="hover:bg-gray-700 block p-2 rounded-sm"
            onClick={() => handle("/admin/credit-requests")}
          >
            Credit Requests
          </Link>
        </div> */}
    </div>
  );
};

export default AdminMenu;
