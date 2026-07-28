import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../features/products/productsSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { list, loading, page, pages, categories } = useSelector((state) => state.products);

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  };

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(p));
    setSearchParams(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="space-y-6 md:col-span-1">
        <div>
          <label className="text-sm text-gray-400 block mb-1">Search</label>
          <input
            defaultValue={params.keyword || ""}
            onKeyDown={(e) => e.key === "Enter" && updateParam("keyword", e.target.value)}
            placeholder="Search products..."
            className="w-full bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Category</label>
          <select
            value={params.category || ""}
            onChange={(e) => updateParam("category", e.target.value)}
            className="w-full bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm text-gray-400 block mb-1">Min $</label>
            <input
              type="number"
              defaultValue={params.minPrice || ""}
              onBlur={(e) => updateParam("minPrice", e.target.value)}
              className="w-full bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-400 block mb-1">Max $</label>
            <input
              type="number"
              defaultValue={params.maxPrice || ""}
              onBlur={(e) => updateParam("maxPrice", e.target.value)}
              className="w-full bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Sort by</label>
          <select
            value={params.sort || "newest"}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full bg-surfaceAlt border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </aside>

      <section className="md:col-span-3 space-y-6">
        {loading ? (
          <Loader />
        ) : list.length === 0 ? (
          <p className="text-gray-400">No products match your filters.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {list.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-center gap-2 pt-4">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-8 h-8 rounded-md text-sm ${
                      p === Number(page) ? "bg-accent" : "bg-surfaceAlt border border-border"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;