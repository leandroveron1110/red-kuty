import styles from "./Button.module.css";

interface ButtonProps {
  name: string;
  onClick: () => void;
  color?: string; // color opcional
}

const Button = ({ name, onClick, color }: ButtonProps) => {
  return (
    <button
      className={styles.infoButton}
      style={{ backgroundColor: color || "var(--title-pink)" }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
