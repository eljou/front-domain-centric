import { CartRepository } from "../cart-repository";

export type GetCartUseCase = ReturnType<typeof makeGetCartUseCase>;

export function makeGetCartUseCase(cartRepository: CartRepository) {
  return cartRepository.get;
}
