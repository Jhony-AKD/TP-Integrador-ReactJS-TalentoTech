import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Debes iniciar sesión como administrador",
          from: location.pathname,
        }}
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/"
        replace
        state={{
          message: "No tienes permisos para acceder a esta sección",
        }}
      />
    );
  }

  return children;
};

export default AdminRoute;
