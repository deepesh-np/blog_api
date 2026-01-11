/** @format */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      // 1️⃣ verify auth + get user
      const res = await api.get("/auth/me");

      setIsAuth(true);
      setUser(res.data.user); // <-- SINGLE source of user truth
    } catch (err) {
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed");
    } finally {
      setIsAuth(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, user, loading, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
