import { Link, useLocation } from "react-router-dom";
import { FaHome, FaTrophy, FaUser, FaGift } from "react-icons/fa";
import styles from "./Header.module.css";
import { PrivateRoutes, PublicRoutes } from "../../routes/routes";
import { useAppSelector } from "../../redux/hooks";

const Header = () => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navItems = user
    ? [
        {
          path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.HOME}`,
          label: "Home",
          icon: <FaHome />,
        },
        {
          path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.TOURNAMENT}`,
          label: "Torneo",
          icon: <FaTrophy />,
        },
        {
          path: `/${PublicRoutes.PUBLIC}/${PublicRoutes.BENEFITS}`,
          label: "Ganar Más",
          icon: <FaGift />,
        },
        {
          path: `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.PROFILE}`,
          label: "Perfil",
          icon: <FaUser />,
        },
      ]
    : [
        {
          path: `/${PublicRoutes.PUBLIC}/${PublicRoutes.HOME}`,
          label: "Home",
          icon: <FaHome />,
        },
        {
          path: `/${PublicRoutes.PUBLIC}/${PublicRoutes.LOGIN}`,
          label: "Iniciar sesión",
          icon: <FaUser />,
        },
      ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`${styles.navItem} ${
              isActive(item.path) ? styles.active : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
