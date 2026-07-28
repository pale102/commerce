import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug, clearCurrentProduct } from "../features/products/productsSlice.js";
import { addToCart } from "../features/cart/cartSlice.js";
import Loader from "../components/Loader.jsx";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { current: product, loading } = useSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, slug]);

  if (loading || !product) return <Loader />;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        stock: product.stock,
        quantity,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <div className="aspect-square bg-surfaceAlt border border-border rounded-lg overflow-hidden">
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-16 rounded-md overflow-hidden border ${
                i === activeImage ? "border-accent" : "border-border"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span>★ {product.rating.toFixed(1)}</span>
          <span>({product.numReviews} reviews)</span>
          <span>·</span>
          <span>{product.category}</span>
        </div>
        <p className="text-2xl font-semibold text-accent">${product.price.toFixed(2)}</p>
        <p className="text-gray-300 leading-relaxed">{product.description}</p>

        <p className="text-sm">
          {product.stock > 0 ? (
            <span className="text-green-400">{product.stock} in stock</span>
          ) : (
            <span className="text-red-400">Out of stock</span>
          )}
        </p>

        {product.stock > 0 && (
          <div className="flex items-center gap-3">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-surfaceAlt border border-border rounded-md px-3 py-2"
            >
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddToCart}
              className="bg-accent hover:bg-accent/80 transition px-6 py-2 rounded-md font-medium"
            >
              Add to Cart
            </button>
          </div>
        )}

        <div className="pt-6 border-t border-border space-y-3">
          <h2 className="font-semibold">Reviews</h2>
          {product.reviews.length === 0 && (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          )}
          {product.reviews.map((r) => (
            <div key={r._id} className="text-sm border-b border-border pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{r.name}</span>
                <span>★ {r.rating}</span>
              </div>
              <p className="text-gray-400">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;