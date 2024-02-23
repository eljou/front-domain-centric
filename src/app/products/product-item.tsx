import { Product } from "../../core/product/domain/product";

const ProductItem: React.FC<{ product: Product; addToCart: () => void }> = ({
  product,
  addToCart,
}) => {
  return (
    <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt={product.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>
          Price:{" "}
          {product.price.toLocaleString("es-ES", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
