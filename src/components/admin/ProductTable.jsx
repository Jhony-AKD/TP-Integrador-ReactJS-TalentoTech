import { FaEdit, FaTrash } from "react-icons/fa";
import "./ProductTable.css"; // Asegurate de crear este archivo

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
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
              <button className="btn-delete" onClick={() => onDelete(p.id)}>
                <FaTrash /> Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
