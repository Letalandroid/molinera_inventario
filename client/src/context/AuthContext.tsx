// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!Cookies.get("token"));

  useEffect(() => {
    const token = Cookies.get("token");

    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 1 }); // 1 día
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
