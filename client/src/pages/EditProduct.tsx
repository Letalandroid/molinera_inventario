import { useParams } from "react-router-dom";
import changeTitle from "../utils/changeTitle";

export default function EditProduct() {
  const { id } = useParams();
  changeTitle("Editar producto");

  // Aquí iría la lógica para cargar el producto, editarlo, etc.
  return <div>Editando producto ID: {id}</div>;
}
