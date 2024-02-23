export type CommonCartState = { open: boolean };
export type IdleCartState = { kind: "cart:idle" };
export type LoadingCartState = { kind: "cart:loading" };
export type UpdatedCartState = {
  kind: "cart:updated";
  items: Array<CartItemState>;
  totalPrice: string;
  totalItems: number;
};
export type ErrorCartState = {
  kind: "cart:error";
  error: string;
};

export type CartState = (
  | IdleCartState
  | LoadingCartState
  | UpdatedCartState
  | ErrorCartState
) &
  CommonCartState;

export type CartItemState = {
  id: string;
  image: string;
  title: string;
  price: string;
  quantity: number;
};

export const cartInitialState: CartState = { kind: "cart:idle", open: false };
