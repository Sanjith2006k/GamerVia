import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/auth/profile");
          setUser(res.data.data);
        } catch (error) {
          console.error("Token invalid or expired");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.data.token);
    setUser(res.data.data);
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    localStorage.setItem("token", res.data.data.token);
    setUser(res.data.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const toggleWishlist = async (gameId, title, image) => {
    try {
      const res = await api.post("/auth/wishlist", { gameId, title, image });
      setUser((prev) => ({
        ...prev,
        wishlist: res.data.data,
      }));
      return res.data.added;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
};
