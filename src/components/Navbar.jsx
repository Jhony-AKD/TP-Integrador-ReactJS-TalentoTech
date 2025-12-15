import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Tiendas Chichita</h1>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Productos</Link>
        </li>

        {/* 🛒 Carrito */}
        <li>
          {user ? (
            <Link to="/cart">Carrito</Link>
          ) : (
            <Link to="/login">Carrito</Link>
          )}
        </li>

        {/* 👑 Admin */}
        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Administrar</Link>
          </li>
        )}

        {/* 👤 Usuario */}
        <li className="user-section">
          {user ? (
            <>
              <span className="user-name">
                Hola, {user.role === "admin" ? "Administrador" : "Usuario"}
              </span>

              <button className="logout-btn" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
