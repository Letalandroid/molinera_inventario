import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { type Provider } from "../types";

interface Props {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (id: number) => void;
}

export default function ProvidersTable({ providers, onEdit, onDelete }: Props) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Contacto</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell>{provider.id}</TableCell>
            <TableCell>{provider.name}</TableCell>
            <TableCell>{provider.contact}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(provider)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(provider.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
