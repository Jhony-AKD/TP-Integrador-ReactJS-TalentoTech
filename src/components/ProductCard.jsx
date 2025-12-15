import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const title = product.title || product.name || "Producto sin nombre";
  const price = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  return (
    <div className="card">
      <div className="card-content">
        <Link to={`/products/${product.id}`} className="card-link">
          <img src={product.image} alt={title} loading="lazy" />
          <h3>{title}</h3>
          <p className="description">{product.description}</p>
        </Link>
      </div>

      <p className="price">${price}</p>
      <button
        className="btn"
        onClick={() => addToCart(product)}
        aria-label={`Agregar ${title} al carrito`}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
