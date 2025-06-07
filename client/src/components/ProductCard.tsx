import { useNavigate } from "react-router-dom";
import { type Product } from "../types";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>Precio: S/. {product.price}</Typography>
        <Typography>Stock: {product.stock}</Typography>
        <Button variant="outlined" size="small" onClick={handleEdit}>
          Editar
        </Button>
      </CardContent>
    </Card>
  );
}
