// src/components/MainNavbar.tsx
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, type MouseEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import styles from "../../styles/nav/NavMain.module.css";
import user_img from "../../assets/user.webp";
import NavBarLeft from "./NavBarLeft";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);

  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(
    null
  );
  const openProducts = Boolean(anchorElProducts);

  const [profile, setProfile] = useState<{ name: string } | null>(null);

  const handleProductsClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleProductsClose = () => {
    setAnchorElProducts(null);
  };

  const goTo = (path: string) => {
    navigate(path);
    handleProductsClose();
  };

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get(
          `${import.meta.env.VITE_APP_BACK_URL}/users/profile/${parseInt(
            user?.userId || "0"
          )}`
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener el perfil:", err);
        });
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.nav_container}>
      <NavBarLeft />
      <div className={styles.navSup_container}>
        <div className={styles.icon_menu_container}>
          <i className="fas fa-bars"></i>
          <h4>Inventario Hellen Mabel</h4>
        </div>

        <div className={styles.navSup_user}>
          {/* Mostrar nombre de usuario si está autenticado */}
          {profile && (
            <div className={styles.navProfile}>
              <img src={user_img} />
              <p>{profile.name}</p>
              <i className="fas fa-caret-down"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
