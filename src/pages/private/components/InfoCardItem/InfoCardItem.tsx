import React from "react";
import styles from "./InfoCardItem.module.css";

interface InfoCardItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
  onClick?: () => void;
}

const InfoCardItem: React.FC<InfoCardItemProps> = ({
  icon,
  label,
  value,
  onClick,
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      className={`${styles.item} ${isClickable ? styles.clickable : ""}`}
      onClick={onClick}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.textContent}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};

export default InfoCardItem;
