// Estimador de costo de IA por modelo — para que el cliente vea un número
// aproximado ANTES de elegir, no una sorpresa en la boleta.
//
// Precios oficiales verificados el 26/08/2026 (fuente: páginas de pricing de
// cada proveedor, no agregadores de terceros — ver conversación de esa fecha).
// Si un proveedor cambia precios, actualizar acá y en ningún otro lado: este
// archivo es la única fuente de verdad para el cálculo.
//
// MODELO DE TOKENS (supuestos, no medidos por proveedor):
//
// Lo único medido de verdad es Claude: 13.400 tokens de contexto cacheado
// (prompt + schemas de tools) y ~1,8 llamadas al modelo por cada respuesta
// que manda el agente, porque cada tool que invoca es un viaje aparte.
// Eso viene de COSTOS.md del CRM (medido el 17/08 con 240 llamadas reales).
//
// Para comparar los tres proveedores con el mismo criterio, se aplican esos
// mismos 13.400 tokens de contexto a los tres, más dos supuestos calibrados
// para que el costo de Claude reproduzca el número medido ($0,124 por
// conversación de 10 respuestas): 500 tokens nuevos de input y 800 de output
// por llamada. No son datos reales de OpenAI ni de Gemini — son la misma
// "forma" de conversación aplicada a cada tabla de precios. Sirve para
// comparar el orden de magnitud entre modelos, no como factura exacta.
const TOKENS_CONTEXTO_CACHEADO = 13_400;
const TOKENS_INPUT_NUEVO_POR_LLAMADA = 500;
const TOKENS_OUTPUT_POR_LLAMADA = 800;
const LLAMADAS_POR_RESPUESTA = 1.8;

export const RESPUESTAS_POR_CONVERSACION_DEFAULT = 10;

export type ProveedorId = "anthropic" | "openai" | "google";

export interface ModeloIA {
  proveedor: ProveedorId;
  proveedorNombre: string;
  modelo: string; // id exacto del modelo, para que quede trazable
  modeloNombre: string; // nombre para mostrar
  /** Logo oficial del proveedor, en /public/logos. Fuente: Simple Icons
   *  (Anthropic, Google Gemini) y Wikimedia Commons (OpenAI, no está en
   *  Simple Icons — su ícono fue retirado de ese proyecto). */
  logo: string;
  /** Costo por millón de tokens, en USD. */
  precios: {
    input: number;
    /** Solo Anthropic cobra un premio por escribir la caché la primera vez.
     *  OpenAI y Gemini cachean automático a precio de input normal. */
    cacheWrite?: number;
    cacheRead: number;
    output: number;
    /** Solo Gemini: cobro de almacenamiento de caché, por hora. */
    storagePorHora?: number;
  };
}

export const MODELOS: ModeloIA[] = [
  {
    proveedor: "anthropic",
    proveedorNombre: "Anthropic",
    modelo: "claude-haiku-4-5",
    modeloNombre: "Claude Haiku 4.5",
    logo: "/logos/anthropic.svg",
    precios: { input: 1.0, cacheWrite: 1.25, cacheRead: 0.1, output: 5.0 },
  },
  {
    proveedor: "google",
    proveedorNombre: "Google",
    modelo: "gemini-2.5-flash-lite",
    modeloNombre: "Gemini 2.5 Flash-Lite",
    logo: "/logos/google-gemini.svg",
    precios: { input: 0.1, cacheRead: 0.01, output: 0.4, storagePorHora: 1.0 },
  },
  {
    proveedor: "openai",
    proveedorNombre: "OpenAI",
    modelo: "gpt-5-nano",
    modeloNombre: "GPT-5 Nano",
    logo: "/logos/openai.svg",
    precios: { input: 0.05, cacheRead: 0.005, output: 0.4 },
  },
];

/** Duración promedio asumida de una conversación activa, para el cobro de
 * almacenamiento de caché de Gemini (es el único proveedor de los tres que
 * cobra por eso). Ajustable si se mide un dato real. */
const DURACION_CONVERSACION_HORAS = 0.25; // 15 minutos

function costoPorConversacion(modelo: ModeloIA, respuestas: number): number {
  const { precios } = modelo;
  const llamadasTotales = respuestas * LLAMADAS_POR_RESPUESTA;
  const llamadasSubsecuentes = Math.max(llamadasTotales - 1, 0);

  const precioEscrituraCache = precios.cacheWrite ?? precios.input;

  // Primera llamada: crea la caché. En Anthropic paga el premio de
  // escritura; en OpenAI/Gemini se cobra a precio de input normal porque no
  // existe ese concepto.
  const costoPrimeraLlamada =
    (TOKENS_CONTEXTO_CACHEADO * precioEscrituraCache) / 1_000_000 +
    (TOKENS_OUTPUT_POR_LLAMADA * precios.output) / 1_000_000;

  const costoLlamadaSubsecuente =
    (TOKENS_CONTEXTO_CACHEADO * precios.cacheRead) / 1_000_000 +
    (TOKENS_INPUT_NUEVO_POR_LLAMADA * precios.input) / 1_000_000 +
    (TOKENS_OUTPUT_POR_LLAMADA * precios.output) / 1_000_000;

  const costoStorage = precios.storagePorHora
    ? (TOKENS_CONTEXTO_CACHEADO * precios.storagePorHora * DURACION_CONVERSACION_HORAS) /
      1_000_000
    : 0;

  return (
    costoPrimeraLlamada + llamadasSubsecuentes * costoLlamadaSubsecuente + costoStorage
  );
}

/** Estimación de costo de IA mensual, en USD, para mostrar en la calculadora. */
export function estimarCostoMensual(
  modelo: ModeloIA,
  conversacionesMes: number,
  respuestasPorConversacion: number = RESPUESTAS_POR_CONVERSACION_DEFAULT,
): number {
  if (conversacionesMes <= 0) return 0;
  return conversacionesMes * costoPorConversacion(modelo, respuestasPorConversacion);
}
