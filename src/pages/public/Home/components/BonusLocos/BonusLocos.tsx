import styles from './BonusLocos.module.css';
import { FaGift, FaCoins } from 'react-icons/fa';

const BonusLocos = () => {
  return (
    <section className={styles.bonusContainer}>
      <h2 className={styles.title}>BONUS LOCOS – DÍAS DE SEMANA</h2>
      <p className={styles.subtitle}>
        ¡Cargá crédito y obtené bonus automáticos! <br />
        📅 Promo válida de lunes a viernes.
      </p>

      <div className={styles.bonusList}>
        <div><FaCoins /><span>$100 – $499</span><span className={styles.percent}>+2%</span></div>
        <div><FaCoins /><span>$500 – $1.499</span><span className={styles.percent}>+5%</span></div>
        <div><FaCoins /><span>$1.500 – $4.999</span><span className={styles.percent}>+10%</span></div>
        <div><FaCoins /><span>$5.000 – $9.999</span><span className={styles.percent}>+20%</span></div>
        <div><FaCoins /><span>$10.000 – $19.999</span><span className={styles.percent}>+30%</span></div>
        <div><FaCoins /><span>$20.000 – $29.999</span><span className={styles.percent}>+40%</span></div>
        <div><FaGift /><span>$30.000 o más</span><span className={styles.percent}>+50%</span></div>
      </div>

      <p className={styles.footer}>
        ⚡ Promo válida solo en días hábiles.<br />
        💸 Cargas ilimitadas con bonus automáticos.
      </p>
    </section>
  );
};

export default BonusLocos;
