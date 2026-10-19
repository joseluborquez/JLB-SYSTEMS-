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
  /** Consulta por la auditoría: separa en la bandeja a quien viene por ella. */
  whatsappAuditoria: wa("Hola, quiero conversar sobre una auditoría de flujos"),
  /** Página de agendamiento. Hoy es Google Calendar; el nombre es genérico
      para que cambiar de herramienta no obligue a tocar los componentes. */
  calendario: "https://calendar.app.google/Ghy5FAQNQyLqrKQL7",
  /** Razón social completa: footer, agente del demo. */
  empresa: "JLB Systems SpA",
  /** Marca sin la forma legal: navbar y footer. */
  marca: "JLB Systems",
  email: "nocodejose@gmail.com",
  persona: "José Luis Bórquez",

  // Nombres PROVISORIOS de la oferta. Cuando estén los definitivos se
  // cambian acá y se propagan a todo el sitio.
  servicio: "Auditoría de flujos",
  acompanamiento: "Acompañamiento mensual",
  /** Texto del botón de agenda, idéntico en todas las páginas. */
  ctaAgenda: "Agendar conversación",
};
