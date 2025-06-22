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

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <h2 className={styles.h2}>
            Dashboard
          </h2>
          <div className={styles.container_items}>
            {dashItem.map((item) => {
              return (
                <DashCard
                  name={item.name}
                  icon={item.icon}
                  count={item.count}
                  color={item.color}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}
