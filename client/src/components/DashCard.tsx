import styles from "../styles/Dashboard.module.css";

export interface DashProp {
  icon: string;
  name: string;
  count: number;
}

const DashCard = ({ icon, name, count }: DashProp) => {
  return (
    <div className={styles.dashboard_container}>
      <div>
        <i className={icon}></i>
      </div>
      <p>{name}</p>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default DashCard;
