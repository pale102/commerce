import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm transition ${
    isActive ? "bg-accent text-white" : "text-gray-300 hover:bg-surfaceAlt"
  }`;

const AdminSidebar = () => (
  <aside className="w-48 shrink-0 space-y-1">
    <NavLink to="/admin" end className={linkClass}>
      Dashboard
    </NavLink>
    <NavLink to="/admin/products" className={linkClass}>
      Products
    </NavLink>
    <NavLink to="/admin/orders" className={linkClass}>
      Orders
    </NavLink>
  </aside>
);

export default AdminSidebar;