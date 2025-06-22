// src/context/AuthContext.tsx
import { createContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  exp?: number;
  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const ROLES = {
  ADMIN: "ADMINISTRADOR",
  EMPLOYEE: "EMPLEADO",
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const decodeToken = (token: string): JwtPayload | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        console.warn("Token expirado");
        return null;
      }
      return decoded;
    } catch (error) {
      console.error("Token inválido", error);
      return null;
    }
  };

  const token = Cookies.get("token");
  const initialUser = token ? decodeToken(token) : null;

  const [user, setUser] = useState<JwtPayload | null>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!initialUser);

  const isAdmin = user?.role === ROLES.ADMIN;

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
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
