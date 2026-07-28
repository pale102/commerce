import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice.js";

const CartPage = () => {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-gray-400">Your cart is empty.</p>
        <Link to="/products" className="text-accent hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product}
            className="flex items-center gap-4 bg-surfaceAlt border border-border rounded-lg p-3"
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
            </div>
            <select
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ product: item.product, quantity: Number(e.target.value) }))
              }
              className="bg-surface border border-border rounded-md px-2 py-1"
            >
              {Array.from({ length: Math.min(item.stock, 10) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <p className="w-20 text-right font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.product))}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-border pt-4">
        <p className="text-lg">
          Subtotal: <span className="font-semibold text-accent">${subtotal.toFixed(2)}</span>
        </p>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-accent hover:bg-accent/80 transition px-6 py-2 rounded-md font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;