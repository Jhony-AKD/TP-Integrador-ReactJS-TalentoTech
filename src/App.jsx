import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import AdminProducts from './pages/AdminProducts';
import Toast from './components/Toast';
import Footer from './components/Footer';

import { useCart } from './context/CartContext';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

const App = () => {
  const {
    cart,
    addToCart,
    animateCart,
    toasts
  } = useCart();

  return (
    <div className="app-container">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        animate={animateCart}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />

      {toasts.length > 0 && <Toast messages={toasts} />}
    </div>
  );
};

export default App;
