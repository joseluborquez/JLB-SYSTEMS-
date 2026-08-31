// Fuente única de proyectos del portafolio — antes vivía duplicada en dos
// arrays de la SPA (uno para la grilla, otro para el detalle) que podían
// desincronizarse. Acá es un solo lugar.

export interface Proyecto {
  id: string;
  nombre: string;
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
    id: "almenis",
    nombre: "Almenis",
    descripcion:
      "Web app de cierre de caja para un centro de especialidades médicas: cada profesional de salud accede con su propio perfil y ve sus ganancias diarias de forma automática.",
    imagen: "/proyectos/almenis-hero.jpg",
    tags: ["Claude Code", "Supabase", "Vercel"],
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
    nombre: "RaulSpeed",
    descripcion:
      "Web app que permite cotizar y comprar repuestos japoneses originales, con pago a través de distintas pasarelas, ingresando solo el número de parte OEM.",
    imagen: "/proyectos/raulspeed-hero.jpg",
    tags: ["Claude Code", "Supabase", "Vercel"],
    desafio: {
      descripcion:
        "RaulSpeed recibía y cotizaba solicitudes de repuestos por WhatsApp de forma manual. A eso se sumó un desafío técnico mayor: no existía una base de datos estructurada de repuestos ni acceso directo a los catálogos japoneses de origen.",
    },
    solucion: {
      descripcion:
        "Construimos una web app donde el cliente ingresa el número de parte OEM, recibe la cotización y compra directamente a través de distintas pasarelas de pago. Con Claude Code se construyó además una base de datos propia de repuestos a partir de catálogos japoneses, resolviendo el acceso a la información de origen.",
    },
    resultados: {
      descripcion:
        "Hoy los clientes cotizan y compran en un solo lugar, sin pasar por WhatsApp. Toda la información de pedidos y solicitudes llega directamente al perfil administrador de RaulSpeed.",
    },
  },
  {
    id: "dilogic",
    nombre: "Dilogic",
    descripcion:
      "Web app que automatiza la generación de guías de despacho para una empresa de logística, conectada directamente con su ERP.",
    imagen: "/proyectos/dilogic-hero.jpg",
    tags: ["Claude Code", "Supabase", "Vercel"],
    desafio: {
      descripcion:
        "Dilogic, empresa de logística, generaba cientos de guías de despacho de forma manual en su ERP — una tarea que tomaba días en completarse.",
    },
    solucion: {
      descripcion:
        "Construimos una plataforma web donde se sube la solicitud de pedido y, mediante conexión directa vía API con su ERP, las guías de despacho se generan de forma automática.",
    },
    resultados: {
      descripcion:
        "Una tarea que antes tomaba días ahora se resuelve en horas, sin intervención manual en el ERP.",
    },
  },
  {
    id: "teayudo",
    nombre: "Te Ayudo",
    descripcion:
      "Agente de IA que responde en WhatsApp y conecta a los clientes con el profesional correspondiente según su necesidad — por ejemplo, gasfitería.",
    imagen: "/proyectos/teayudo-hero.jpg",
    tags: ["Claude Code", "Supabase", "Kapso"],
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
    nombre: "Lead to Customer",
    descripcion:
      "Sistema automatizado de ventas que responde a los leads en minutos, 24/7, y hace seguimiento hasta cerrar la venta.",
    imagen: "/proyectos/leadtocustomer-login.png",
    tags: ["Claude Code", "Supabase", "Vercel", "Kapso"],
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
    nombre: "HumanIA",
    descripcion:
      "HumanIA es una app de entrenamiento potenciada con Inteligencia artificial para personalizar rutinas de entrenamiento según nivel de experiencia, contexto y equipamiento.",
    imagen: "/proyectos/humania-mockup.png",
    tags: ["Gemini", "Lovable", "Supabase", "Make"],
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
    nombre: "Uruz GYM",
    descripcion:
      "Software de gestión de clientes para un gimnasio de entrenamiento personalizado.",
    imagen: "/proyectos/uruz-main.png",
    tags: ["Lovable", "Supabase"],
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
};
