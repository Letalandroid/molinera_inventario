// src/context/AuthContext.tsx
import { createContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  [key: string]: any; // por si hay otros campos como email, id, etc.
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("token");

  const decodeToken = (token: string): JwtPayload | null => {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error("Token inválido", error);
      return null;
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!token);
  const [user, setUser] = useState<JwtPayload | null>(() => {
    return token ? decodeToken(token) : null;
  });

  const login = (token: string) => {
    const decodedUser = decodeToken(token);
    if (!decodedUser) return;

    Cookies.set("token", token, { expires: 1 });
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
