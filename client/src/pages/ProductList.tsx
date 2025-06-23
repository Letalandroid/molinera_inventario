// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Product } from "../types";
import api from "../api/api";
import ProductTable from "../components/ProductTable";
import MainNavbar from "../components/nav/MainNavbar";
import { Button, Container, Typography } from "@mui/material";
import styles from "../styles/ProductTable.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const goToCreate = () => {
    navigate("/products/create");
  };

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        {" "}
        {/* más ancho que "sm" */}
        <div className={styles.table_container}>
          <div className={styles.header_table}>
            <h3>
              Lista de Productos
            </h3>
            <Button variant="outlined" color="success" onClick={goToCreate}>
              Crear producto
            </Button>
          </div>
          <div className={styles.table_items}>
            <ProductTable products={products} />
          </div>
        </div>
      </Container>
    </>
  );
}
