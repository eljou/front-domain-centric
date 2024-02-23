import { pipe } from "ramda";
import { Task } from "data.task.ts";
import { DataError } from "../../../shared/domain/data-error";
import { Product } from "../../../product/domain/product";
import { CartRepository } from "../cart-repository";
import { Cart } from "../cart";

export type AddProductToCartUseCase = ReturnType<
  typeof makeAddProductToCartUseCase
>;

export function makeAddProductToCartUseCase(cartRepository: CartRepository) {
  return (product: Product): Task<DataError, Cart> =>
    cartRepository.get().chain(
      pipe(
        Cart.addItem({
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          quantity: 1,
        }),
        Task.tap(cartRepository.save)
      )
    );
}
