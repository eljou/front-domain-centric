import CartDrawer from "./cart-drawer";
import ProductList from "../products/product-list";

export function ShoppingCart() {
  return (
    <main className="mx-auto my-0 w-5/6">
      <CartDrawer>
        <div>
          <ProductList />
        </div>
      </CartDrawer>
    </main>
  );
}
