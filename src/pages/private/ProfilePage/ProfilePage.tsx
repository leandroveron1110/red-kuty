import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import InfoCardItem from "../components/InfoCardItem/InfoCardItem";
import styles from "./ProfilePage.module.css";
import { FaUser, FaIdBadge, FaWallet } from "react-icons/fa";
import { logout } from "../../../redux/slices/auth.slice";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <div className={styles.noUser}>No hay usuario autenticado</div>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // ajusta la ruta según tu aplicación
  };

  const raffleFund = (user.depositTotal * 0.1).toFixed(2);

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.header}>
          {/* <FaUser className={styles.profileIcon} /> */}
          <h1 className={styles.title}>Mi Perfil</h1>
          <p className={styles.subtitle}></p>
        </div>

        <div className={styles.profileCard}>
          <InfoCardItem icon={<FaIdBadge />} label="ID" value={user.id} />
          <InfoCardItem icon={<FaUser />} label="Nombre" value={user.name} />
          <InfoCardItem
            icon={<FaWallet />}
            label="Tu Fondo de la Suerte"
            value={`$${raffleFund}`}
          />
        </div>

        <div className={styles.sectionButton}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar sesión
          </button>

        </div>

      </div>
      <Header />
    </>
  );
};

export default ProfilePage;
