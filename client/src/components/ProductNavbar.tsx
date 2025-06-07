// src/components/ProductNavbar.tsx
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductNavbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Productos
        </Typography>
        <Button color="inherit" onClick={() => navigate("/products")}>
          Lista
        </Button>
        <Button color="inherit" onClick={() => navigate("/products/create")}>
          Crear
        </Button>
      </Toolbar>
    </AppBar>
  );
}
