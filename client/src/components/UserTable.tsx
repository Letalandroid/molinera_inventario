// src/components/UserTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import type { User } from "../types";

interface Props {
  users: User[];
  onUpdate: () => void;
}

export default function UserTable({ users, onUpdate }: Props) {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "ADMINISTRADOR";
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<Partial<User>>({});

  const handleEditClick = (user: User) => {
    setEditId(user.id);
    setTempData({ role: user.role, isActive: user.isActive });
  };

  const handleSave = async (id: number) => {
    try {
      const res = await api.put(
        `${import.meta.env.VITE_APP_BACK_URL}/users/${id}`,
        tempData
      );

      if (res.status === 200) {
        onUpdate();
      } else {
        console.error("Error al actualizar usuario", res.data);
      }
    } catch (err) {
      console.error("Error al actualizar usuario", err);
    } finally {
      setEditId(null);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = name === "isActive" ? value === "true" : value;
    setTempData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell>
              <b>Correo</b>
            </TableCell>
            <TableCell>
              <b>Rol</b>
            </TableCell>
            <TableCell>
              <b>Estado</b>
            </TableCell>
            {isAdmin && (
              <TableCell>
                <b>Acciones</b>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => {
            const isEditing = editId === u.id;
            return (
              <TableRow key={u.id}>
                <TableCell>{u.Profile?.name || "Sin nombre"}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      name="role"
                      value={tempData.role || ""}
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="ADMINISTRADOR">ADMINISTRADOR</MenuItem>
                      <MenuItem value="EMPLEADO">EMPLEADO</MenuItem>
                    </Select>
                  ) : (
                    u.role
                  )}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <Select
                      name="isActive"
                      value={tempData.isActive ? "true" : "false"}
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value="true">Activo</MenuItem>
                      <MenuItem value="false">Inactivo</MenuItem>
                    </Select>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: u.isActive
                          ? "success.main"
                          : "error.main",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        fontSize: 13,
                        borderRadius: 1,
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {u.isActive ? "Activo" : "Inactivo"}
                    </Box>
                  )}
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    {isEditing ? (
                      <IconButton onClick={() => handleSave(u.id)} size="small">
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleEditClick(u)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
