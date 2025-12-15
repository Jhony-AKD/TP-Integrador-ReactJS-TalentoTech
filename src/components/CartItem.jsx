const Cart = ({ cart, removeFromCart, clearCart, updateQuantity }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? <p className="empty-cart">El carrito está vacío</p> : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.title}</span>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
          <h3 className="total">Total: ${total.toFixed(2)}</h3>
          <button className="clear-btn" onClick={clearCart}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
};
export default Cart;