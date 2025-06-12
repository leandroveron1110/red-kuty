// BonusInstructions.tsx
import Button from "../../../../../../components/Button/Button";
import styles from "./BonusInstructions.module.css";
import { FaTimes } from "react-icons/fa";

interface BonusInstructionsProps {
  onClose: () => void;
}

const BonusInstructions = ({ onClose }: BonusInstructionsProps) => {
  return (
    <div className={styles.instructions}>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      <h3>¿Cómo se juega?</h3>
      <ol>
        <li>Haz clic en las tarjetas para darlas vuelta.</li>
        <li>Cuando encuentres 3 iguales, ¡ganás ese premio!</li>
        <li>Luego podrás reclamarlo por WhatsApp.</li>
      </ol>
      <p className={styles.tip}>
        <strong>Ojo:</strong> ¡Jugá una vez por día!
      </p>
      <div className={styles.containerPlayButton}>
        <Button name={"COMENZAR"} onClick={onClose} />
      </div>
    </div>
  );
};

export default BonusInstructions;
