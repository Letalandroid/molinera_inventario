// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Product } from "../types";
import api from "../api/api";
import ProductTable from "../components/ProductTable";
import ProductNavbar from "../components/ProductNavbar";
import { Container, Typography } from "@mui/material";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/products/getAll`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <ProductNavbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Productos
        </Typography>
        <ProductTable products={products} />
      </Container>
    </>
  );
}
