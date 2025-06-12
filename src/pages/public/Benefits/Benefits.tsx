import Header from "../../../components/Header/Header";
import styles from "./Benefits.module.css";
import { FaTrophy, FaGift, FaPiggyBank, FaUserPlus } from "react-icons/fa";

const benefitsData = [
  {
    icon: <FaTrophy />,
    title: "Torneos Mensuales",
    description:
      "Participá en torneos mensuales y mini torneos semanales. Acumulá puntos para ganar premios en efectivo, fichas o beneficios exclusivos.",
    color: "orange",
  },
  {
    icon: <FaPiggyBank />,
    title: "Fondo Acumulado Personal",
    description:
      "El 10% de cada carga se guarda en tu fondo. A fin de mes se sortea qué porcentaje te llevás.",
    color: "pink",
  },
  {
    icon: <FaGift />,
    title: "Lista de Bonos",
    description:
      "Accedé a fichas bonus, porcentajes extra, cashback o puntos de torneo en promociones exclusivas.",
    color: "green",
  },
  {
    icon: <FaUserPlus />,
    title: "Sistema de Referidos",
    description:
      "Invitá amigos y ganá fichas bonus por sus cargas durante los primeros 10 días.",
    color: "blue",
  },
];

const Benefits = () => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Formas de Ganar Más</h2>
        <div className={styles.cardGrid}>
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles[`card-${benefit.color}`]}`}
            >
              <div className={styles.icon}>
                <span>{benefit.icon}</span>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
              </div>
              <p className={styles.description}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>

      </div>

      <Header />
    </>
  );
};

export default Benefits;
