import { useState, useContext } from "react";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext"; // ✅ nombre correcto
import { useNavigate } from "react-router-dom";
import { type UserLogin } from "../types";

export default function Login() {
  const [form, setForm] = useState<UserLogin>({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // ✅ usa login desde el contexto
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(`${import.meta.env.VITE_APP_BACK_URL}/auth/login`, form);
      const token: string = res.data.token;

      login(token); // ✅ guarda el token en contexto + cookies

      // Aquí puedes redirigir según el rol si deseas:
      const decoded = JSON.parse(atob(token.split('.')[1])); // decodifica payload base64
      if (decoded.role === "ADMINISTRADOR") {
        navigate("/admin");
      } else if (decoded.role === "EMPLEADO") {
        navigate("/productos");
      } else {
        setError("Tu cuenta no tiene acceso.");
      }

    } catch (err: any) {
      if (err.response?.status === 401) {
        setError(err.response?.data?.message ?? "Correo o contraseña incorrectos.");
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Iniciar sesión
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="email"
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Iniciar sesión
      </Button>
    </Box>
  );
}
