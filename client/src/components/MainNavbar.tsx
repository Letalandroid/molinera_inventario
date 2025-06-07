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
import { useState, type MouseEvent, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(
    null
  );
  const openProducts = Boolean(anchorElProducts);

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

        {isAuthenticated && user?.role === "ADMINISTRADOR" && (
          <Box ml={2}>
            <Button color="inherit" onClick={() => navigate("/users")}>
              Usuarios
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
