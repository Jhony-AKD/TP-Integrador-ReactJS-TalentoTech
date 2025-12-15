import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user } = useAuth();

  // No logueado
  if (!user) return <Navigate to="/login" />;

  // Logueado pero NO admin intentando entrar a admin
  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
