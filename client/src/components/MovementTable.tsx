import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { type Movement } from "../types";

interface Props {
  movements: Movement[];
}

export default function MovementTable({ movements }: Props) {
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Cantidad</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Día</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {movements.map((movement) => (
            <TableRow key={`${movement.productName} - ${movement.date}`}>
              <TableCell>{movement.type}</TableCell>
              <TableCell>{movement.userName}</TableCell>
              <TableCell>{movement.productName}</TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>
                {`${new Date(movement.date).toLocaleDateString()}
                ${new Date(movement.date).toLocaleTimeString()}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
