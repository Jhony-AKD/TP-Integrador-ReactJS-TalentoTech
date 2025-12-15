import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al entrar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Guardar usuario cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔹 Login normal (usuario estándar)
  const loginUser = () => {
    setUser({
      name: "Usuario",
      role: "user",
    });
  };

  // 🔹 Login administrador
  const loginAdmin = () => {
    setUser({
      name: "Administrador",
      role: "admin",
    });
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
  };

  // 🔹 Helpers de estado
  const isAuth = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuth, isAdmin, loginUser, loginAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
