import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔔 Mensaje desde rutas protegidas
  const routeMessage = location.state?.message || "";

  // 🔁 Si ya está logueado, redirigir
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const success = login(username, password);

    if (!success) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      {/* 📢 Mensaje de seguridad */}
      {routeMessage && (
        <p className="login-info">
          {routeMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
