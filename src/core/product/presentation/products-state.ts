import { Product } from "../domain/product";

export type CommonProductsState = { searchTerm: string };
export type LoadingProductsState = { kind: "products:loading" };
export type LoadedProductsState = {
  kind: "products:loaded";
  products: Array<Product>;
};
export type ReloadingProductsState = {
  kind: "products:reloading";
  products: Array<Product>;
};
export type ErrorProductsState = {
  kind: "products:error";
  error: string;
};

export type ProductsState = (
  | LoadingProductsState
  | LoadedProductsState
  | ReloadingProductsState
  | ErrorProductsState
) &
  CommonProductsState;

export const productsInitialState: ProductsState = {
  kind: "products:loading",
  searchTerm: "",
};
