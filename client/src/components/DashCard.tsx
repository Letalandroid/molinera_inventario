import styles from "../styles/Dashboard.module.css";

export interface DashProp {
  icon: string;
  name: string;
  count: number;
  color: string;
}

const DashCard = ({ icon, name, count, color }: DashProp) => {
  return (
    <div className={styles.dashboard_container}>
      <div style={{ backgroundColor: color }}>
        <i className={icon}></i>
      </div>
      <p>{name}</p>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default DashCard;
