import { useEffect, useState } from "react";
import { type User } from "../types";
import api from "../api/api";
import MainNavbar from "../components/MainNavbar";
import { Container, Typography } from "@mui/material";
import UserTable from "./UserTable";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_APP_BACK_URL}/users/getAll`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <MainNavbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Usuarios
        </Typography>
        <UserTable users={users} />
      </Container>
    </>
  );
}
