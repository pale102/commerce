import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group bg-surfaceAlt border border-border rounded-lg overflow-hidden hover:border-accent transition"
    >
      <div className="aspect-square bg-black/20 overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-accent font-semibold">${product.price.toFixed(2)}</span>
          {product.numReviews > 0 && (
            <span className="text-xs text-gray-400">
              ★ {product.rating.toFixed(1)} ({product.numReviews})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;