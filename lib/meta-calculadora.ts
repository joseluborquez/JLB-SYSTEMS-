// Estimador de costo de mensajes de Meta (WhatsApp) — igual espíritu que
// ia-calculadora.ts: un número aproximado antes de la llamada de venta, no
// una boleta exacta.
//
// Tarifas para Chile confirmadas por el usuario el 26/08/2026 (coinciden con
// una de las fuentes de terceros cruzadas en esa fecha, no con la calculadora
// oficial de Meta — esa vive detrás de un selector con JavaScript que no se
// pudo leer de forma automática). Si Meta las cambia, actualizar acá.
//
// Importante: Meta cobra por MENSAJE desde el 1 de julio de 2025, no por
// conversación de 24h como antes. Las respuestas libres del agente (categoría
// "service") son gratis hasta el 30/09/2026 y pasan a cobrarse desde el
// 01/10/2026, a la misma tarifa que utility/authentication — ver COSTOS.md.
//
// Excepción no modelada: conversaciones que arrancan desde un anuncio
// Click-to-WhatsApp entran gratis (visto en datos reales de Kapso: el
// primer mensaje trae `pricing.type = "free_entry_point"`,
// `billable: false`). No se sabe la duración exacta de esa ventana gratis,
// así que esta calculadora no la resta del total — el número que muestra es
// un techo, no lo que pagaría de verdad un cliente cuyos leads vienen
// mayormente de ads.
export const TARIFAS_META_CHILE_USD = {
  marketing: 0.0889,
  utility: 0.02,
  authentication: 0.02,
  /** Respuestas libres del agente dentro de la ventana de 24h. */
  service: 0.02,
} as const;

/** Antes del 01/10/2026 las respuestas libres son gratis. */
export const FECHA_CAMBIO_SERVICE = new Date("2026-10-01T00:00:00-04:00");

export interface EstimacionMeta {
  respuestas: number;
  recordatorios: number;
  costoRespuestasHoy: number;
  costoRespuestasDesdeOctubre: number;
  costoRecordatorios: number;
  totalHoy: number;
  totalDesdeOctubre: number;
}

export function estimarCostoMeta(
  conversacionesMes: number,
  respuestasPorConversacion: number,
  recordatoriosMes: number,
  categoriaRecordatorio: "utility" | "marketing",
): EstimacionMeta {
  const respuestas = Math.max(conversacionesMes, 0) * Math.max(respuestasPorConversacion, 0);
  const recordatorios = Math.max(recordatoriosMes, 0);

  const costoRespuestasHoy = 0; // gratis hasta el 30/09/2026
  const costoRespuestasDesdeOctubre = respuestas * TARIFAS_META_CHILE_USD.service;
  const costoRecordatorios = recordatorios * TARIFAS_META_CHILE_USD[categoriaRecordatorio];

  return {
    respuestas,
    recordatorios,
    costoRespuestasHoy,
    costoRespuestasDesdeOctubre,
    costoRecordatorios,
    totalHoy: costoRespuestasHoy + costoRecordatorios,
    totalDesdeOctubre: costoRespuestasDesdeOctubre + costoRecordatorios,
  };
}
