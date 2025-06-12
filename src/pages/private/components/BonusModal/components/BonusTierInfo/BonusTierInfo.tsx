import styles from "./BonusTierInfo.module.css";

interface BonusPrize {
  label: string;
  tier: "min" | 'minor' | "majo" | "maxi" | "mega" | "gold";
  weight: number;
}

interface BonusTierInfoProps {
  prizes: BonusPrize[];
  winner: string | null; // ← nuevo
}

const BonusTierInfo = ({ prizes, winner }: BonusTierInfoProps) => {
  const prizesByTier = prizes.reduce<Record<string, Set<string>>>(
    (acc, prize) => {
      if (!acc[prize.tier]) acc[prize.tier] = new Set();
      acc[prize.tier].add(prize.label);
      return acc;
    },
    {}
  );

  const tierNames: Record<string, string> = {
    min: "MIN",
    majo: "MAJOR",
    maxi: "MAXI",
    mega: "MEGA",
    gold: "GOLD",
  };

  return (
    <section className={styles.tierInfo}>
      <h4 className={styles.tierTitle}>Posibles Premios</h4>
      <div className={styles.tierList}>
        {Object.entries(prizesByTier).reverse().map(([tier, labels]) => (
          <div
            key={tier}
            className={`${styles.tierCard} ${styles[`tier-${tier}`]}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.tierLabel}>
                {tierNames[tier] || tier.toUpperCase()}
              </span>
            </div>
            <ul className={styles.labelList}>
              {[...labels].map((label) => (
                <li
                  key={label}
                  className={`${styles.labelItem} ${
                    winner === label ? styles.winnerItem : ""
                  }`}
                >
                {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BonusTierInfo;
