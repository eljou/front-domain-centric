import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";
import ShoppingCart from "../appbar/shopping-cart";

export default function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-3">
      {auth.state.kind == "auth:in" ? (
        <div className="flex">
          <ShoppingCart />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">{auth.state.username}</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    auth.logout().then(() => navigate("/"));
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="login">Login</Link>
      )}
    </div>
  );
}
