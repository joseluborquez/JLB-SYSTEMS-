// Fuente única de proyectos del portafolio — antes vivía duplicada en dos
// arrays de la SPA (uno para la grilla, otro para el detalle) que podían
// desincronizarse. Acá es un solo lugar.

/** Módulo del catálogo al que pertenece el caso (ver lib/modulos.ts). */
export type ModuloCaso = "agente-whatsapp" | "integraciones" | "plataforma";

export interface Proyecto {
  id: string;
  nombre: string;
  modulo: ModuloCaso;
  // Campos del formato nuevo de casos. Son opcionales a propósito: se
  // completan cuando se recojan los números reales de cada cliente, y la
  // página del caso solo muestra el bloque si el dato existe.
  /** Métricas del resultado, medidas contra el punto de partida. */
  medido?: string[];
  /** Qué puede hacer hoy el cliente por su cuenta. */
  autonomia?: string;
  testimonio?: { texto: string; autor: string };
  descripcion: string;
  imagen: string;
  tags: string[];
  // La imagen por sección es opcional: cuando solo hay una foto real del
  // proyecto (como Dilogic), no tiene sentido repetirla en las tres
  // secciones — se omite y esa sección se ve solo con texto.
  desafio: { descripcion: string; imagen?: string };
  solucion: { descripcion: string; imagen?: string };
  resultados: { descripcion: string; imagen?: string };
}

