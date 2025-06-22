// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Product } from "../types";
import api from "../api/api";
import ProductTable from "../components/ProductTable";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/ProductTable.module.css";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        {" "}
        {/* más ancho que "sm" */}
        <div className={styles.table_container}>
          <Typography variant="h5" gutterBottom>
            Lista de Productos
          </Typography>
          <div className={styles.table_items}>
            <ProductTable products={products} />
          </div>
        </div>
      </Container>
    </>
  );
}
