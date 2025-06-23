// src/components/MainNavbar.tsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import styles from "../../styles/nav/NavMain.module.css";
import user_img from "../../assets/user.webp";
import NavBarLeft from "./NavBarLeft";
import { useNavigate } from "react-router-dom";

export default function MainNavbar() {
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  const [closedSession, setClosedSession] = useState(false);
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ name: string } | null>(null);

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

  const closed_session = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.nav_container}>
      <NavBarLeft />
      <div className={styles.navSup_container}>
        <div className={styles.icon_menu_container}>
          <i className="fas fa-bars"></i>
          <h4>Inventario Hellen Mabel</h4>
        </div>

        <div className={styles.navSup_user}>
          {profile && (
            <div className={styles.profile_container}>
              <div
                onClick={() => setClosedSession(!closedSession)}
                className={styles.user_data}
              >
                <img src={user_img} />
                <p>{profile.name}</p>
                <i
                  style={
                    !closedSession
                      ? { transform: "rotateZ(0)" }
                      : { transform: "rotateZ(180deg)" }
                  }
                  className="fas fa-caret-down"
                ></i>
              </div>
              <div
                onClick={() => closed_session()}
                style={!closedSession ? { height: 0 } : { height: 35 }}
                className={styles.closed_session}
              >
                <p>Cerrar sesión</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
