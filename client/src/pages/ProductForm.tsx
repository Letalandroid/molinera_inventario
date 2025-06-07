// src/pages/ProductForm.tsx
import {
  Button,
  Container,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

interface Product {
  title: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // si existe → editar
  const isEditing = Boolean(id);

  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      api
        .get(`${import.meta.env.VITE_APP_BACK_URL}/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => {
          console.error("Error al cargar producto:", err);
          navigate("/products");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing
      ? `${import.meta.env.VITE_APP_BACK_URL}/products/${id}`
      : `${import.meta.env.VITE_APP_BACK_URL}/products/create`;

    const method = isEditing ? api.put : api.post;

    const payload = {
      ...product,
      price: Number(Number(product.price).toFixed(2)), // redondea y convierte a número
      stock: Number(product.stock),
    };

    method(url, payload)
      .then(() => navigate("/products"))
      .catch((err) => console.error("Error al guardar:", err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Editar producto" : "Crear producto"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título"
          name="title"
          value={product.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={product.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Precio"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControlLabel
          control={
            <Switch
              checked={product.isActive}
              onChange={handleChange}
              name="isActive"
            />
          }
          label="Activo"
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? "Guardar cambios" : "Crear producto"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
