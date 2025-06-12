import Header from "../../../components/Header/Header";
import BonusLocos from "./components/BonusLocos/BonusLocos";
import ReferralSection from "./components/ReferralSection/ReferralSection";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Bienvenido a la  <span className={styles.highlight}>Red Kuty</span></h1>
      </header>
      <ReferralSection /> 

      <BonusLocos />


      <footer className={styles.footer}>
        <p>
          ¿Necesitás ayuda?{" "}
          <a
            href="https://wa.me/5493442672449"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribinos por WhatsApp
          </a>
        </p>
      </footer>
    </main>
    <Header />
    </>
  );
};

export default Home;
