import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: "newest" }));
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <section className="text-center space-y-4 py-10">
        <h1 className="text-4xl font-bold">Find what you need, from sellers you trust</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Browse thousands of products across electronics, home, fashion, and more.
        </p>
        <Link
          to="/products"
          className="inline-block bg-accent hover:bg-accent/80 transition px-6 py-2.5 rounded-md font-medium"
        >
          Shop now
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">New arrivals</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;