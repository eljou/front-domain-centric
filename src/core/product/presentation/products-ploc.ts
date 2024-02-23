import { match } from "ts-pattern";
import { Task } from "data.task.ts";
import { DataError } from "../../shared/domain/data-error";
import { GetProductsUseCase } from "../domain/use-cases/get-products";
import { makePloc, Ploc } from "../../shared/presentation/ploc";
import { productsInitialState, ProductsState } from "./products-state";

export type ProductsPloc = Ploc<ProductsState> & {
  search: (searchTerm: string) => void;
};

export function makeProductsPloc(
  getProductsUseCase: GetProductsUseCase
): ProductsPloc {
  const ploc = makePloc(productsInitialState);

  return {
    ...ploc,
    search: (searchTerm) => {
      const state = ploc.state();

      return Task.of<DataError, void>(
        ploc.changeState(
          state.kind == "products:loaded"
            ? {
                kind: "products:reloading",
                products: state.products,
                searchTerm,
              }
            : { kind: "products:loading", searchTerm }
        )
      )
        .chain(() => getProductsUseCase(searchTerm))
        .fork(
          (err) =>
            ploc.changeState(
              match(err)
                .with(
                  { kind: "UnexpectedError" },
                  (): ProductsState => ({
                    kind: "products:error",
                    searchTerm,
                    error: "Sorry, an error has ocurred. Try again later",
                  })
                )
                .exhaustive()
            ),
          (products) =>
            ploc.changeState({
              kind: "products:loaded",
              products,
              searchTerm,
            })
        );
    },
  };
}
