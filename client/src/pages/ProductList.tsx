import { useEffect, useState } from "react";
import { type Product } from "../types";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { Container, Grid } from "@mui/material";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/products/getAll`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
