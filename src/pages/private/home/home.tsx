import { useEffect, useState } from "react";
import styles from "./home.module.css";
// import { FaWallet } from "react-icons/fa";
import homeService, {
  Tournament,
  UserTournamentSummary,
} from "./services/home.service";
import Header from "../../../components/Header/Header";
import { PrivateRoutes, PrivateRoutesHttp } from "../../../routes/routes";
import { useAppSelector } from "../../../redux/hooks";
// import InfoCardItem from "../components/InfoCardItem/InfoCardItem";
import Loader from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import BonusGameModal from "../components/BonusModal/BonusModal";
import InfoCard from "../components/InfoCard/InfoCard";
import { Item } from "../../../utilities/localSorage";

interface BonusPrize {
  label: string;
  tier: "min" | "minor" | "majo" | "maxi" | "mega" | "gold";
  weight: number; // cantidad de veces que puede aparecer
}

const Home = () => {
  const [data, setData] = useState<UserTournamentSummary | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBonus, setIsBonus] = useState<boolean>(false);
  const [isLastPlayed, setIsLastPlayed] = useState<boolean>(false);
  const [isLuckyFound, setIsLuckyFound] = useState<boolean>(false);
  const [isLastPlayedLuckyFound, setIsLastPlayedLuckyFound] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [prizesLuckyFound, setPrizesLuckyFound] = useState<BonusPrize[]>([]);

  useEffect(() => {
    const lastPlayed = localStorage.getItem(Item.BONUS_GAME_LAST_PLAYED);
    const today = new Date().toDateString();

    if (lastPlayed === today) {
      setIsLastPlayed(true);
    }
  }, [isLastPlayed]);

  useEffect(() => {
    const lastPlayed = localStorage.getItem(Item.LUCKY_FOUND_GAME_LAST_PLAYED);

    if (lastPlayed) {
      // Hay datos: Ya jugó
      setIsLastPlayedLuckyFound(true);
    } else {
      // No hay datos: No ha jugado, puede jugar
      setIsLastPlayedLuckyFound(false);
    }
  }, [isLastPlayedLuckyFound]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const service = homeService.crud();
        service.setBaseUrl(`${PrivateRoutesHttp.USERS}/tournaments/${user.id}`);
        const res = await service.findOne<UserTournamentSummary, string>("");
        setData(res);
        setIsLoading(false);

        const generatedPrizes = generatePrizes(user.depositTotal);
        setPrizesLuckyFound(generatedPrizes);
      }
    };

    const lastPlayed = localStorage.getItem("bonusGameLastPlayed");
    const lastPlayed2 = localStorage.getItem("luckyFoundGameLastPlayed");
    const today = new Date().toDateString();

    if (lastPlayed === today) {
      setIsLastPlayed(true);
    }

    if (lastPlayed2) {
      // Hay datos: Ya jugó
      setIsLastPlayedLuckyFound(true);
    } else {
      // No hay datos: No ha jugado, puede jugar
      setIsLastPlayedLuckyFound(false);
    }

    fetchData();
  }, [user]);

  const generatePrizes = (balance: number): BonusPrize[] => {
    const basePrizes: Omit<BonusPrize, "weight">[] = [
      { label: "5%", tier: "min" },
      { label: "10%", tier: "minor" },
      { label: "20%", tier: "majo" },
      { label: "50%", tier: "maxi" },
      { label: "100%", tier: "mega" },
      { label: "200%", tier: "gold" },
    ];

    let prizesDistribution: Record<BonusPrize["tier"], number> = {
      min: 0,
      minor: 0,
      majo: 0,
      maxi: 0,
      mega: 0,
      gold: 0,
    };

    if (balance >= 10000) {
      prizesDistribution = {
        min: 8,
        minor: 2,
        majo: 2,
        maxi: 2,
        mega: 2,
        gold: 2, // O casi nada
      };
    } else if (balance >= 5000) {
      // ⚖️ Balance medio: equilibrado
      prizesDistribution = {
        min: 6,
        minor: 3,
        majo: 3,
        maxi: 2,
        mega: 2,
        gold: 2,
      };
    } else {
      // 💸 Balance bajo: más chances de grandes premios
      prizesDistribution = {
        min: 3,
        minor: 4,
        majo: 3,
        maxi: 3,
        mega: 3,
        gold: 2,
      };
    }

    // Asegurarse que sumen 18
    const totalCargas = Object.values(prizesDistribution).reduce(
      (a, b) => a + b,
      0
    );
    if (totalCargas !== 18) {
      console.warn("Ajusta las distribuciones: no suman 18");
    }

    // Crear el array final
    const result = basePrizes.map((prize) => ({
      ...prize,
      weight: prizesDistribution[prize.tier],
    }));

    return result;
  };

  const handleClick = (tournament: Tournament) => {
    navigate(
      `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.TOURNAMENT}/${tournament.tournamentId}`
    );
  };

  if (!data) return <Loader />;

  const accumulatedFund = (data.totalDeposits * 0.1).toFixed(2);

  const modalBonus = () => {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem(Item.BONUS_GAME_LAST_PLAYED);

    // Si ya jugó hoy y quiere abrir el modal, no lo permitimos
    if (!isBonus && lastPlayed === today) {
      setIsLastPlayed(true);
      return;
    }

    // Si está cerrando el modal y jugó, actualizamos el estado
    if (isBonus && lastPlayed === today) {
      setIsLastPlayed(true);
    }

    setIsBonus(!isBonus);
  };

  const modalLuckyFound = () => {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem(Item.LUCKY_FOUND_GAME_LAST_PLAYED);

    // Si ya jugó hoy y quiere abrir el modal, no lo permitimos
    if (!isLuckyFound && lastPlayed === today) {
      setIsLastPlayedLuckyFound(true);
      return;
    }

    // Si está cerrando el modal y jugó, actualizamos el estado
    if (isLuckyFound && lastPlayed === today) {
      setIsLastPlayedLuckyFound(true);
    }

    setIsLuckyFound(!isLuckyFound);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <section className={styles.userInfo}>
              <h2 className={styles.welcome}>¡Bienvenido, {data.userName}!</h2>
              <InfoCard
                label={`Tu Fondo de la Suerte $${Number(
                  accumulatedFund
                ).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}`}
                value={
                  isLastPlayedLuckyFound
                    ? "Tu Fondo de la Suerte ya fue reclamado."
                    : "Reclama tu Tu Fondo de la Suerte"
                }
                button={
                  isLastPlayedLuckyFound
                    ? undefined
                    : {
                        name: "Reclamar",
                        onClick: modalLuckyFound,
                      }
                }
              />
              {/* <InfoCardItem
                icon={<FaWallet />}
                label="Tu Fondo de la Suerte"
                value={`Tu Fondo de la Suerte $${Number(accumulatedFund).toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}`}
              /> */}
              <br />
              <InfoCard
                label="Bonus del día"
                value={
                  isLastPlayed
                    ? "Ya jugaste hoy. Volvé mañana para intentarlo de nuevo."
                    : "Reclama tu bonus del día jugando"
                }
                button={
                  isLastPlayed
                    ? undefined
                    : {
                        name: "Jugar",
                        onClick: modalBonus,
                      }
                }
              />
            </section>

            <section className={styles.tournaments}>
              <h3 className={styles.sectionTitle}>Tus torneos</h3>

              {data.tournaments.length === 0 ? (
                <p className={styles.noTournaments}>
                  No estás participando en ningún torneo por ahora.
                </p>
              ) : (
                data.tournaments.map((t) => (
                  <div
                    onClick={() => handleClick(t)}
                    key={t.tournamentId}
                    className={styles.tournamentCard}
                  >
                    <div className={styles.tournamentTop}>
                      <h4 className={styles.tournamentName}>
                        {t.tournamentName}
                      </h4>
                      <span className={styles.dateRange}>
                        {new Date(t.startDate).toLocaleDateString()} -{" "}
                        {new Date(t.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className={styles.separator}></div>

                    <div className={styles.stats}>
                      <div className={styles.statBlock}>
                        <p className={styles.label}>Puntos</p>
                        <p className={styles.value}>{t.userPoints}</p>
                      </div>
                      <div className={styles.statBlock}>
                        <p className={styles.label}>Ranking</p>
                        <p className={styles.value}>
                          #{t.userRanking}
                          {/* <span className={styles.participants}>/ {t.totalParticipants}</span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
          {isBonus ? (
            <BonusGameModal
              prizes={[
                { label: "5% Bonus", tier: "min", weight: 4 },

                { label: "10% Bonus", tier: "minor", weight: 3 },

                { label: "15% Bonus", tier: "majo", weight: 3 },

                { label: "20% Bonus", tier: "maxi", weight: 3 },

                { label: "50% Bonus", tier: "mega", weight: 3 },

                { label: "100% Bonus", tier: "gold", weight: 2 },
              ]}
              onClose={modalBonus}
              localSotre="bonusGameLastPlayed"
            />
          ) : (
            <></>
          )}

          {isLuckyFound ? (
            <BonusGameModal
              prizes={prizesLuckyFound}
              onClose={modalLuckyFound}
              localSotre="luckyFoundGameLastPlayed"
              fondo={
                user
                  ? `${Number(accumulatedFund).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                    })}`
                  : ``
              }
            />
          ) : (
            <></>
          )}

          <Header />
        </>
      )}
    </>
  );
};

export default Home;
