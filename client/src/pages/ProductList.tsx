// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Product } from "../types";
import api from "../api/api";
import ProductTable from "../components/ProductTable";
import MainNavbar from "../components/nav/MainNavbar";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
} from "@mui/material";
import styles from "../styles/ProductTable.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    productId: string | null;
    productName: string;
  }>({
    open: false,
    productId: null,
    productName: "",
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        setSnackbar({
          open: true,
          message: "Error al cargar los productos",
          severity: "error",
        });
      });
  };

  const goToCreate = () => {
    navigate("/products/create");
  };

  const handleDeleteClick = (productId: string, productName: string) => {
    setDeleteDialog({
      open: true,
      productId,
      productName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.productId) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token"); // Ajusta según tu manejo de auth

      await api.delete(
        `${import.meta.env.VITE_APP_BACK_URL}/products/delete/${
          deleteDialog.productId
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar la lista de productos
      fetchProducts();

      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `Producto "${deleteDialog.productName}" eliminado exitosamente`,
        severity: "success",
      });
    } catch (error: any) {
      console.error("Error al eliminar producto:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Error al eliminar el producto",
        severity: "error",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialog({ open: false, productId: null, productName: "" });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null, productName: "" });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <div className={styles.header_table}>
            <h3>Lista de Productos</h3>
            <Button variant="outlined" color="success" onClick={goToCreate}>
              Crear producto
            </Button>
          </div>
          <div className={styles.table_items}>
            <ProductTable
              products={products}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
      </Container>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <strong>"{deleteDialog.productName}"</strong>? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
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

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
