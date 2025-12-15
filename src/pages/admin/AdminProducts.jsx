import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://<tu-endpoint>.mockapi.io/products";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto definitivamente?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h1>Administrar Productos</h1>

      <Link to="/admin/products/new" className="btn btn-primary">
        ➕ Crear Producto
      </Link>

      <div className="admin-list">
        {products.map((p) => (
          <div className="admin-card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>

            <div className="admin-actions">
              <Link to={`/admin/products/edit/${p.id}`} className="btn btn-edit">
                ✏️ Editar
              </Link>

              <button onClick={() => handleDelete(p.id)} className="btn btn-delete">
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
