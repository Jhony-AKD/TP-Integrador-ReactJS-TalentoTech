import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

const API_URL = "https://6527b17a931d71583df26b5d.mockapi.io/products"; // <-- Cambia por tu MockAPI

const CreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });

  const [error, setError] = useState("");

  // Manejo de inputs (formulario controlado)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Validaciones
  const validate = () => {
    if (!form.title.trim()) return "El nombre es obligatorio";
    if (!form.price || Number(form.price) <= 0)
      return "El precio debe ser mayor a 0";
    if (form.description.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres";
    if (!form.image.trim()) return "Debe ingresar una URL de imagen";

    return null;
  };

  // Enviar a MockAPI
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price)
        })
      });

      alert("Producto creado correctamente");
      navigate("/admin/products");

    } catch (err) {
      setError("Error al crear el producto");
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Producto</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="product-form">

        <label>Nombre del producto:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <label>URL de la imagen:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <button type="submit" className="btn-create">
          Crear producto
        </button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/admin/products")}
        >
          Cancelar
        </button>

      </form>
    </div>
  );
};

export default CreateProduct;
