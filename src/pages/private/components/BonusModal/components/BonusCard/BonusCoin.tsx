// BonusCoin.tsx
import styles from "./BonusCoin.module.css";
import imgBlue from  '../../../../imgs/ficha azul.png';
import imgBlack from  '../../../../imgs/ficha negra.png';
import imgRed from  '../../../../imgs/ficha roja.png';
import imgPink from  '../../../../imgs/ficha rosa.png';
import imgTurq from  '../../../../imgs/ficha turquesa.png';
import imgGreen from  '../../../../imgs/ficha verde.png';
import imgViolet from  '../../../../imgs/ficha violeta.png';


interface BonusCoinProps {
  revealed: boolean;
  value: string;
  tier: "min" | "minor" | "majo" | "maxi" | "mega" | "gold";
  onClick: () => void;
}

const coinImages: Record<string, string> = {
  default: imgBlack,         // Por si acaso no coincide ninguna
  min: imgBlue,              // valor más bajo
  minor: imgTurq,            // siguiente en valor
  majo: imgGreen,            // valor medio
  maxi: imgViolet,           // valor alto
  mega: imgPink,             // muy alto
  gold: imgRed,              // máximo valor
};

const BonusCoin = ({ revealed, tier, onClick }: BonusCoinProps) => {
  return (
    <div className={styles.flipCardWrapper} onClick={onClick}>
      <div
        className={`${styles.flipCardInner} ${revealed ? styles.revealed : ""}`}
      >
        <div className={styles.flipCardFace}>
          {!revealed ? (
            <img
              src={coinImages.default}
              alt="Moneda oculta"
              className={styles.coinImage}
            />
          ) : (
            <>
              <img
                src={coinImages[tier]}
                alt="Moneda revelada"
                className={`${styles.coinImage} ${styles[`tier-${tier}`]}`}
              />
              <span className={styles.coinValue}>{tier.toUpperCase()}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusCoin;
