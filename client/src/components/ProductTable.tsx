// src/components/ProductTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";
import { type Product } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>S/. {product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
