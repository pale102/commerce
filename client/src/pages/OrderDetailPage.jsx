import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../app/api.js";
import Loader from "../components/Loader.jsx";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
      <p className="text-sm text-gray-400 capitalize">Status: {order.status}</p>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.product} className="flex justify-between bg-surfaceAlt border border-border rounded-lg p-3">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="bg-surfaceAlt border border-border rounded-lg p-4 space-y-1 text-sm">
        <p className="font-medium mb-2">Shipping address</p>
        <p>{order.shippingAddress.street}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
        </p>
        <p>{order.shippingAddress.country}</p>
      </div>

      <p className="text-xl font-semibold text-accent">Total: ${order.totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default OrderDetailPage;