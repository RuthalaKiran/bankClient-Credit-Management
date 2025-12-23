import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { setRmActive } from "../../redux/menuSlice";

const RMMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handle = (path: string) => dispatch(setRmActive(path));

  const active = useSelector((s:RootState) => s.menu.rmActivePath);

  return (
    <>
      <div>
        <p className="mt-4 mb-1 text-sm text-gray-400">Administration</p>
        <Link
          to="/"
          className={`${active === '/'? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"}  block p-2 rounded-sm`}
          onClick={() => handle("/")}
        >
          Dashboard
        </Link>
      </div>

      <div>
        <p className="mt-4 mb-1 text-sm text-gray-400">Clients</p>
        <Link
          to="/rm/clients/create"
          className={`${active === '/rm/clients/create'? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"}  block p-2 rounded-sm`}
          onClick={() => handle("/rm/clients/create")}
        >
          Create Client
        </Link>
        <Link
          to="/rm/clients"
          className={`${active === '/rm/clients'? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"}  block p-2 rounded-sm`}
          onClick={() => handle("/rm/clients")}
        >
          Client List
        </Link>
      </div>

      <div>
        <p className="mt-4 mb-1 text-sm text-gray-400">Credit Requests</p>
        <Link
          to="/rm/credit-requests/create"
          className={`${active === '/rm/credit-requests/create'? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"}  block p-2 rounded-sm`}
          onClick={() => handle("/rm/credit-requests/create")}
        >
          Create Request
        </Link>
        <Link
          to="/rm/credit-requests"
          className={`${active === '/rm/credit-requests'? "bg-blue-950 text-blue-500" : "hover:bg-gray-700"}  block p-2 rounded-sm`}
          onClick={() => handle("/rm/credit-requests")}
        >
          My Requests
        </Link>
      </div>
    </>
  );
};

export default RMMenu;
