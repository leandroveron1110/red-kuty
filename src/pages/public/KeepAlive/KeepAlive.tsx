import { useEffect } from "react";
import LoginService from "../Login/services/Login.service";

const KeepAlive = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      LoginService.ping()
        .then(() => {
          console.log("Servidor activo");
        })
        .catch((err) => {
          console.error("Error al mantener el servidor activo:", err);
        });
    }, 1000 * 60 * 5); // cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  return <p>Servidor activo 🔄</p>;
};

export default KeepAlive;
