import { useEffect, useState } from "react";
import { type User } from "../types";
import api from "../api/api";
import MainNavbar from "../components/nav/MainNavbar";
import { 
  Button, 
  Container, 
  CircularProgress, 
  Box, 
  Alert 
} from "@mui/material";
import UserTable from "../components/UserTable";
import styles from "../styles/UserTable.module.css";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleUpdateUser();
  }, []);

  const goToCreate = () => {
    navigate("/register");
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get(`${import.meta.env.VITE_APP_BACK_URL}/users/getAll`);
      setUsers(res.data);
      
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <MainNavbar />
        <Container maxWidth="lg">
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="400px"
          >
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainNavbar />
        <Container maxWidth="lg">
          <Box mt={4}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={handleUpdateUser}>
                  Reintentar
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <MainNavbar />
      <Container maxWidth="lg">
        <div className={styles.table_container}>
          <div className={styles.header_table}>
            <h3>Lista de Usuarios ({users.length})</h3>
            <Box display="flex" gap={2}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleUpdateUser}
              >
                Actualizar
              </Button>
              <Button 
                variant="outlined" 
                color="success" 
                onClick={goToCreate}
              >
                Crear Usuario
              </Button>
            </Box>
          </div>
          <div className={styles.table_items}>
            <UserTable 
              users={users} 
              onUpdate={handleUpdateUser}
            />
          </div>
        </div>
      </Container>
    </>
  );
}