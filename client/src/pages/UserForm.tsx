// src/pages/UserForm.tsx
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

interface User {
  name: string;
  email: string;
  isActive: boolean;
}

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      api
        .get(`${import.meta.env.VITE_APP_BACK_URL}/users/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Error al cargar usuario:", err);
          navigate("/users");
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const url = isEditing
      ? `${import.meta.env.VITE_APP_BACK_URL}/users/${id}`
      : `${import.meta.env.VITE_APP_BACK_URL}/users/create`;

    const method = isEditing ? api.put : api.post;

    method(url, user)
      .then(() => navigate("/users"))
      .catch((err) => console.error("Error al guardar:", err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Editar Usuario" : "Crear Usuario"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={user.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Switch
              checked={user.isActive}
              onChange={handleChange}
              name="isActive"
            />
          }
          label="Activo"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </Box>
      </form>
    </Container>
  );
}
