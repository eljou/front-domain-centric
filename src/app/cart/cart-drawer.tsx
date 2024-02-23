import { PropsWithChildren } from "react";
import CartContent from "./cart-content";
import { useCart } from "./cart-context";
import { useAuth } from "../auth/auth-provider";

const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const cart = useCart();
  const auth = useAuth();

  return (
    <div className="drawer drawer-end">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={cart.state.open}
        readOnly
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side z-10">
        <label
          onClick={() => cart.closeCart()}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-96 min-h-full bg-base-200 text-base-content">
          <div className="flex space-x-48">
            <button
              className="btn btn-circle mb-3"
              onClick={() => cart.closeCart()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <span className="text-xl pt-3">
              {auth.state.kind == "auth:in" && auth.state.username}'s cart
            </span>
          </div>

          <CartContent />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
