// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Movement } from "../types";
import api from "../api/api";
import MovementTable from "../components/MovementTable";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/ProductTable.module.css";

export default function MovementList() {
  const [movements, setMovements] = useState<Movement[]>([]);
  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/movement`)
      .then((res) => setMovements(res.data))
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
            Últimos movimientos
          </Typography>
          <div className={styles.table_items}>
            <MovementTable movements={movements} />
          </div>
        </div>
      </Container>
    </>
  );
}
