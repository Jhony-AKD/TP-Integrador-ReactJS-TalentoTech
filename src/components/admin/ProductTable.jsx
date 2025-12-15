import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ProductTable.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [productToDelete, setProductToDelete] = useState(null);

  const confirmDelete = () => {
    onDelete(productToDelete.id);
    setProductToDelete(null);
  };

  return (
    <>
      <table className="product-table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                <img
                  src={p.image}
                  alt={p.title}
                  width="60"
                  className="product-img"
                />
              </td>

              <td className="title">{p.title}</td>
              <td className="description">{p.description}</td>
              <td className="price">${p.price}</td>

              <td className="actions">
                <button className="btn-edit" onClick={() => onEdit(p)}>
                  <FaEdit /> Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => setProductToDelete(p)}
                >
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧨 Modal de confirmación */}
      {productToDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Confirmar eliminación</h4>

            <p>
              ¿Seguro que deseas eliminar el producto
              <strong> "{productToDelete.title}"</strong>?
            </p>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setProductToDelete(null)}>
                Cancelar
              </button>

              <button className="btn-confirm" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
