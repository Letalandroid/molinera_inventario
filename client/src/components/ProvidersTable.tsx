import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { type Provider } from "../types";

interface Props {
  providers: Provider[];
}

export default function ProductTable({ providers }: Props) {

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Contacto</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>{provider.id}</TableCell>
              <TableCell>{provider.name}</TableCell>
              <TableCell>{provider.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
