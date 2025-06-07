import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Box,
} from "@mui/material";
import { type User } from "../types";

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Correo</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Rol</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: user.isActive
                      ? "success.main"
                      : "error.main",
                    color: "white",
                    px: 0.8,
                    py: 0.4,
                    fontSize: 13,
                    borderRadius: "5px",
                    display: "inline-block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {user.isActive ? "Activo" : "Inactivo"}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
