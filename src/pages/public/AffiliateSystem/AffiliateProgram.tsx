import { AffiliateLevel } from "./types/AffiliateLevel";
import AffiliateLevelCard from "./AffiliateLevelCard/AffiliateLevelCard";
import { FaClock, FaMoneyBillWave, FaUserPlus } from "react-icons/fa";
import Header from "../../../components/Header/Header";
import styles from "./AffiliateProgram.module.css";
import Advantages from "./Advantages/Advantages";
import { useEffect } from "react";

const conect: AffiliateLevel[] = [
  {
    title: "Conecta",
    range: "1 a 10 conexiones",
    percentage: 10,
    toleranceDays: 5,
    rules: [
      {
        icon: <FaUserPlus />,
        name: "Da tu primer paso conectando entre 1 y 10 personas.",
      },
      {
        icon: <FaMoneyBillWave />,
        name: "Cobrás el 10% de cada depósito de tus conexiones.",
      },
      {
        icon: <FaClock />,
        name: "Tus conexiones tienen 5 días para volver a depositar.",
      },
    ],
    examples: [
      {
        deposit: 8000 * 10,
        name: "lea",
      },
    ],
  },
  {
    title: "Impulsa",
    range: "11 a 30 conexiones",
    percentage: 15,
    toleranceDays: 6,
    rules: [
      {
        icon: <FaUserPlus />,
        name: "Empezá a crecer conectando entre 11 y 30 personas.",
      },
      {
        icon: <FaMoneyBillWave />,
        name: "Cobrás el 15% de cada depósito de tus conexiones.",
      },
      {
        icon: <FaClock />,
        name: "Tus conexiones tienen 6 días para volver a depositar.",
      },
    ],
    examples: [
      {
        deposit: 8000 * 30,
        name: "lea",
      },
    ],
  },
  {
    title: "Potencia",
    range: "31 a 60 conexiones",
    percentage: 20,
    toleranceDays: 7,
    rules: [
      {
        icon: <FaUserPlus />,
        name: "Conectá entre 31 y 60 personas para potenciar tu red.",
      },
      {
        icon: <FaMoneyBillWave />,
        name: "Cobrás el 20% de cada depósito de tus conexiones.",
      },
      {
        icon: <FaClock />,
        name: "Tus conexiones tienen 7 días para volver a depositar.",
      },
    ],
    examples: [
      {
        deposit: 8000 * 60,
        name: "lea",
      },
    ],
  },
  {
    title: "Triunfa",
    range: "61 a 100 conexiones",
    percentage: 25,
    toleranceDays: 8,
    rules: [
      {
        icon: <FaUserPlus />,
        name: "Conectá entre 61 y 100 personas y consolidá tu éxito.",
      },
      {
        icon: <FaMoneyBillWave />,
        name: "Cobrás el 25% de cada depósito de tus conexiones.",
      },
      {
        icon: <FaClock />,
        name: "Tus conexiones tienen 8 días para volver a depositar.",
      },
    ],
    examples: [
      {
        deposit: 8000 * 100,
        name: "lea",
      },
    ],
  },
  {
    title: "Maximiza",
    range: "101 o más conexiones",
    percentage: 30,
    toleranceDays: 10,
    rules: [
      {
        icon: <FaUserPlus />,
        name: "Conectá más de 100 personas y maximizá tus ganancias.",
      },
      {
        icon: <FaMoneyBillWave />,
        name: "Cobrás el 30% de cada depósito de tus conexiones.",
      },
      {
        icon: <FaClock />,
        name: "Tus conexiones tienen 10 días para volver a depositar.",
      },
    ],
    examples: [
      {
        deposit: 8000 * 200,
        name: "lea",
      },
    ],
  },
];

const AffiliateProgram = () => {

   useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className={styles.program}>
        <h1 className={styles.title}>Conecta y ganá</h1>
        <p className={styles.subtitle}>
          Unite a nuestro programa y empezá a ganar comisiones por cada conexión que realices.
        </p>

        <Advantages />

        <div className={styles.levelsContainer}>
          {conect.length > 0 ? (
            conect.map((level, i) => (
              <AffiliateLevelCard key={i} level={level} />
            ))
          ) : (
            <p className={styles.noLevels}>
              No hay niveles disponibles por el momento.
            </p>
          )}
        </div>
      </section>

      <Header />
    </>
  );
};

export default AffiliateProgram;
