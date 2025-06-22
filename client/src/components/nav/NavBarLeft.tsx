import type { ButtonNavProps } from "./Button";
import ButtonNav from "./Button";
import styles from '../../styles/nav/NavLeft.module.css';

//
const NavBarLeft = () => {
  const pages: ButtonNavProps[] = [
    {
      name: "Dashboard",
      icon: "fas fa-chart-line",
      link: "/",
    },
  ];

  return (
    <div className={styles.navLeft_container}>
      <h3 className={styles.navLeft_header}>Inventario</h3>
      <div>
        {pages.map((p) => {
          return <ButtonNav name={p.name} icon={p.icon} link={p.link} />;
        })}
      </div>
    </div>
  );
};

export default NavBarLeft;
