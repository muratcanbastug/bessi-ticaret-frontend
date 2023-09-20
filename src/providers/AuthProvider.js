import React, { createContext, useContext, useEffect, useState } from "react";
import { adminCheck, loginCheck } from "../services/AuthService";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const logged = await loginCheck();
      setIsLoggedIn(logged === 200);

      const admin = await adminCheck();
      setIsAdmin(admin === 200);
    }
    fetchData();
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.role === "ROLE_ADMIN");
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
