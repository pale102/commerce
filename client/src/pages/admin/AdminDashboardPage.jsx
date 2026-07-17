import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../app/api.js";
import Loader from "../../components/Loader.jsx";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/products", { params: { limit: 1 } }),
        api.get("/orders/all"),
      ]);

      const orders = ordersRes.data;
      const revenue = orders
        .filter((o) => o.isPaid)
        .reduce((sum, o) => sum + o.totalPrice, 0);
      const pending = orders.filter((o) => o.status === "pending").length;

      setStats({
        totalProducts: productsRes.data.total,
        totalOrders: orders.length,
        pendingOrders: pending,
        revenue,
      });
    };
    load();
  }, []);

  if (!stats) return <Loader />;

  const cards = [
    { label: "Total Products", value: stats.totalProducts, to: "/admin/products" },
    { label: "Total Orders", value: stats.totalOrders, to: "/admin/orders" },
    { label: "Pending Orders", value: stats.pendingOrders, to: "/admin/orders" },
    { label: "Revenue (paid)", value: `$${stats.revenue.toFixed(2)}`, to: "/admin/orders" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-surfaceAlt border border-border rounded-lg p-4 hover:border-accent transition"
          >
            <p className="text-sm text-gray-400">{c.label}</p>
            <p className="text-2xl font-semibold text-accent mt-1">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;