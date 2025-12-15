import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Para animar cantidades
  const [animatedItemId, setAnimatedItemId] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    setAnimatedItemId(id);
    updateQuantity(id, newQuantity);

    // Quitar animación después de 300ms
    setTimeout(() => setAnimatedItemId(null), 300);
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">El carrito está vacío</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span className="item-title">{item.title}</span>

              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  aria-label={`Disminuir cantidad de ${item.title}`}
                >
                  -
                </button>

                <span className={animatedItemId === item.id ? 'quantity animate' : 'quantity'}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  aria-label={`Aumentar cantidad de ${item.title}`}
                >
                  +
                </button>
              </div>

              <span className="item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Eliminar ${item.title} del carrito`}
              >
                Eliminar
              </button>
            </div>
          ))}

          <h3 className="total">Total: ${total.toFixed(2)}</h3>

          <button className="clear-btn" onClick={clearCart} aria-label="Vaciar carrito">
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
