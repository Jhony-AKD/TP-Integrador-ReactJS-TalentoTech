import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <div className="home-content">
      <h1 className="home-title">Bienvenido a <span>Tiendas Chichita</span></h1>
      <p className="home-subtitle">Explora nuestros productos y llena tu carrito 🛍️</p>
      <Link to="/products" className="home-button">Ver productos</Link>
    </div>
    <div className="home-image">
      <img src="/images/shop-banner.jpg" alt="Tienda Chichita" />
    </div>
  </div>
);

export default Home;