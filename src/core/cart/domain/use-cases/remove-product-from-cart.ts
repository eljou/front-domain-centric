import { pipe } from "ramda";
import { Task } from "data.task.ts";
import { DataError } from "../../../shared/domain/data-error";
import { CartRepository } from "../cart-repository";
import { Cart } from "../cart";

export type RemoveProductFromCartUseCase = ReturnType<
  typeof makeRemoveProductFromCartUseCase
>;

export function makeRemoveProductFromCartUseCase(
  cartRepository: CartRepository
) {
  return (itemId: string): Task<DataError, Cart> =>
    cartRepository
      .get()
      .chain(pipe(Cart.removeItem(itemId), Task.tap(cartRepository.save)));
}
