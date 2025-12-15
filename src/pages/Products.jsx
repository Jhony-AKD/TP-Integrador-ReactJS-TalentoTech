import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

const API_URL = "https://69375b6cf8dc350aff3406d0.mockapi.io/products/products";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar productos");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <main className="products-page">
      {/* 🔎 Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar productos"
          className="search-input"
        />
      </div>

      {/* Productos */}
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="no-results">No se encontraron productos</p>
        )}
      </div>
    </main>
  );
};

export default Products;
