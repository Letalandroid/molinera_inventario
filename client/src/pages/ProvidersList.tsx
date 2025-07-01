import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { type Provider } from "../types";
import api from "../api/api";
import ProvidersTable from "../components/ProvidersTable";
import MainNavbar from "../components/nav/MainNavbar";
import styles from "../styles/ProductTable.module.css";

export default function ProvidersList() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "" });

  const fetchProviders = () => {
    api
      .get("/providers")
      .then((res) => setProviders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleOpenDialog = (provider?: Provider) => {
    if (provider) {
      setEditingProvider(provider);
      setFormData({ name: provider.name, contact: provider.contact || '' });
    } else {
      setEditingProvider(null);
      setFormData({ name: "", contact: "" });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProvider(null);
    setFormData({ name: "", contact: "" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este proveedor?");
    if (!confirmed) return;

    try {
      await api.delete(`/providers/${id}`);
      fetchProviders();
    } catch (error) {
      console.error("Error al eliminar proveedor", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingProvider) {
        await api.put(`/providers/${editingProvider.id}`, formData);
      } else {
        await api.post("/providers", formData);
      }
      fetchProviders();
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar proveedor", error);
    }
  };

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <Typography variant="h5" gutterBottom>
            Lista de Proveedores
          </Typography>

          <Button variant="contained" onClick={() => handleOpenDialog()}>
            + Añadir Proveedor
          </Button>

          <div className={styles.table_items}>
            <ProvidersTable
              providers={providers}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </Container>

      {/* Dialog de creación/edición */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingProvider ? "Editar Proveedor" : "Nuevo Proveedor"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contacto"
            fullWidth
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
