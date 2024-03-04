import { PropsWithChildren, useMemo } from "react";
import { CartPloc } from "../../core/cart/presentation/cart-ploc";
import { CartState } from "../../core/cart/presentation/cart-state";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { createContext } from "../shared/context";
import { usePlocState } from "../shared/use-ploc-state";

type CartContext = Omit<
  CartPloc,
  "state" | "changeState" | "subscribe" | "unsubscribe"
> & { state: CartState };

const [CartCtx, useContext] = createContext<CartContext>();

export function CartProvider({ children }: PropsWithChildren) {
  const cartPloc = useMemo(() => dependenciesLocator.provideCartPloc(), []);
  const {
    closeCart,
    openCart,
    addProductToCart,
    getCart,
    removeCartItem,
    editQuantityCartItem,
  } = cartPloc;
  const state = usePlocState(cartPloc);

  return (
    <CartCtx.Provider
      value={{
        state,
        addProductToCart,
        closeCart,
        openCart,
        removeCartItem,
        editQuantityCartItem,
        getCart,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export { CartCtx, useContext as useCart };
