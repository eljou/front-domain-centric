import { pipe } from "ramda";
import { Task } from "data.task.ts";
import { DataError } from "../../../shared/domain/data-error";
import { CartRepository } from "../cart-repository";
import { Cart } from "../cart";

export type EditQuantityOfCartItemUseCase = ReturnType<
  typeof makeEditQuantityOfCartItemUseCase
>;

export function makeEditQuantityOfCartItemUseCase(
  cartRepository: CartRepository
) {
  return (itemId: string, quantity: number): Task<DataError, Cart> =>
    cartRepository
      .get()
      .chain(
        pipe(Cart.editItem(itemId, quantity), Task.tap(cartRepository.save))
      );
}
