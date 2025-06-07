// components/ProductCard.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { type Product } from "../types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
      </CardContent>
    </Card>
  );
}