export const proyectos: Proyecto[] = [
  {
    id: "sublinovena",
    modulo: "plataforma",
    nombre: "Sublinovena",
    // Textos tomados del caso publicado en jlbsystems.cl. Sin cifras: aún no
    // se recogen las de este cliente.
    autonomia:
      "Su equipo aprendió a hacer cambios en el sitio por su cuenta, con Lovable.",
    testimonio: {
      texto:
        "La problemática que se resolvió, fue dejar de usar un extenso catálogo de productos en PDF y pasar a una página web que sirve de vitrina digital y ayuda a los clientes a buscar de forma rápida el producto que necesitan.",
      autor: "Fernando Tabie, Director Ejecutivo de Sublinovena SpA",
    },
    descripcion:
      "Sitio web con catálogo digital de más de 150 productos para una fábrica de merchandising corporativo. Los clientes encuentran lo que necesitan y cotizan directamente por WhatsApp.",
    imagen: "/proyectos/sublinovena-hero.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    desafio: {
      descripcion:
        "La fábrica de merchandising corporativo mostraba su oferta en un extenso catálogo en PDF, difícil de recorrer, y no tenía una vitrina propia en internet.",
    },
    solucion: {
      descripcion:
        "Una vitrina digital con los productos ordenados por categoría (lanyards, botellas, tazones, mochilas y más), búsqueda rápida, atención directa por WhatsApp y un blog para aparecer en buscadores.",
    },
    resultados: {
      descripcion:
        "Los clientes encuentran los productos en segundos, en vez de recorrer un PDF, y cotizan por WhatsApp. El proyecto superó con creces los objetivos propuestos.",
    },
  },
  {
    id: "almenis",
    modulo: "plataforma",
    nombre: "Almenis",
    descripcion:
      "Web app de cierre de caja para un centro de especialidades médicas: cada profesional de salud accede con su propio perfil y ve sus ganancias diarias de forma automática.",
    imagen: "/proyectos/almenis-hero.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vite"],
    desafio: {
      descripcion:
        "Almenis, centro de especialidades médicas, cerraba caja a mano en cuadernos — un proceso que no escalaba y dependía de cada profesional. Tampoco fue posible integrar directamente con la API de Reservo, el software de agenda que ya usaban, lo que obligó a buscar otra vía de entrada de datos.",
    },
    solucion: {
      descripcion:
        "Construimos una web app con perfil y credenciales propias para cada profesional de salud, donde el cierre de caja se genera a partir de la agenda del día exportada en PDF desde Reservo — sin depender de una integración directa con su API.",
    },
    resultados: {
      descripcion:
        "Cada profesional ve hoy sus ganancias diarias de forma digital y automática, con un cierre de caja que ya no depende de cuadernos ni de cálculos manuales — un proceso escalable para todo el centro.",
    },
  },
  {
    id: "raulspeed",
    modulo: "plataforma",
    nombre: "RaulSpeed",
    // Cifras entregadas por Elvis Martínez (gerente de operaciones) en el
    // formulario de casos, 20-oct-2026. Las horas son cálculo propio:
    // 100 cotizaciones × 5–10 min = 500–1.000 min al mes. El aumento de
    // ventas es dato declarado por el cliente, no medido por nosotros.
    medido: [
      "Cada cotización: de 5–10 minutos a segundos.",
      "Con unas 100 cotizaciones al mes, entre 8 y 17 horas mensuales liberadas.",
      "Aumento de ventas de 30 %, según el cliente.",
    ],
    testimonio: {
      texto:
        "Tenemos más tiempo para dedicar a otras mejoras de la empresa.",
      autor: "Elvis Martínez, gerente de operaciones de RaulSpeed",
    },
    descripcion:
      "Web app que permite cotizar y comprar repuestos japoneses originales, con pago a través de distintas pasarelas, ingresando solo el número de parte OEM.",
    imagen: "/proyectos/raulspeed-hero.jpg",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    desafio: {
      descripcion:
        "RaulSpeed, un negocio de dos personas, cotizaba los repuestos originales a mano: cada cotización tomaba de 5 a 10 minutos, unas 100 veces al mes, con errores, demoras y clientes perdidos. A eso se sumó un desafío técnico mayor: no existía una base de datos estructurada de repuestos ni acceso directo a los catálogos japoneses de origen.",
    },
    solucion: {
      descripcion:
        "Construimos una web app donde el cliente ingresa el número de parte OEM, recibe la cotización y compra directamente a través de distintas pasarelas de pago. Con Claude Code se construyó además una base de datos propia de repuestos a partir de catálogos japoneses, resolviendo el acceso a la información de origen.",
    },
    resultados: {
      descripcion:
        "Cada cotización pasó de 5–10 minutos a segundos, y el equipo usa ese tiempo en otras mejoras del negocio. Según el cliente, las ventas subieron 30 %. Hoy los clientes cotizan y compran en un solo lugar, sin pasar por WhatsApp. Toda la información de pedidos y solicitudes llega directamente al perfil administrador de RaulSpeed.",
    },
  },
  {
    id: "dilogic",
    modulo: "integraciones",
    nombre: "Dilogic",
    // Cifras entregadas por Hugo (administrador) en el formulario de casos,
    // 19-oct-2026. El ahorro mensual es cálculo propio: (35 − 4) h × 4 ciclos.
    medido: [
      "Cada ciclo de despachos: de 35 horas a 4 horas (89 % menos).",
      "Con 4 ciclos al mes, unas 124 horas mensuales liberadas.",
      "Completar todos los despachos: de 4–5 días a 1 día.",
    ],
    testimonio: {
      texto:
        "Tengo tiempo para darle atención a todos los demás procesos, todo más ordenado y estructurado.",
      autor: "Hugo, administrador de Dilogic",
    },
    descripcion:
      "Aplicación web que genera de forma masiva las guías de despacho de una distribuidora de alimentos, conectada directamente con su ERP.",
    imagen: "/proyectos/dilogic-hero.jpg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    desafio: {
      descripcion:
        "Dilogic, una distribuidora de alimentos de 10 personas, preparaba las guías de despacho a mano en su ERP. Cada ciclo tomaba unas 35 horas y traía errores de digitación, atrasos en la entrega de información y riesgo de incumplir la información tributaria del traslado de mercancías.",
    },
    solucion: {
      descripcion:
        "Construimos una plataforma web donde se sube la solicitud de pedido y, mediante conexión directa vía API con su ERP, las guías de despacho se generan de forma automática y masiva.",
    },
    resultados: {
      descripcion:
        "Cada ciclo de despachos pasó de 35 a 4 horas: unas 124 horas menos al mes con 4 ciclos mensuales. Lo que tomaba de 4 a 5 días se cumple en uno.",
    },
  },
  {
    id: "teayudo",
    modulo: "agente-whatsapp",
    nombre: "Te Ayudo",
    descripcion:
      "Agente de IA que responde en WhatsApp y conecta a los clientes con el profesional correspondiente según su necesidad — por ejemplo, gasfitería.",
    imagen: "/proyectos/teayudo-hero.jpg",
    tags: ["TypeScript", "Kapso"],
    desafio: {
      descripcion:
        "Te Ayudo respondía los mensajes de WhatsApp de forma manual — una labor que tomaba horas y hacía perder clientes por respuestas lentas.",
    },
    solucion: {
      descripcion:
        "Construimos un agente de IA sobre Kapso que vive en WhatsApp, entiende la necesidad específica del cliente (por ejemplo, gasfitería) y lo vincula automáticamente con el profesional correspondiente.",
    },
    resultados: {
      descripcion:
        "Los mensajes que antes tardaban horas en responderse ahora se resuelven en minutos, sin perder clientes por demora.",
    },
  },
  {
    id: "lead-to-customer",
    modulo: "agente-whatsapp",
    nombre: "Lead to Customer",
    descripcion:
      "Sistema automatizado de ventas que responde a los leads en minutos, 24/7, y hace seguimiento hasta cerrar la venta.",
    imagen: "/proyectos/leadtocustomer-login.png",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Kapso"],
    desafio: {
      descripcion:
        "Muchos negocios pierden tiempo respondiendo consultas manualmente — varias son solo curiosos — y las respuestas lentas hacen que los leads reales se vayan con la competencia.",
    },
    solucion: {
      descripcion:
        "Construimos un sistema automatizado sobre Kapso, conectado a WhatsApp, que responde a los leads en minutos, agenda llamadas de venta, hace seguimiento y califica a cada lead.",
    },
    resultados: {
      descripcion:
        "Respuestas a consultas en menos de 2 minutos, con calificación automática de leads para agendar solo con clientes potenciales reales — y más ventas cerradas.",
    },
  },
  {
    id: "humania",
    modulo: "plataforma",
    nombre: "HumanIA",
    descripcion:
      "HumanIA es una app de entrenamiento potenciada con Inteligencia artificial para personalizar rutinas de entrenamiento según nivel de experiencia, contexto y equipamiento.",
    imagen: "/proyectos/humania-mockup.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vite", "Gemini", "Make"],
    desafio: {
      descripcion:
        "Los usuarios necesitaban una forma personalizada de entrenar que se adaptara a sus necesidades individuales, objetivos y nivel de experiencia. El desafío era crear una experiencia de entrenamiento verdaderamente personalizada utilizando inteligencia artificial.",
    },
    solucion: {
      descripcion:
        "Desarrollamos una aplicación completa que utiliza IA para generar planes de entrenamiento personalizados. La integración con Gemini permite crear rutinas adaptativas, mientras que Supabase gestiona los datos de usuarios y Make automatiza los flujos de trabajo.",
    },
    resultados: {
      descripcion:
        "Una aplicación funcional lista para el mercado en semanas, con planes de entrenamiento personalizados generados por IA, seguimiento de progreso en tiempo real y una experiencia de usuario fluida y moderna.",
    },
  },
  {
    id: "uruz",
    modulo: "plataforma",
    nombre: "Uruz GYM",
    descripcion:
      "Software de gestión de clientes para un gimnasio de entrenamiento personalizado.",
    imagen: "/proyectos/uruz-main.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vite"],
    desafio: {
      descripcion:
        "El gimnasio necesitaba una solución completa para gestionar clientes, sesiones de entrenamiento, pagos y seguimiento de progreso. El sistema anterior era manual y consumía demasiado tiempo del equipo de entrenadores.",
    },
    solucion: {
      descripcion:
        "Creamos un sistema de gestión integral con Lovable y Supabase. Incluye gestión de clientes, calendario de sesiones, seguimiento de pagos, historial de entrenamientos y panel de control con métricas en tiempo real.",
    },
    resultados: {
      descripcion:
        "Reducción del 70% en tiempo administrativo, mejor experiencia para los clientes con acceso a su información y progreso, y un sistema escalable listo para crecer con el negocio.",
    },
  },
  {
    id: "crm-reciclaje",
    modulo: "integraciones",
    nombre: "CRM Servicio de reciclaje",
    descripcion:
      "Plataforma CRM diseñada para empresas que realizan recolección de residuos a domicilio, orientada a optimizar y digitalizar la gestión completa de sus flujos internos. El sistema centraliza la información de clientes, suscripciones, retiros y rutas, permitiendo una operación más eficiente, ordenada y escalable.",
    imagen: "/proyectos/crm-reciclaje-mockup.png",
    tags: ["Make", "Airtable", "Google Maps"],
    desafio: {
      descripcion:
        "Las empresas de reciclaje enfrentaban dificultades para gestionar sus operaciones de forma eficiente. La información de clientes, suscripciones y rutas estaba dispersa, generando pérdida de tiempo y errores en la coordinación de retiros.",
    },
    solucion: {
      descripcion:
        "Desarrollamos un CRM completo utilizando Airtable como base de datos, Make para automatizar flujos de trabajo, y Google Maps para optimizar las rutas de recolección. El sistema permite gestionar clientes, programar retiros y visualizar rutas de forma integrada.",
    },
    resultados: {
      descripcion:
        "Una plataforma centralizada que permite gestionar toda la operación desde un solo lugar, reduciendo tiempos administrativos, mejorando la coordinación de rutas y escalando el negocio de forma ordenada.",
    },
  },
];

