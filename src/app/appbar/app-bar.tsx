import { Link } from "react-router-dom";
import AuthStatus from "../auth/auth-status";

export const AppBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Shopping Cart
        </Link>
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
