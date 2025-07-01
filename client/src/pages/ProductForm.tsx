import {
  Button,
  Container,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

interface Product {
  title: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  minStock: number;
  location: string;
  categoryId: number;
  providerId: number;
}

interface Category {
  id: number;
  name: string;
}

interface Provider {
  id: number;
  name: string;
  contact: string;
}

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    isActive: true,
    minStock: 10,
    location: "",
    categoryId: 0,
    providerId: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "price" || name === "stock" || name === "minStock"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/category`)
      .then((res) => setCategories(res.data));
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/providers`)
      .then((res) => setProviders(res.data));
  }, []);

  useEffect(() => {
    if (isEditing) {
      api
        .get(`${import.meta.env.VITE_APP_BACK_URL}/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => {
          console.error("Error al cargar producto:", err);
          navigate("/productos");
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing
      ? `${import.meta.env.VITE_APP_BACK_URL}/products/${id}`
      : `${import.meta.env.VITE_APP_BACK_URL}/products/create`;

    const method = isEditing ? api.put : api.post;

    const payload = {
      ...product,
      price: Number(Number(product.price).toFixed(2)),
    };

    method(url, payload)
      .then(() => navigate("/productos"))
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
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={product.description}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Stock mínimo"
          name="minStock"
          type="number"
          value={product.minStock}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Ubicación"
          name="location"
          value={product.location}
          onChange={handleInputChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            value={product.categoryId || ''}
            onChange={handleSelectChange}
            required
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="provider-label">Proveedor</InputLabel>
          <Select
            labelId="provider-label"
            name="providerId"
            value={product.providerId || ''}
            onChange={handleSelectChange} // ✅ usa el handler correcto
            required
          >
            {providers.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={product.isActive}
              onChange={handleInputChange}
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
