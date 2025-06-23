import type { ButtonNavProps } from "./Button";
import ButtonNav from "./Button";
import styles from "../../styles/nav/NavLeft.module.css";

interface NavLeftI {
  isOpen: boolean;
}

const NavBarLeft = ({ isOpen }: NavLeftI) => {
  const pages: ButtonNavProps[] = [
    {
      name: "Dashboard",
      icon: "fas fa-chart-line",
      link: "/dashboard",
    },
    {
      name: "Reportes",
      icon: "fas fa-flag",
      link: "/reportes",
    },
    {
      name: "Auditoria",
      icon: "fas fa-audio-description",
      link: "/auditorias",
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
      link: "/movimientos",
    },
  ];

  return (
    <div
      style={isOpen ? { width: "15%" } : { width: 0 }}
      className={styles.navLeft_container}
    >
      <h3 className={styles.navLeft_header}>Inventario</h3>
      <div className={styles.btnContainer}>
        {pages.map((p) => {
          return (
            <ButtonNav key={p.name} name={p.name} icon={p.icon} link={p.link} />
          );
        })}
        <h5 className={styles.subtitle}>Mantenimiento</h5>
        {pages_maintence.map((p) => {
          return (
            <ButtonNav key={p.name} name={p.name} icon={p.icon} link={p.link} />
          );
        })}
      </div>
    </div>
  );
};

export default NavBarLeft;
