import { Task } from "data.task.ts";
import { Cart } from "../domain/cart";
import { CartRepository } from "../domain/cart-repository";

export function makeCartInMemoryRepository(): CartRepository {
  let cart = Cart.create([]);

  return {
    get: () =>
      Task.fromLazyPromise(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                resolve(cart);
              } catch (error) {
                reject({ kind: "UnexpectedError", error });
              }
            }, 500);
          })
      ),

    save: (newCart) =>
      Task.fromLazyPromise(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                cart = newCart;
                resolve(true);
              } catch (error) {
                reject({ kind: "UnexpectedError", error });
              }
            }, 500);
          })
      ),
  };
}
