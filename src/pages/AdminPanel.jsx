import { useEffect, useState } from "react";
import ProductTable from "../components/admin/ProductTable";
import ProductForm from "../components/admin/ProductForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPanel.css'

const API_URL = "https://69375b6cf8dc350aff3406d0.mockapi.io/products/products";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Traer productos de MockAPI
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🆕 Crear producto
  const handleCreate = async (newProduct) => {
    if (!newProduct.title || newProduct.price <= 0 || newProduct.description.length < 10) {
      toast.error("Completa todos los campos correctamente");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      if (!res.ok) throw new Error("Error al crear producto");
      const data = await res.json();
      setProducts(prev => [...prev, data]);
      toast.success("Producto creado con éxito");
    } catch (err) {
      console.error(err);
      toast.error("Error creando producto");
    }
  };

  // ✏ Editar producto
  const handleUpdate = async (updatedProduct) => {
    if (!updatedProduct.title || updatedProduct.price <= 0 || updatedProduct.description.length < 10) {
      toast.error("Completa todos los campos correctamente");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      });
      if (!res.ok) throw new Error("Error al actualizar producto");
      const data = await res.json();
      setProducts(prev => prev.map(p => (p.id === data.id ? data : p)));
      setEditingProduct(null);
      toast.success("Producto actualizado con éxito");
    } catch (err) {
      console.error(err);
      toast.error("Error actualizando producto");
    }
  };

  // ❌ Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Producto eliminado con éxito");
    } catch (err) {
      console.error(err);
      toast.error("Error eliminando producto");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Panel de Administración</h1>

      <div className="row">
        {/* Formulario */}
        <div className="col-md-4 mb-4">
          <ProductForm 
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            editingProduct={editingProduct}
            cancelEdit={() => setEditingProduct(null)}
          />
        </div>

        {/* Tabla de productos */}
        <div className="col-md-8">
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <ProductTable 
              products={products} 
              onEdit={setEditingProduct}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AdminPanel;
