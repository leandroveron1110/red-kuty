import { Link } from "react-router-dom";
import styles from "./ReferralSection.module.css";
import { PublicRoutes } from "../../../../../routes/routes";

const ReferralSection = () => {
  return (
    <section className={styles.referralSection}>
      <div className={styles.referralContent}>
        <div className={styles.textBlock}>
          <h2>¡Conectá & Ganá con Kuty!</h2>
          <p>
            Invitá a tus amigos a sumarse a <strong>Kuty</strong> y obtené
            comisiones cada vez que ellos recarguen saldo. <br />
            Cuantos más invites
            <br />
            <span className={styles.highlight}>¡más ganás!</span>
          </p>
        </div>
          <Link
            to={`/${PublicRoutes.PUBLIC}/${PublicRoutes.BENEFITS}`}
            className={styles.referralButton}
          >
            VER COMO FUNCIONA
          </Link>
      </div>
    </section>
  );
};

export default ReferralSection;
