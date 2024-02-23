import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import {
  productsInitialState,
  ProductsState,
} from "../../core/product/presentation/products-state";

type ProductsStore = {
  state: ProductsState;
  setState: (newState: ProductsState) => void;
};

export const useProductsStore = create<
  ProductsStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set) => ({
      state: productsInitialState,
      setState: (newState) => set((st) => ({ ...st, state: newState })),
    }),
    { name: "Products" }
  )
);
