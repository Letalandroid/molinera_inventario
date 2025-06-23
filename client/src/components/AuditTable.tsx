import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { type Audit } from "../types";

interface Props {
  audits: Audit[];
}

export default function AuditTable({ audits }: Props) {
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Acción</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell>{audit.id}</TableCell>
              <TableCell>{audit.userName}</TableCell>
              <TableCell>
                {audit.action.slice(0, 100)}
                {audit.action.length > 100 ? "..." : ""}
              </TableCell>
              <TableCell>
                {`${new Date(audit.timestamp).toLocaleDateString()}
                ${new Date(audit.timestamp).toLocaleTimeString()}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
