import { useParams } from "react-router-dom";
import { sendWhatsapp } from "../../../utilities/whatsapp";
import style from "./ReferralRedirect.module.css";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ReferralRedirect = () => {
  const { ref } = useParams<{ ref: string }>();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    sendWhatsapp(
      `Hola, me recomendó _${ref}_. Estoy interesado en unirme al casino, ¿me podés ayudar?`
    );
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        ¡Bienvenido a <span className={style.highlight}>Red Kuty!</span>
      </h1>
      <p className={style.subtext}>
        Estás entrando con el código de referido: <strong>{ref}</strong>
      </p>

      {showButton ? (
        <button onClick={handleClick} className={style.whatsappBtn}>
          <FaWhatsapp className={style.icon} />
          Ir a WhatsApp
        </button>
      ) : (
        <>
          <div className={style.spinner}></div>
          <p className={style.footer}>Un momento por favor...</p>
        </>
      )}
    </div>
  );
};

export default ReferralRedirect;
