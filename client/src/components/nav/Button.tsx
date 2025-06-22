import styles from '../../styles/nav/ButtonNav.module.css';

export interface ButtonNavProps {
  name: string;
  icon: string;
  link: string;
}

const ButtonNav = ({ name, icon, link }: ButtonNavProps) => {
  return (
    <div className={styles.btn_nav}>
      <i className={icon}></i>
      <a href={link}>{name}</a>
    </div>
  );
};

export default ButtonNav;