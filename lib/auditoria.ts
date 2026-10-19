// Contenido de la oferta (Ruta de autonomía): la portada y las preguntas
// frecuentes lo leen de acá. Sin precios: por decisión, el precio de la
// auditoría no se muestra en el sitio, solo en la conversación de alcance.
//
// Tres meses: 1) auditoría realizada y hoja de ruta entregada, 2) implementación
// realizada y equipo capacitado, 3) acompañamiento. Los entregables se llaman
// Mapa de flujos, Hoja de ruta y Kit de traspaso.

export const pasos = [
  {
    titulo: "Auditoría y hoja de ruta",
    texto: "Auditoría realizada y hoja de ruta entregada.",
  },
  {
    titulo: "Implementación y capacitación",
    texto: "Implementación realizada y equipo capacitado.",
  },
  {
    titulo: "Acompañamiento",
    texto: "Revisión de métricas, mejoras y autonomía.",
  },
];

// Los tres meses con sus puntos clave: alimentan el menú ramificado de la
// portada (PasosRecorrido). Todo sale de la oferta; no hay cifras.
export interface PuntoClave {
  value: string;
  label: string;
  titulo: string;
  texto: string;
}

export interface PasoConPuntos {
  label: string;
  resumen: string;
  puntos: PuntoClave[];
}

export const pasosConPuntos: PasoConPuntos[] = [
  {
    label: "Mes 1 · Auditoría y hoja de ruta",
    resumen: pasos[0].texto,
    puntos: [
      {
        value: "flujos",
        label: "Los flujos de tu negocio",
        titulo: "Revisamos el negocio completo, no solo una parte",
        texto:
          "Los flujos que apliquen a tu caso: por ejemplo captación, atención, venta y seguimiento, operación, cobro y administración, herramientas y equipo.",
      },
      {
        value: "entrevista",
        label: "Entrevista",
        titulo: "Conversamos con quien conoce el negocio",
        texto:
          "Entrevista con el dueño y, según el tamaño del negocio, con el encargado de cada área, para ver cómo se trabaja en la práctica.",
      },
      {
        value: "herramientas",
        label: "Herramientas y datos",
        titulo: "Qué usas hoy",
        texto:
          "Revisamos las herramientas del equipo y qué calidad tienen los datos.",
      },
      {
        value: "punto-de-partida",
        label: "Mapa de flujos",
        titulo: "Medimos antes de cambiar nada",
        texto:
          "El Mapa de flujos muestra cómo trabaja hoy tu negocio, con el punto de partida medido. Sin él no se puede demostrar el impacto.",
      },
      {
        value: "hoja-de-ruta",
        label: "Hoja de ruta",
        titulo: "Qué, en qué orden y con qué impacto",
        texto:
          "Los módulos que aplican, ordenados y con el impacto esperado de cada uno. Evaluamos la factibilidad técnica de cada integración antes de proponerla.",
      },
      {
        value: "es-tuya",
        label: "Es tuya",
        titulo: "El Mapa de flujos y la Hoja de ruta son tuyos",
        texto:
          "Son tuyos desde la entrega: puedes ejecutarlos con otro proveedor si lo prefieres.",
      },
    ],
  },
  {
    label: "Mes 2 · Implementación y capacitación",
    resumen: pasos[1].texto,
    puntos: [
      {
        value: "solo-lo-que-eliges",
        label: "Solo lo que eliges",
        titulo: "Implementamos únicamente lo que decides",
        texto:
          "Solo los módulos que eliges salen de la hoja de ruta. Y la auditoría puede concluir que en alguna área no conviene aplicar nada.",
      },
      {
        value: "capacitacion",
        label: "Capacitación incluida",
        titulo: "Para que lo operes tú",
        texto:
          "Cada módulo incluye la capacitación y el know-how para que lo operes y lo modifiques con autonomía.",
      },
      {
        value: "pruebas",
        label: "Entorno de pruebas",
        titulo: "Los cambios se prueban antes de salir",
        texto:
          "Trabajamos en un entorno de pruebas separado de producción, y los cambios pasan por ahí antes de salir.",
      },
      {
        value: "kit-de-traspaso",
        label: "Kit de traspaso",
        titulo: "Todo queda a tu nombre",
        texto:
          "Accesos a tu nombre, guía de uso y la capacitación al equipo. Antes de cerrar, tu equipo hace un cambio real, acompañado por nosotros.",
      },
    ],
  },
  {
    label: "Mes 3 · Acompañamiento",
    resumen: pasos[2].texto,
    puntos: [
      {
        value: "metricas",
        label: "Métricas",
        titulo: "Revisión contra el punto de partida",
        texto:
          "Revisamos las métricas y las comparamos con el punto de partida medido en la auditoría.",
      },
      {
        value: "mejoras",
        label: "Mejoras",
        titulo: "Ajustamos según lo que muestren los números",
        texto: "Mejoras sobre lo implementado, guiadas por las métricas.",
      },
      {
        value: "autonomia",
        label: "Autonomía",
        titulo: "Que dependas cada vez menos de nosotros",
        texto:
          "Seguimos disponibles mientras tu equipo gana confianza para usar y ajustar el sistema por su cuenta.",
      },
    ],
  },
];

export const faqsAuditoria = [
  {
    pregunta: "¿Y si ya sé qué necesito?",
    respuesta:
      "Podemos partir directo por un sistema acotado: lo conversamos en los 30 minutos y lo construimos conectado a tus herramientas. Si prefieres entender primero dónde conviene aplicar IA, partimos con una auditoría de flujos.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta:
      "El alcance y el valor se definen en una conversación de 30 minutos, según las áreas, personas y sistemas que tenga tu negocio. Lo mismo vale para cada módulo que decidas implementar.",
  },
  {
    pregunta: "¿Qué necesito aportar?",
    respuesta:
      "Tiempo del dueño y, según el tamaño del negocio, del encargado de cada área; acceso a las herramientas y datos que usas hoy; y una persona de contacto que conozca el día a día. No necesitas un equipo técnico: te capacitamos para que lo manejes.",
  },
  {
    pregunta: "¿Cuánto dura?",
    respuesta:
      "La Ruta de autonomía se piensa en tres meses. En el primero hacemos la auditoría y entregamos la hoja de ruta; en el segundo implementamos y capacitamos a tu equipo; en el tercero te acompañamos con las métricas y los ajustes. En la conversación de 30 minutos confirmamos los plazos para tu caso.",
  },
  {
    pregunta: "¿Con quién hay que hablar?",
    respuesta:
      "Siempre con el dueño. Según el tamaño del negocio, también con el encargado de cada área, para ver cómo se trabaja en la práctica y no solo cómo se cree que se trabaja.",
  },
  {
    pregunta: "¿Qué pasa si la auditoría concluye que no conviene automatizar?",
    respuesta:
      "Te lo decimos. En algunas áreas lo correcto es no aplicar nada, y esa conclusión también está dentro de la Hoja de ruta. Los módulos se recomiendan por lo que necesita tu flujo, no por lo que vendamos.",
  },
  {
    pregunta: "¿Estoy obligado a implementar contigo?",
    respuesta:
      "No. El Mapa de flujos y la Hoja de ruta son tuyos desde la entrega y puedes ejecutarlos con otro proveedor.",
  },
  {
    pregunta: "Si implemento contigo, ¿se paga dos veces?",
    respuesta:
      "No: si decides implementar con nosotros, la auditoría se descuenta de los módulos que elijas. Los detalles se ven en la conversación de alcance.",
  },
];
