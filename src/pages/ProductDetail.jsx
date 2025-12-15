import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const API_URL = "https://69375b6cf8dc350aff3406d0.mockapi.io/products/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar producto");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar producto");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) return <p className="loading">Cargando producto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  // 🔄 Compatibilidad entre FakeStore y MockAPI
  const title = product.title || product.name || "Producto sin nombre";

  return (
    <div className="product-detail">
      <div className="image-container">
        <img src={product.image} alt={title} />
      </div>

      <div className="info-container">
        <h2 className="product-title">{title}</h2>

        <p className="product-description">
          {product.description || "Sin descripción"}
        </p>

        <p className="product-price">${product.price}</p>

        <div className="buttons-detail">
          <button
            className="btn-add"
            onClick={handleAddToCart}
            aria-label={`Agregar ${title} al carrito`}
          >
            🛒 Agregar al carrito
          </button>

          <button
            className="btn-back"
            onClick={() => navigate("/products")}
            aria-label="Volver a la tienda"
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
