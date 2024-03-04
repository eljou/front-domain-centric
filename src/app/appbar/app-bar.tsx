import { Link } from "react-router-dom";
import AuthStatus from "../auth/auth-status";
import { useSelectedClientApp } from "../client-apps/use-selected-client-app";

export const AppBar = () => {
  const clientApp = useSelectedClientApp();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Web
        </Link>
        {clientApp && <Link to={`/app/${clientApp.id}`}>{clientApp.name}</Link>}
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="products">Products</Link>
          </li>
          <li>
            <Link to="posts">Posts</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AuthStatus />
      </div>
    </div>
  );
};
