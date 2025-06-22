// src/components/PrivateRoute.tsx
import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
