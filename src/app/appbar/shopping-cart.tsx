import { useEffect } from "react";
import { match } from "ts-pattern";
import { useCart } from "../cart/cart-context";

export default function ShoppingCart() {
  const cart = useCart();

  useEffect(() => {
    cart.getCart();
  }, []);

  return (
    <div className="flex-none z-[2]">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
          onClick={() => cart.openCart()}
        >
          <div className="indicator z-[3]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {match(cart.state)
                .with({ kind: "cart:idle" }, () => 0)
                .with({ kind: "cart:error" }, () => (
                  <div className="badge badge-error gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-4 h-4 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                ))
                .with({ kind: "cart:loading" }, () => (
                  <span className="loading loading-ring loading-sm"></span>
                ))
                .with({ kind: "cart:updated" }, (st) => st.totalItems)
                .exhaustive()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
