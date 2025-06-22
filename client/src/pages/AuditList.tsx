// src/pages/ProductList.tsx
import { useEffect, useState } from "react";
import { type Audit } from "../types";
import api from "../api/api";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/ProductTable.module.css";
import AuditTable from "../components/AuditTable";

export default function AuditList() {
  const [audits, setAudits] = useState<Audit[]>([]);
  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/audit-log`)
      .then((res) => setAudits(res.data))
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
            <AuditTable audits={audits} />
          </div>
        </div>
      </Container>
    </>
  );
}
