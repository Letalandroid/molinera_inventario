import { useNavigate } from "react-router-dom";
import styles from "../../styles/nav/ButtonNav.module.css";

export interface ButtonNavProps {
  name: string;
  icon: string;
  link: string;
}

const ButtonNav = ({ name, icon, link }: ButtonNavProps) => {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.btn_nav}>
      <i className={icon}></i>
      <a onClick={() => goTo(link)}>{name}</a>
    </div>
  );
};

export default ButtonNav;
