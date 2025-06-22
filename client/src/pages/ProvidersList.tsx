// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Provider } from "../types";
import api from "../api/api";
import ProvidersTable from "../components/ProvidersTable";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/ProductTable.module.css";

export default function ProvidersList() {
  const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/providers`)
      .then((res) => setProviders(res.data))
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
            Lista de Proveedores
          </Typography>
          <div className={styles.table_items}>
            <ProvidersTable providers={providers} />
          </div>
        </div>
      </Container>
    </>
  );
}
