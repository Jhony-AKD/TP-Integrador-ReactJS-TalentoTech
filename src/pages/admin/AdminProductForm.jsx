import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://<tu-endpoint>.mockapi.io/products";

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    navigate("/admin/products");
  };

  return (
    <div className="form-container">
      <h1>{isEditing ? "Editar Producto" : "Crear Producto"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={product.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={product.image}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          {isEditing ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}
