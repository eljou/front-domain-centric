import { CartItemState } from "../../core/cart/presentation/cart-state";

const CartItem: React.FC<{
  cartItem: CartItemState;
  add: () => void;
  remove: () => void;
}> = ({ cartItem, add, remove }) => {
  return (
    <div className="relative border border-solid mb-3">
      <div className="absolute top-2 right-2 badge badge-lg shadow-sm">
        {cartItem.quantity}
      </div>
      <div className=" flex flex-row justify-between">
        <figure className="basis-1/3">
          <img src={cartItem.image} alt={cartItem.title} />
        </figure>
        <div className="basis-1/2 mr-3">
          <b className="text-md mb-2">{cartItem.title}</b>
          <p className="text-sm mb-4">{cartItem.price}</p>
          <div className="flex justify-between">
            <button className="btn btn-info btn-sm basis-1/4" onClick={add}>
              Add
            </button>
            <button className="btn btn-error btn-sm basis-1/4" onClick={remove}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
