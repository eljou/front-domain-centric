import { Image, Price, Title } from "../../product/domain/product";

type TotalPrice = number;
type TotalItems = number;

type CartItemId = string;
type Quantity = number;

export interface CartItem {
  readonly id: CartItemId;
  readonly image: Image;
  readonly title: Title;
  readonly price: Price;
  readonly quantity: Quantity;
}

export type Cart = {
  items: CartItem[];
  totalPrice: TotalPrice;
  totalItems: TotalItems;
};

export const Cart = {
  create: (items: CartItem[]): Cart => ({
    items,
    totalItems: calculateTotalItems(items),
    totalPrice: calculateTotalPrice(items),
  }),

  createEmpty: (): Cart => Cart.create([]),

  addItem:
    (item: CartItem) =>
    (cart: Cart): Cart =>
      cart.items.some((i) => i.id === item.id)
        ? Cart.create(
            cart.items.map((oldItem) =>
              oldItem.id === item.id
                ? { ...oldItem, quantity: oldItem.quantity + item.quantity }
                : oldItem
            )
          )
        : Cart.create([...cart.items, item]),

  removeItem:
    (itemId: string) =>
    (cart: Cart): Cart =>
      Cart.create(cart.items.filter((i) => i.id !== itemId)),

  editItem:
    (itemId: string, quantity: number) =>
    (cart: Cart): Cart =>
      Cart.create(
        cart.items.map((oldItem) => {
          if (oldItem.id === itemId) {
            return { ...oldItem, quantity: quantity };
          } else {
            return oldItem;
          }
        })
      ),
};

function calculateTotalPrice(items: CartItem[]): TotalPrice {
  return +items
    .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    .toFixed(2);
}

function calculateTotalItems(items: CartItem[]): TotalItems {
  return +items.reduce((accumulator, item) => accumulator + item.quantity, 0);
}
