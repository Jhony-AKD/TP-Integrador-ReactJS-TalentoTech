import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./AdminProducts.css";

const API_URL = "https://69375b6cf8dc350aff3406d0.mockapi.io/products/products";

const AdminProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Toast
  const [toast, setToast] = useState("");

  // Form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [currentId, setCurrentId] = useState(null);

  // 🔐 Bloquear acceso
  useEffect(() => {
    if (!user || user.role !== "admin") navigate("/");
  }, [user, navigate]);

  // Normalización por si MockAPI entrega campos inconsistentes
  const normalize = (p) => ({
    id: p.id,
    name: p.name ?? p.title ?? "",
    price: Number(p.price) ?? 0,
    image: p.image ?? "",
    description: p.description ?? "",
  });

  // 📌 Cargar productos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Error al obtener productos.");

      const data = await res.json();
      setProducts(Array.isArray(data) ? data.map(normalize) : []);
    } catch (error) {
      console.error(error);
      setToast("Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📌 Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "El nombre es obligatorio.";
    if (!formData.price || Number(formData.price) <= 0)
      return "El precio debe ser mayor a 0.";
    if (!formData.image.trim()) return "Ingrese una URL de imagen.";
    if (formData.description.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    return null;
  };

  // 📌 Crear producto
  const handleCreate = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) return setToast(err);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      setToast("Producto creado correctamente");
      setIsOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      setToast("No se pudo crear el producto");
    }
  };

  // 📌 Abrir edición
  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
    });
    setCurrentId(p.id);
    setEditMode(true);
    setIsOpen(true);
  };

  // 📌 Actualizar
  const handleUpdate = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) return setToast(err);

    try {
      const res = await fetch(`${API_URL}/${currentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price) }),
      });

      if (!res.ok) throw new Error("Error al actualizar producto");

      setToast("Producto actualizado exitosamente");
      setIsOpen(false);
      setEditMode(false);
      setCurrentId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      setToast("No se pudo actualizar");
    }
  };

  // 📌 Eliminar
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");

      setToast("Producto eliminado");
      fetchProducts();
    } catch (error) {
      console.error(error);
      setToast("No se pudo eliminar");
    }
  };

  // 📌 Abrir modal de creación
  const openCreateModal = () => {
    setFormData({ name: "", price: "", image: "", description: "" });
    setEditMode(false);
    setCurrentId(null);
    setIsOpen(true);
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Productos</h2>

      <button className="create-btn" onClick={openCreateModal}>
        ➕ Crear nuevo producto
      </button>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <img src={p.image} alt={p.name} className="thumb" />
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>
                    ✏ Editar
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editMode ? "Editar producto" : "Crear nuevo producto"}</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="image"
                placeholder="URL de la imagen"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  {editMode ? "Guardar cambios" : "Crear"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
};

export default AdminProducts;
