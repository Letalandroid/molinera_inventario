// src/context/AuthContext.tsx
import { createContext, type ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const login = (token: string) => {
    Cookies.set("token", token, { expires: 1 }); // 1 día
  };

  const logout = () => {
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
