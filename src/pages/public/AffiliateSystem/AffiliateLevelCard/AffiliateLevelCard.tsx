import React from "react";
import styles from "./AffiliateLevelCard.module.css";
import { AffiliateLevel, Rules } from "../types/AffiliateLevel";
import CountUp from "react-countup";
import { LuCalendarCheck2, LuCalendarDays, LuCoins } from "react-icons/lu";
import { sendWhatsapp } from "../../../../utilities/whatsapp";

type Props = {
  level: AffiliateLevel;
};

const AffiliateLevelCard: React.FC<Props> = ({ level }) => {
  const simulateDaily = (deposit: number) => {
    const variation = 0.2; // ±20%
    const randomFactor = 1 + (Math.random() * 2 - 1) * variation;
    return deposit * randomFactor;
  };

  const totalDaily = level.examples.reduce(
    (sum, e) => sum + e.deposit * (level.percentage / 100),
    0
  );

  const totalWeekly = Array.from({ length: 7 }).reduce((sum: number) => {
    const dailyTotal = level.examples.reduce(
      (daySum, e) =>
        daySum + simulateDaily(e.deposit) * (level.percentage / 100),
      0
    );
    return sum + dailyTotal;
  }, 0);

  const totalMonthly = Array.from({ length: 30 }).reduce((sum: number) => {
    const dailyTotal = level.examples.reduce(
      (daySum, e) =>
        daySum + simulateDaily(e.deposit) * (level.percentage / 100),
      0
    );
    return sum + dailyTotal;
  }, 0);

  return (
    <div className={styles.card}>
      <h2 className={styles.levelTitle}>{level.title}</h2>

      <div className={styles.rules}>
        {level.rules.map((rule: Rules, idx) => (
          <div key={idx} className={styles.infoCard}>
            <div className={styles.infoIcon}>{rule.icon}</div>
            <div className={styles.infoText}>{rule.name}</div>
          </div>
        ))}
      </div>

      <div className={styles.totalsGrid}>
        <div className={styles.totalCard}>
          <LuCoins className={styles.totalIcon} />
          <p className={styles.totalLabel}>Ganancia diaria</p>
          <p className={styles.totalValue}>
            <CountUp
              end={totalDaily}
              duration={2}
              prefix="$"
              separator="."
              decimals={0}
            />
          </p>
        </div>

        <div className={styles.totalCard}>
          <LuCalendarDays className={styles.totalIcon} />
          <p className={styles.totalLabel}>Ganancia semanal</p>
          <p className={styles.totalValue}>
            <CountUp
              end={totalWeekly}
              duration={2}
              prefix="$"
              separator="."
              decimals={0}
            />
          </p>
        </div>

        <div className={styles.totalCard}>
          <LuCalendarCheck2 className={styles.totalIcon} />
          <p className={styles.totalLabel}>Ganancia mensual</p>
          <p className={styles.totalValue}>
            <CountUp
              end={totalMonthly}
              duration={2}
              prefix="$"
              separator="."
              decimals={0}
            />
          </p>
        </div>
      </div>

      <div
        onClick={() => {
          sendWhatsapp(
            `Hola, me interesa el nivel "${
              level.title
            }". Vi que podría ganar hasta $${Math.round(
              totalMonthly
            ).toLocaleString("es-AR")}/mes. ¿Cómo empiezo?`
          );
        }}
        className={styles.callToAction}
      >
        ¡Comenzá hoy y maximizá tus ganancias desde el primer día!
      </div>
    </div>
  );
};

export default AffiliateLevelCard;
