import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { type Product } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
  onDeleteClick: (productId: string, productName: string) => void;
}

export default function ProductTable({ products, onDeleteClick }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Título</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Mín. Stock</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ubicación</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Categoría</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Proveedor</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>S/. {Number(product.price).toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.minStock}</TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>{product.Category?.name || "—"}</TableCell>
              <TableCell>{product.Provider?.name || "—"}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: product.isActive
                      ? "success.main"
                      : "error.main",
                    color: "white",
                    px: 0.8,
                    py: 0.4,
                    fontSize: 13,
                    borderRadius: "5px",
                    display: "inline-block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {product.isActive ? "Activo" : "Inactivo"}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => onDeleteClick(product.id.toString(), product.title)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}