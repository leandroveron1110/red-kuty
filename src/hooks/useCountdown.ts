import { useEffect, useState } from "react";

const formatCountdown = (distance: number) => {
  if (distance <= 0) return "0 días 00:00:00";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = String(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  return `${days} días ${hours}:${minutes}:${seconds}`;
};

const useCountdown = (endDate: string | null) => {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (!endDate) return;

    const updateCountdown = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const distance = end - now;
      setCountdown(formatCountdown(distance));
    };

    updateCountdown(); // Update immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return countdown;
};

export default useCountdown;
