import { useEffect, useState } from "react";
import { type User } from "../types";
import api from "../api/api";
import MainNavbar from "../components/nav/MainNavbar";
import { Button, Container } from "@mui/material";
import UserTable from "../components/UserTable";
import styles from "../styles/UserTable.module.css";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    handleUpdateUser();
  }, []);

  const goToCreate = () => {
    navigate("/register");
  };

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
          <div className={styles.header_table}>
            <h3>Lista de Usuarios</h3>
            <Button variant="outlined" color="success" onClick={goToCreate}>
              Crear Usuario
            </Button>
          </div>
          <div className={styles.table_items}>
            <UserTable users={users} onUpdate={handleUpdateUser} />
          </div>
        </div>
      </Container>
    </>
  );
}
