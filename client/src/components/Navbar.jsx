import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { selectCartCount } from "../features/cart/cartSlice.js";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="border-b border-border bg-surfaceAlt sticky top-0 z-40">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-white">
          Marketplace
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/products" className="hover:text-accent transition">
            Shop
          </Link>

          <Link to="/cart" className="relative hover:text-accent transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-accent transition">
                Orders
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-accent transition">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-accent transition">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-accent transition">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;