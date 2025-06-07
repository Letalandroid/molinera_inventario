import { useParams } from 'react-router-dom';

export default function EditProduct() {
  const { id } = useParams();

  // Aquí iría la lógica para cargar el producto, editarlo, etc.
  return <div>Editando producto ID: {id}</div>;
}
