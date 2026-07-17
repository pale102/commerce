import { useState } from "react";
import api from "../app/api.js";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  stock: "",
  images: "",
};

const ProductFormModal = ({ product, onClose, onSaved }) => {
  const isEdit = Boolean(product?._id);
  const [form, setForm] = useState(
    isEdit
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          category: product.category,
          brand: product.brand || "",
          stock: product.stock,
          images: (product.images || []).join(", "),
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      description: form.description,
      price: Number(form.price),
      category: form.category,
      brand: form.brand,
      stock: Number(form.stock),
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = isEdit
        ? await api.put(`/products/${product._id}`, payload)
        : await api.post("/products", payload);
      onSaved(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-surfaceAlt border border-border rounded-lg w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{isEdit ? "Edit Product" : "New Product"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
          />
          <input
            name="slug"
            placeholder="Slug (auto-generated if blank)"
            value={form.slug}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
            />
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
            />
            <input
              name="brand"
              placeholder="Brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <input
            name="images"
            placeholder="Image URLs, comma-separated"
            value={form.images}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm border border-border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md text-sm bg-accent hover:bg-accent/80 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;