import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="footer-logo">Tiendas Chichita</h2>
          <p>Tu lugar para encontrar los mejores productos 💅</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📧 contacto@chichita.com</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">🌸</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tiendas Chichita — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;