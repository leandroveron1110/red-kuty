import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./Advantages.module.css";

export default function Advantages() {
  return (
    <section className={styles.container}>
      <div className={styles.earningsBlock}>
        <p className={styles.earningsTitle}>Ganás por cada persona que traés</p>
        <p className={styles.earningsSubtitle}>
          Sin complicarte, con total tranquilidad
        </p>
      </div>

      <br />
      <div className={styles.block}>
        <h3 className={styles.blockTitle}>¿Qué hacés? y ¿Qué no hacés?</h3>
        <ul className={styles.list}>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Solo te encargás de
            conectar gente
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Nada más. Así de
            simple.
          </li>
        </ul>
        <br />
        <ul className={styles.list}>
          <li>
            <FaTimesCircle className={styles.iconTimes} /> No invertís ni un
            peso
          </li>
          <li>
            <FaTimesCircle className={styles.iconTimes} /> No pagás premios
          </li>
          <li>
            <FaTimesCircle className={styles.iconTimes} /> No estás pendiente
            del celular todo el día
          </li>
        </ul>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>¿Qué hago yo por vos?</h3>
        <ul className={styles.list}>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Me encargo de los
            pagos, premios y recargas
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Atiendo mensajes,
            dudas y reclamos de los jugadores
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Verifico identidades
            y documentos si hace falta (KYC)
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Reviso recargas,
            premios y retiros todos los días
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Estoy atento por si
            alguien necesita ayuda
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Me encargo de que
            todo funcione bien y sin problemas
          </li>
          <li>
            <FaCheckCircle className={styles.iconCheck} /> Me encargo de la
            atención 24/7
          </li>
        </ul>
      </div>
    </section>
  );
}
