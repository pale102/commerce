import { useEffect, useState } from "react";
import api from "../../app/api.js";
import Loader from "../../components/Loader.jsx";
import ProductFormModal from "../../components/ProductFormModal.jsx";

const AdminProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, product = edit
  const [error, setError] = useState("");

  const loadProducts = async () => {
    const { data } = await api.get("/products", { params: { limit: 100 } });
    setProducts(data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const handleSaved = (saved) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p._id === saved._id);
      if (exists) return prev.map((p) => (p._id === saved._id ? saved : p));
      return [saved, ...prev];
    });
    setEditing(null);
  };

  if (!products) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setEditing({})}
          className="bg-accent hover:bg-accent/80 transition px-4 py-2 rounded-md text-sm font-medium"
        >
          + New Product
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surfaceAlt text-gray-400">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-right px-4 py-2">Price</th>
              <th className="text-right px-4 py-2">Stock</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-border">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-gray-400">{p.category}</td>
                <td className="px-4 py-2 text-right">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">
                  <span className={p.stock === 0 ? "text-red-400" : ""}>{p.stock}</span>
                </td>
                <td className="px-4 py-2 text-right space-x-3">
                  <button onClick={() => setEditing(p)} className="text-accent hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <ProductFormModal
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;