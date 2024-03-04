import { useCallback, useEffect, useState } from "react";
import { match } from "ts-pattern";
import { dependenciesLocator } from "../../core/shared/dependecies";
import { useZustandPlocState } from "../shared/use-zustand-ploc-state";
import { useCart } from "../cart/cart-context";
import ProductItem from "./product-item";
import { useProductsStore } from "./products-store";

const ploc = dependenciesLocator.provideProductsPloc();
function useProducts() {
  const state = useZustandPlocState(ploc, useProductsStore);

  return { state, search: ploc.search };
}

const ProductList: React.FC = () => {
  const cart = useCart();
  const { state, search } = useProducts();

  const [term, setTerm] = useState("");
  const searchProducts = useCallback(
    (filter: string) => search(filter),
    [term]
  );

  useEffect(() => {
    if (state.kind == "products:error" || state.kind == "products:loading")
      searchProducts(term);
  }, []);

  return (
    <div className="p-4">
      {match(state)
        .with({ kind: "products:loading" }, () => (
          <div className="flex justify-center items-center">
            <span className="loading loading-infinity loading-lg" />
          </div>
        ))
        .with({ kind: "products:error" }, (st) => (
          <div>
            <b>Error: </b> {st.error}
          </div>
        ))
        .with(
          { kind: "products:loaded" },
          { kind: "products:reloading" },
          (st) => (
            <>
              <div className="mb-3">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                  <input
                    type="search"
                    className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    onChange={(e) => setTerm(e.target.value)}
                  />

                  <button
                    className="relative flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1"
                    onClick={() => searchProducts(term)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="mt-4">
                Results for: "{term}"{" "}
                {st.kind == "products:reloading" && (
                  <span className="loading loading-ring loading-sm" />
                )}
              </h3>
              <div className="divider" />
              <div className="grid gap-3 grid-cols-3">
                {st.products.map((p, k) => (
                  <ProductItem
                    product={p}
                    addToCart={() => {
                      cart.addProductToCart(p);
                    }}
                    key={k}
                  />
                ))}
              </div>
            </>
          )
        )
        .exhaustive()}
    </div>
  );
};

export default ProductList;
