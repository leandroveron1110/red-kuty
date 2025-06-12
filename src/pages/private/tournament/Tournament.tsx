import styles from "./Tournament.module.css";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import TournamentService, {
  TournamentResponse,
} from "./services/Tournament.service";
import { useEffect, useState } from "react";
import { PrivateRoutes } from "../../../routes/routes";
import Loader from "../../../components/Loading/Loading";

const Tournament = () => {
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFindAllTournaments();
  }, []);

  const fetchFindAllTournaments = async () => {
    try {
      const service = TournamentService.crud();
      const result = await service.findAll<TournamentResponse[]>();
      setTournaments(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const handleClick = (tournament: TournamentResponse) => {
    navigate(
      `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.TOURNAMENT}/${tournament.id}`
    );
  };

const getStatusLabel = (t: TournamentResponse) => {
  const now = new Date();
  const start = new Date(t.startDate);
  const end = new Date(t.endDate);

  if (now < start) return "Próximamente";
  if (t.isActive && now >= start && now <= end) return "Activo";
  return "Finalizado";
};

  const getStatusClass = (t: TournamentResponse) => {
    const priority = getTournamentPriority(t);
    if (priority === 0) return styles.active;
    if (priority === 1) return styles.upcoming;
    return styles.inactive;
  };

const getTournamentPriority = (t: TournamentResponse) => {
  const now = new Date();
  const start = new Date(t.startDate);
  const end = new Date(t.endDate);

  if (now < start) return 1; // Próximamente
  if (t.isActive && now >= start && now <= end) return 0; // Activo
  return 2; // Finalizado
};;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            <h1 className={styles.title}>Torneos</h1>
            <div className={styles.grid}>
              {tournaments
                .sort(
                  (a, b) => getTournamentPriority(a) - getTournamentPriority(b)
                )
                .map((t, i) => (
                  <div
                    key={t.id}
                    className={`${styles.card} ${
                      !t.isActive ? styles.disabled : ""
                    }`}
                    style={{
                      animationDelay: `${i * 100}ms`,
                      cursor: t.isActive ? "pointer" : "not-allowed",
                    }}
                    onClick={() => handleClick(t)}
                  >
                    <div className={styles.header}>
                      <h2 className={styles.name}>{t.name}</h2>
                      <span className={`${styles.status} ${getStatusClass(t)}`}>
                        {getStatusLabel(t)}
                      </span>
                    </div>
                    <div className={styles.dates}>
                      <p>
                        {/* <strong>Inicio:</strong>{" "} */}
                        {new Date(t.startDate).toLocaleDateString()} -  {new Date(t.endDate).toLocaleDateString()}
                      </p>
                      {/* <p>
                        <strong>Fin:</strong>{" "}
                        {new Date(t.endDate).toLocaleDateString()}
                      </p> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Header />
        </>
      )}
    </>
  );
};

export default Tournament;
