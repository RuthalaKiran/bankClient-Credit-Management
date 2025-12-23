import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { setAnalystActive } from "../../redux/menuSlice";

const AnalystMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useSelector((s: RootState) => s.menu.analystActivePath);

  const handle = (path: string) => dispatch(setAnalystActive(path));

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
        <p className="mt-4 mb-1 text-xs text-gray-400">Credit Review</p>
        <Link
          to="/analyst/credit-review"
          className={`${
            active === "/analyst/credit-review"
              ? "bg-blue-950 text-blue-500"
              : "hover:bg-gray-700"
          }  block p-2 rounded-sm`}
          onClick={() => handle("/analyst/credit-review")}
        >
          All Credit Requests
        </Link>
      </div>
    </div>
  );
};

export default AnalystMenu;
