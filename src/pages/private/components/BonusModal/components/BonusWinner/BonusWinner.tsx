import { useEffect } from 'react';
import styles from './BonusWinner.module.css';

interface BonusWinnerProps {
  prize: string;
  tier: 'min' | 'minor' | 'majo' | 'maxi' | 'mega' | 'gold';
  onClaim: () => void;
}

const tierNames: Record<string, string> = {
  min: 'Bono Mínimo',
  majo: 'Bono Mayor',
  maxi: 'Bono Máximo',
  mega: 'Bono Mega',
  gold: 'Bono Dorado',
};

const BonusWinner = ({ prize, tier, onClaim }: BonusWinnerProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClaim();
    }, 3000);

    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta antes
  }, [onClaim]);

  return (
    <div
      className={`${styles.container} ${styles[`tier-${tier}`]}`}
      onClick={onClaim}
    >
      <div className={styles.glow}></div>
      <div className={styles.confetti}></div>

      <div className={styles.content}>
        <h2 className={styles.title}>¡Ganaste un bono!</h2>

        <span className={`${styles.tierLabel} ${styles[`tierLabel-${tier}`]}`}>
          {tierNames[tier]}
        </span>

        <div className={styles.prizeReveal}>
          <span className={`${styles.prize}`}>
            {prize}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BonusWinner;
