import React from "react";
import styles from "./InfoCard.module.css";

interface ButtonProps {
  name: string;
  onClick?: () => void;
}

interface InfoCardItemProps {
  label: string;
  value?: string | number;
  button?: ButtonProps;
}

const InfoCard: React.FC<InfoCardItemProps> = ({ label, value, button }) => {
  return (
    <div className={`${styles.item}`}>
      <div className={styles.textContent}>
        <span className={styles.label}>{label.toLocaleUpperCase()}</span>
        <span className={styles.value}>{value}</span>
        {button && (
          <button className={styles.infoButton} onClick={button.onClick}>
            {button.name.toLocaleUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
