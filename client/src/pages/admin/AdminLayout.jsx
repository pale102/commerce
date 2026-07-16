import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar.jsx";

const AdminLayout = () => (
  <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
    <AdminSidebar />
    <div className="flex-1 min-w-0">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;