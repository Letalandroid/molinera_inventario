// src/components/MainNavbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, type MouseEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(
    null
  );
  const openProducts = Boolean(anchorElProducts);

  const [profile, setProfile] = useState<{ name: string } | null>(null);

  const handleProductsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleProductsClose = () => {
    setAnchorElProducts(null);
  };

  const goTo = (path: string) => {
    navigate(path);
    handleProductsClose();
  };

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get(
          `${import.meta.env.VITE_APP_BACK_URL}/users/profile/${parseInt(
            user?.userId || "0"
          )}`
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener el perfil:", err);
        });
    }
  }, [isAuthenticated]);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Inventario Hellen Mabel
        </Typography>

        <Box>
          <Button color="inherit" onClick={handleProductsClick}>
            Productos
          </Button>
          <Menu
            anchorEl={anchorElProducts}
            open={openProducts}
            onClose={handleProductsClose}
          >
            <MenuItem onClick={() => goTo("/products")}>Listar</MenuItem>
            <MenuItem onClick={() => goTo("/products/create")}>Crear</MenuItem>
          </Menu>
        </Box>

        {/* Solo para ADMINISTRADOR */}
        {user?.role === "ADMINISTRADOR" && (
          <Button color="inherit" onClick={() => navigate("/users")}>
            Usuarios
          </Button>
        )}

        {/* Mostrar nombre de usuario si está autenticado */}
        {profile && (
          <Typography variant="body1" sx={{ ml: 2 }}>
            Bienvenido, {profile.name}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
