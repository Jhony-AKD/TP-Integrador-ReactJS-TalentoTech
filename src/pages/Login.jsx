import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { loginUser, loginAdmin } = useAuth();

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <button className="btn" onClick={loginUser}>
        Entrar como Usuario
      </button>

      <button className="btn admin" onClick={loginAdmin}>
        Entrar como Administrador
      </button>
    </div>
  );
};

export default Login;
