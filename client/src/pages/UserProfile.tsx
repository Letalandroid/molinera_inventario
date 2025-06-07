import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get(`${import.meta.env.VITE_APP_BACK_URL}/users/profile/${id}`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [id]);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Perfil de {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>DNI:</strong> {user.dni}</p>
      <p><strong>Rol:</strong> {user.role}</p>
      <p><strong>Activo:</strong> {user.isActive ? "Sí" : "No"}</p>
    </div>
  );
}
