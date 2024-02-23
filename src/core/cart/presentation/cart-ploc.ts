import { pipe } from "ramda";
import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { Ploc, makePloc } from "../../shared/presentation/ploc";
import { Product } from "../../product/domain/product";
import { Cart } from "../domain/cart";
import { AddProductToCartUseCase } from "../domain/use-cases/add-product-to-cart";
import { EditQuantityOfCartItemUseCase } from "../domain/use-cases/edit-quantity-of-cart-item";
import { GetCartUseCase } from "../domain/use-cases/get-cart";
import { RemoveProductFromCartUseCase } from "../domain/use-cases/remove-product-from-cart";
import { CartItemState, CartState, cartInitialState } from "./cart-state";

export type CartPloc = Ploc<CartState> & {
  closeCart: () => void;
  openCart: () => void;
  getCart: () => void;
  removeCartItem: (item: CartItemState) => void;
  editQuantityCartItem: (item: CartItemState, quantity: number) => void;
  addProductToCart: (product: Product) => void;
};

export function makeCartPloc(
  getCartUseCase: GetCartUseCase,
  addProductToCartUseCase: AddProductToCartUseCase,
  removeItemFromCartUseCase: RemoveProductFromCartUseCase,
  editQuantityOfCartItemUseCase: EditQuantityOfCartItemUseCase
): CartPloc {
  const ploc = makePloc(cartInitialState);

  const handleError = (error: DataError): CartState => {
    switch (error.kind) {
      case "UnexpectedError": {
        return {
          open: ploc.state().open,
          kind: "cart:error",
          error: "Sorry, an error has ocurred. Please try later again",
        };
      }
    }
  };

  const mapToUpdatedState = (cart: Cart): CartState => {
    const formatOptions = { style: "currency", currency: "EUR" };

    return {
      kind: "cart:updated",
      open: ploc.state().open,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice.toLocaleString("es-ES", formatOptions),
      items: cart.items.map((cartItem) => ({
        ...cartItem,
        price: cartItem.price.toLocaleString("es-ES", formatOptions),
      })),
    };
  };

  // getCartUseCase().fork(
  //   pipe(handleError, ploc.changeState),
  //   pipe(mapToUpdatedState, ploc.changeState)
  // );

  return {
    ...ploc,

    closeCart: () => ploc.changeState({ ...ploc.state(), open: false }),

    openCart: () => ploc.changeState({ ...ploc.state(), open: true }),

    getCart: () =>
      Task.of<DataError, void>(
        ploc.changeState({ kind: "cart:loading", open: ploc.state().open })
      )
        .chain(getCartUseCase)
        .fork(
          pipe(handleError, ploc.changeState),
          pipe(mapToUpdatedState, ploc.changeState)
        ),

    removeCartItem: (item) =>
      Task.of<DataError, void>(
        ploc.changeState({ kind: "cart:loading", open: ploc.state().open })
      )
        .chain(() => removeItemFromCartUseCase(item.id))
        .fork(
          pipe(handleError, ploc.changeState),
          pipe(mapToUpdatedState, ploc.changeState)
        ),

    editQuantityCartItem: (item, quantity) =>
      Task.of<DataError, void>(
        ploc.changeState({ kind: "cart:loading", open: ploc.state().open })
      )
        .chain(() => editQuantityOfCartItemUseCase(item.id, quantity))
        .fork(
          pipe(handleError, ploc.changeState),
          pipe(mapToUpdatedState, ploc.changeState)
        ),

    addProductToCart: (product) =>
      Task.of<DataError, void>(
        ploc.changeState({ kind: "cart:loading", open: ploc.state().open })
      )
        .chain(() => addProductToCartUseCase(product))
        .fork(
          pipe(handleError, ploc.changeState),
          pipe(mapToUpdatedState, ploc.changeState)
        ),
  };
}
