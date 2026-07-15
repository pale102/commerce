import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
    <h1 className="text-3xl font-bold">404</h1>
    <p className="text-gray-400">Page not found.</p>
    <Link to="/" className="text-accent hover:underline">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;