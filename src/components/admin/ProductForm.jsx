import { useEffect, useState } from "react";

const initialState = {
  title: "",
  price: "",
  image: "",
  description: ""
};

const ProductForm = ({ onCreate, onUpdate, editingProduct, cancelEdit }) => {
  const [form, setForm] = useState(initialState);

  // Cuando entramos a editar, el formulario se llena con datos
  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm(initialState);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      onUpdate(form);
    } else {
      onCreate(form);
    }

    setForm(initialState);
  };

  return (
    <div className="product-form">
      <h2>{editingProduct ? "Editar producto" : "Crear producto"}</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL de imagen"
          value={form.image}
          onChange={handleChange}          
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          {editingProduct ? "Actualizar" : "Crear"}
        </button>

        {editingProduct && (
          <button type="button" onClick={cancelEdit}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
