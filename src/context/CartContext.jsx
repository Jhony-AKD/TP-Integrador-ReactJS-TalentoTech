import { createContext, useContext, useState } from "react";

const CartContext = createContext();
let toastIdCounter = 0;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [animateCart, setAnimateCart] = useState(false);

  // ---------------------------
  // Funciones del carrito
  // ---------------------------
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.title} agregado al carrito`);
    triggerCartAnimation();
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
    showToast('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Carrito vacío');
  };

  const updateQuantity = (id, newQuantity) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (newQuantity <= 0) {
      setCart(prev => prev.filter(p => p.id !== id));
      showToast('Producto eliminado del carrito');
    } else if (item.quantity !== newQuantity) {
      setCart(prev =>
        prev.map(p => (p.id === id ? { ...p, quantity: newQuantity } : p))
      );
      showToast('Cantidad actualizada');
    }

    triggerCartAnimation();
  };

  // ---------------------------
  // Toasts múltiples
  // ---------------------------
  const showToast = (text, duration = 3000) => {
    const id = toastIdCounter++;
    setToasts(prev => [...prev, { id, text }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const triggerCartAnimation = () => {
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      animateCart,
      toasts
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
