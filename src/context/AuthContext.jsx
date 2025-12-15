import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // 🔹 Cargar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🔹 Persistir sesión
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔐 Login con credenciales
  const login = (username, password) => {
    setError("");

    // Admin
    if (username === "admin" && password === "admin") {
      setUser({ name: "Administrador", role: "admin" });
      return true;
    }

    // Usuario estándar
    if (username === "usuario" && password === "123456") {
      setUser({ name: "Usuario", role: "user" });
      return true;
    }

    // Credenciales inválidas
    setError("Usuario o contraseña incorrectos");
    return false;
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
  };

  // 🔹 Helpers
  const isAuth = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isAdmin,
        login,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
