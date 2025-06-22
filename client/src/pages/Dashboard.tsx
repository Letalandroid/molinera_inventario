import api from "../api/api";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import styles from "../styles/Dashboard.module.css";
import type { DashProp } from "../components/DashCard";
import DashCard from "../components/DashCard";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [dashItem, setDashItem] = useState<DashProp[]>([]);
    useEffect(() => {
      api
        .get(`${import.meta.env.VITE_APP_BACK_URL}/dashboard`)
        .then((res) => setDashItem(res.data))
        .catch((err) => console.error(err));
    }, []);

  const dashItems: DashProp[] = [
    {
      icon: "fas fa-truck",
      name: "Proveedores",
      count: 0,
    },
  ];

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <Typography variant="h5" gutterBottom>
            Dashboard
          </Typography>
          <div>
            {dashItems.map((item) => {
              return (
                <DashCard
                  name={item.name}
                  icon={item.icon}
                  count={item.count}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
