// Constantes editables del sitio.
//
// El número va una sola vez, en formato internacional sin + ni espacios ni
// guiones. Los links de WhatsApp se arman a partir de él.
// +1 208-248-5778 → 12082485778
const numero = "12082485778";

function wa(texto: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export const config = {
  numero,
  /** Contacto general: hero, planes, cierre, footer. */
  whatsapp: wa("Hola, vengo de la web"),
  /** Entrada al demo: el mensaje inicial arranca la conversación con el agente. */
  whatsappDemo: wa("Hola, quiero probar el agente"),
  /** Página de agendamiento. Hoy es Google Calendar; el nombre es genérico
      para que cambiar de herramienta no obligue a tocar los componentes. */
  calendario: "https://calendar.app.google/Ghy5FAQNQyLqrKQL7",
  /** Razón social completa: footer, agente del demo. */
  empresa: "JLB Systems SpA",
  /** Marca sin la forma legal: navbar y footer. */
  marca: "JLB Systems",
  email: "contacto@nocodejose.com",
  persona: "José Luis Bórquez",
};
