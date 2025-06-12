import React from 'react';
import styles from './TournamentPage.module.css';

const winners = [
  { name: 'Jugador1', prize: '🥇 $10,000' },
  { name: 'Jugador2', prize: '🥈 $5,000' },
  { name: 'Jugador3', prize: '🥉 $2,500' },
];

const TournamentPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🏆 ¡Torneo Finalizado!</h1>

      <p className={styles.subtitle}>Felicitamos a nuestros ganadores:</p>
      <ul className={styles.winners}>
        {winners.map((winner, idx) => (
          <li key={idx} className={styles.winner}>
            <span className={styles.name}>{winner.name}</span>
            <span className={styles.prize}>{winner.prize}</span>
          </li>
        ))}
      </ul>

      <div className={styles.separator}></div>

      <p className={styles.nextText}>🎲 ¡Ya podés inscribirte al torneo del mes!</p>
      <button className={styles.button}>Unirme al nuevo torneo</button>
    </div>
  );
};

export default TournamentPage;
