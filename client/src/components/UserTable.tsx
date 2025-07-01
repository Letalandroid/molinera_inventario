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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import type { User } from "../types";

interface Props {
  users: User[];
  onUpdate: () => void;
  onNotification?: (message: string, severity?: "success" | "error") => void;
}

export default function UserTable({ users, onUpdate, onNotification }: Props) {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "ADMINISTRADOR";
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<Partial<User>>({});

  // Estados para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
        onNotification?.("Usuario actualizado exitosamente", "success");
      } else {
        console.error("Error al actualizar usuario", res.data);
        onNotification?.("Error al actualizar usuario", "error");
      }
    } catch (err) {
      console.error("Error al actualizar usuario", err);
      onNotification?.("Error al actualizar usuario", "error");
    } finally {
      setEditId(null);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = name === "isActive" ? value === "true" : value;
    setTempData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // Funciones para manejar la eliminación
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      const res = await api.delete(
        `${import.meta.env.VITE_APP_BACK_URL}/users/${userToDelete.id}`
      );

      if (res.status === 200) {
        onUpdate();
        onNotification?.("Usuario eliminado exitosamente", "success");
        console.log("Usuario eliminado exitosamente");
      } else {
        console.error("Error al eliminar usuario", res.data);
        onNotification?.("Error al eliminar usuario", "error");
      }
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
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
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {isEditing ? (
                          <IconButton
                            onClick={() => handleSave(u.id)}
                            size="small"
                          >
                            <SaveIcon />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton
                              onClick={() => handleEditClick(u)}
                              size="small"
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(u)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmación para eliminar usuario */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <strong>
              {userToDelete?.Profile?.name || userToDelete?.email}
            </strong>
            ?
            <br />
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            color="primary"
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