export function getProyecto(id: string): Proyecto | undefined {
  return proyectos.find((p) => p.id === id);
}

/** Logos de herramientas usados en la sección "Herramientas utilizadas"
 * de cada detalle de proyecto. */
export const logosHerramientas: Record<string, string> = {
  "Claude Code": "/logos/herramientas/claude-logo.svg",
  Supabase: "/logos/herramientas/supabase-logo.png",
  Vercel: "/logos/herramientas/vercel-logo.svg",
  Kapso: "/logos/herramientas/kapso-logo.png",
  Lovable: "/logos/herramientas/lovable-logo.png",
  Make: "/logos/herramientas/make-logo.png",
  Airtable: "/logos/herramientas/airtable-logo.png",
  Gemini: "/logos/herramientas/gemini-logo.png",
  "Google Maps": "/logos/herramientas/googlemaps-logo.png",
  "Next.js": "/logos/stack/nextjs-logo.svg",
  React: "/logos/stack/react-logo.svg",
  TypeScript: "/logos/stack/typescript-logo.svg",
  "Tailwind CSS": "/logos/stack/tailwind-logo.svg",
  PostgreSQL: "/logos/stack/postgresql-logo.svg",
  Vite: "/logos/stack/vite-logo.svg",
};

/** Tags cuyo logo es un SVG monocromo negro (sin currentColor aplicable
 * porque next/image lo carga como <img>) — necesitan el filtro de inversión
 * .jlb-logo-stack para verse en tema oscuro. Ver Herramientas.tsx. */
export const tagsMonocromo = new Set([
  "Claude Code",
  "Vercel",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Vite",
]);
