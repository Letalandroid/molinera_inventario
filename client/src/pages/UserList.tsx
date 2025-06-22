import { useEffect, useState } from "react";
import { type User } from "../types";
import api from "../api/api";
import MainNavbar from "../components/nav/MainNavbar";
import { Container, Typography } from "@mui/material";
import UserTable from "../components/UserTable";
import styles from "../styles/UserTable.module.css";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleUpdateUser();
  }, []);

  const handleUpdateUser = () => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/users/getAll`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        {" "}
        {/* más ancho que "sm" */}
        <div className={styles.table_container}>
          <Typography variant="h5" gutterBottom>
            Lista de Usuarios
          </Typography>
          <div className={styles.table_items}>
            <UserTable users={users} onUpdate={handleUpdateUser} />
          </div>
        </div>
      </Container>
    </>
  );
}
