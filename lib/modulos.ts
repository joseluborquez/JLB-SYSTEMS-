// Catálogo de módulos que pueden salir de una auditoría. Fuente única de la
// portada y de /soluciones.

export interface Modulo {
  id: string;
  /** El problema, en la voz del cliente, que este módulo resuelve. */
  dolor: string;
  nombre: string;
  resumen: string;
  /** Cuándo conviene, según el diagnóstico. */
  cuandoConviene: string;
  /** Página propia; solo el agente de WhatsApp la tiene. */
  href?: string;
}

export const modulos: Modulo[] = [
  {
    id: "ia-equipo",
    dolor: "Mi equipo pierde horas en tareas repetitivas y de mucho texto.",
    nombre: "IA para el equipo",
    resumen:
      "Claude u otro modelo conectado a tus herramientas, como cerebro central que automatiza lo repetitivo.",
    cuandoConviene: "Hay tareas de oficina repetitivas o con mucho texto.",
  },
  {
    id: "integraciones",
    dolor: "Los datos se copian a mano de una herramienta a otra.",
    nombre: "Integraciones",
    resumen:
      "Conecta agentes y automatizaciones al CRM, ERP, agenda o planillas.",
    cuandoConviene:
      "El equipo ya usa herramientas que funcionan y conviene conectar.",
  },
  {
    id: "plataforma",
    dolor: "Ninguna herramienta resuelve mi proceso.",
    nombre: "Plataformas a medida",
    resumen:
      "Software propio para un proceso que ninguna herramienta resuelve.",
    cuandoConviene: "La auditoría descarta las alternativas existentes.",
  },
  {
    id: "agente-whatsapp",
    dolor: "Se me escapan consultas y ventas por responder tarde.",
    nombre: "Agentes de WhatsApp con IA",
    resumen: "Responde, califica, agenda y hace seguimiento.",
    cuandoConviene:
      "Hay consultas repetidas o leads que se enfrían por respuesta lenta.",
    href: "/soluciones/agentes-whatsapp",
  },
  {
    id: "meta-ads",
    dolor:
      "Tengo un producto que funciona y no me llegan suficientes clientes.",
    nombre: "Campañas Meta Ads",
    resumen: "Atrae leads de clic a WhatsApp, medidos por origen.",
    cuandoConviene:
      "Hay producto validado y capacidad para atender más demanda.",
  },
];

export const nombreModulo: Record<string, string> = {
  "agente-whatsapp": "Agentes de WhatsApp",
  integraciones: "Integraciones",
  plataforma: "Plataformas a medida",
};
