import type { ButtonNavProps } from "./Button";
import ButtonNav from "./Button";
import styles from "../../styles/nav/NavLeft.module.css";

//
const NavBarLeft = () => {


  const pages: ButtonNavProps[] = [
    {
      name: "Dashboard",
      icon: "fas fa-chart-line",
      link: "/dashboard",
    },
    {
      name: "Reportes",
      icon: "fas fa-flag",
      // link: "/reportes",
      link: "#",
    },
    {
      name: "Auditoria",
      icon: "fas fa-audio-description",
      // link: "/auditorias",
      link: "#",
    },
  ];

  const pages_maintence: ButtonNavProps[] = [
    {
      name: "Proveedores",
      icon: "fas fa-truck",
      link: "/proveedores",
    },
    {
      name: "Productos",
      icon: "fas fa-box",
      link: "/productos",
    },
    {
      name: "Gestión de usuarios",
      icon: "fas fa-users",
      link: "/usuarios",
    },
    {
      name: "Entrada y salida",
      icon: "fas fa-industry",
      // link: "/movimientos",
      link: "#",
    },
  ];

  return (
    <div className={styles.navLeft_container}>
      <h3 className={styles.navLeft_header}>Inventario</h3>
      <div className={styles.btnContainer}>
        {pages.map((p) => {
          return <ButtonNav name={p.name} icon={p.icon} link={p.link} />;
        })}
        <h5 className={styles.subtitle}>Mantenimiento</h5>
        {pages_maintence.map((p) => {
          return <ButtonNav name={p.name} icon={p.icon} link={p.link} />;
        })}
      </div>
    </div>
  );
};

export default NavBarLeft;
