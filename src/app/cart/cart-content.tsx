import { useEffect } from "react";
import { match } from "ts-pattern";
import CartItem from "./cart-item";
import { useCart } from "./cart-context";

const CartContent = () => {
  const cart = useCart();

  useEffect(() => {
    cart.getCart();
  }, []);

  return match(cart.state)
    .with({ kind: "cart:idle" }, () => (
      <div className="flex justify-center items-center">Car is empty</div>
    ))
    .with({ kind: "cart:loading" }, () => (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity loading-lg" />
      </div>
    ))
    .with({ kind: "cart:updated" }, (st) => (
      <>
        <ul className="menu bg-base-200 rounded-box">
          {st.items.map((item) => (
            <li key={item.id}>
              <CartItem
                cartItem={item}
                add={() => cart.editQuantityCartItem(item, item.quantity + 1)}
                remove={() => cart.removeCartItem(item)}
              />
            </li>
          ))}
        </ul>
        <div className="divider" />
        <h6>
          Total Price: <b>{st.totalPrice}</b>
        </h6>
      </>
    ))
    .with({ kind: "cart:error" }, (st) => (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! {st.error}</span>
      </div>
    ))
    .exhaustive();
};

export default CartContent;
