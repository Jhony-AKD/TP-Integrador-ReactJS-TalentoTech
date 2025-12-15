import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Tiendas Chichita</h1>

      <ul className="nav-links">

        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Productos</Link></li>

        {/* 🔒 Carrito solo para usuarios logueados */}
        <li>
          {user ? (
            <Link to="/cart">Carrito</Link>
          ) : (
            <Link to="/login">Carrito</Link>
          )}
        </li>

        {/* 👑 Botón de administrador visible solo para admin */}
        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Administrar</Link>
          </li>
        )}

        {/* Área del usuario */}
        <li className="user-section">
          {user ? (
            <>
              <span className="user-email">
                {user.role === "admin" ? "Administrador" : "Usuario"}
              </span>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
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
