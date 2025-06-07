import { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { type UserLogin } from "../types";

export default function Login() {
  const [form, setForm] = useState<UserLogin>({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`${import.meta.env.VITE_APP_BACK_URL}/auth/login`, form);
      const token: string = res.data.token;
      login(token);
      navigate("/products");
    } catch (error) {
      alert("Error en el login" + error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" fullWidth>
        Iniciar sesión
      </Button>
    </Box>
  );
}
