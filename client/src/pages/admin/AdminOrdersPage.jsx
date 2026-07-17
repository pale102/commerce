import { useEffect, useState } from "react";
import api from "../../app/api.js";
import Loader from "../../components/Loader.jsx";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/orders/all").then((res) => setOrders(res.data));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (!orders) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surfaceAlt text-gray-400">
            <tr>
              <th className="text-left px-4 py-2">Order</th>
              <th className="text-left px-4 py-2">Customer</th>
              <th className="text-right px-4 py-2">Total</th>
              <th className="text-center px-4 py-2">Paid</th>
              <th className="text-right px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t border-border">
                <td className="px-4 py-2">
                  <span className="font-mono text-xs">#{o._id.slice(-8)}</span>
                  <div className="text-gray-400 text-xs">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-2">{o.user?.name}</td>
                <td className="px-4 py-2 text-right">${o.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  {o.isPaid ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    className="bg-surface border border-border rounded-md px-2 py-1 text-sm capitalize"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;