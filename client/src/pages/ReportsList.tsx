// src/pages/MovementList.tsx
import { useEffect, useState } from "react";
import { type Movement } from "../types";
import api from "../api/api";
import ReportsTable from "../components/ReportsTable";
import MainNavbar from "../components/nav/MainNavbar";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import styles from "../styles/ProductTable.module.css";

export default function ReportsList() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [startDate, setStartDate] = useState("2023-06-01");
  const [endDate, setEndDate] = useState("2025-06-22");

  const handleFilter = async () => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_APP_BACK_URL}/products/filter`,
        {
          startDate,
          endDate,
        }
      );
      setMovements(res.data);
    } catch (err) {
      console.error("Error al filtrar movimientos", err);
    }
  };

  const handleDownloadMovementsReport = async () => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_APP_BACK_URL}/reports/movements`,
        {
          startDate,
          endDate,
        }
      );

      const publicUrl = res.data.publicUrl;

      // Crear un <a> y simular clic para descarga
      const a = document.createElement("a");
      a.href = publicUrl;
      a.download = `Reporte_Movimientos_${Date.now()}.xlsx`;
      a.target = "_blank"; // Opcional: abre en nueva pestaña
      a.click();
      a.remove();
    } catch (err) {
      console.error("Error al descargar reporte de movimientos", err);
    }
  };

  const handleDownloadStockReport = async () => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_APP_BACK_URL}/reports/stocks`
      );

      const publicUrl = res.data.publicUrl;

      // Crear un <a> y simular clic para descarga
      const a = document.createElement("a");
      a.href = publicUrl;
      a.download = `Reporte_Stocks_${Date.now()}.xlsx`;
      a.target = "_blank"; // Opcional: abre en nueva pestaña
      a.click();
      a.remove();
    } catch (err) {
      console.error("Error al descargar reporte de stock", err);
    }
  };

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <Typography variant="h5" gutterBottom>
            Reportes
          </Typography>

          {/* Filtros de fechas */}
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              type="date"
              label="Desde"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              type="date"
              label="Hasta"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Buscar
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleDownloadMovementsReport}
            >
              Descargar movimientos
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDownloadStockReport}
            >
              Descargar stock
            </Button>
          </Stack>

          {/* Tabla de resultados */}
          <div className={styles.table_items}>
            <ReportsTable movements={movements} />
          </div>
        </div>
      </Container>
    </>
  );
}
