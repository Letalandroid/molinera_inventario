// src/pages/UserManagement.tsx
import { useEffect, useState, useContext } from "react";
import { Container, Typography } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import UserTable from "../pages/UserTable";
import type { User } from "../types";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`${import.meta.env.VITE_APP_BACK_URL}/users/getAll`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  if (user?.role !== "ADMINISTRADOR") {
    return (
      <Container>
        <Typography variant="h5" mt={4}>
          Acceso denegado. Solo los administradores pueden acceder a esta
          sección.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Gestión de Usuarios
      </Typography>
      <UserTable users={users} onUpdate={handleUpdateUser} />
    </Container>
  );
}
