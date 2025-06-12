export const phone = "5493442672449";

export const sendWhatsapp = (m: string) => {
  const message = encodeURIComponent(m);
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappUrl, "_blank");
};
