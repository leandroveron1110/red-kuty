import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./BonusModal.module.css";
import BonusWinner from "./components/BonusWinner/BonusWinner";
import BonusInstructions from "./components/BonusInstructions/BonusInstructions";
import BonusTierInfo from "./components/BonusTierInfo/BonusTierInfo";
import BonusCoin from "./components/BonusCard/BonusCoin";
import { sendWhatsapp } from "../../../../utilities/whatsapp";

interface BonusPrize {
  label: string;
  tier: "min" | "minor" | "majo" | "maxi" | "mega" | "gold";
  weight: number; // cantidad de veces que puede aparecer
}

interface BonusGameModalProps {
  onClose: () => void;
  prizes: BonusPrize[];
  localSotre: string;
  fondo?: string;
}

interface Card {
  id: number;
  label: string;
  tier: BonusPrize["tier"];
  revealed: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const BonusGameModal = ({
  onClose,
  prizes,
  localSotre,
  fondo,
}: BonusGameModalProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [winner, setWinner] = useState<{
    label: string;
    tier: BonusPrize["tier"];
  } | null>(null);
  const [isInstruction, setIsInstruction] = useState<boolean>(true);

  useEffect(() => {
    const generated: Card[] = [];

    prizes.forEach((prize) => {
      for (let i = 0; i < prize.weight; i++) {
        generated.push({
          id: generated.length,
          label: prize.label,
          tier: prize.tier,
          revealed: false,
        });
      }
    });

    const shuffled = shuffleArray(generated);
    setCards(shuffled);
  }, [prizes]);

  const handleCardClick = (index: number) => {
    if (cards[index].revealed || winner) return;

    const updatedCards = [...cards];
    updatedCards[index].revealed = true;
    setCards(updatedCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    const labelCount: Record<string, number> = {};
    newFlipped.forEach((i) => {
      const label = updatedCards[i].label;
      labelCount[label] = (labelCount[label] || 0) + 1;
      if (labelCount[label] === 3) {
        const { tier } = updatedCards[i];
        localStorage.setItem(localSotre, new Date().toDateString());
        setWinner({ label, tier });
      }
    });
  };

  const handleClaim = (prize: string) => {
    let mensaje = "";
    if (fondo) {
      mensaje = `Me toca el ${prize} de mi fondo acumulado de ${fondo}`;
    } else {
      mensaje = `¡Hola! Quiero reclamar mi premio del juego de bonos. Me salió: ${prize}`;
    }

    sendWhatsapp(mensaje);

    setWinner(null);

    onClose();
  };

  const onCloseInstructions = () => setIsInstruction(false);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        {isInstruction ? (
          <BonusInstructions onClose={onCloseInstructions} />
        ) : (
          <>
            {!winner && (
              <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
              </button>
            )}

            <BonusTierInfo prizes={prizes} winner={winner?.label ?? null} />

            <section className={styles.containerGrid}>
              <div className={styles.grid}>
                {cards.map((card, index) => (
                  <BonusCoin
                    key={card.id}
                    revealed={card.revealed}
                    value={card.label}
                    tier={card.tier}
                    onClick={() => handleCardClick(index)}
                  />
                ))}
              </div>
            </section>

            {winner && (
              <BonusWinner
                prize={winner.label}
                tier={winner.tier}
                onClaim={() => handleClaim(winner.label)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BonusGameModal;
