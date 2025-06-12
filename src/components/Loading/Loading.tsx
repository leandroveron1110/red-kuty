import styles from './Loading.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.glowRing}>
        <span className={styles.glow}></span>
        <span className={styles.glow}></span>
        <span className={styles.glow}></span>
        <span className={styles.glow}></span>
      </div>
      <h2 className={styles.text}>Cargando Casino...</h2>
    </div>
  );
};

export default Loader;
