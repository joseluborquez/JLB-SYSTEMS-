// Helpers de URL de Cloudinary — sin SDK, solo string splicing sobre el
// secure_url que devuelve el upload. El video se guarda tal cual llega;
// las variantes (transcodificada, thumbnail) se arman al vuelo con
// parámetros de transformación en la URL, no se pre-generan ni se guardan.

const UPLOAD_MARKER = "/upload/";

function conTransformacion(url: string, transformacion: string): string {
  const i = url.indexOf(UPLOAD_MARKER);
  if (i === -1) return url;
  const corte = i + UPLOAD_MARKER.length;
  return `${url.slice(0, corte)}${transformacion}/${url.slice(corte)}`;
}

/** Entrega el video recomprimido al formato/calidad que mejor le sirva al
 * navegador del visitante (f_auto, q_auto), en vez del archivo original. */
export function videoOptimizado(url: string): string {
  return conTransformacion(url, "f_auto,q_auto");
}

/** Miniatura (frame del segundo 0) para usar como poster del <video>. */
export function videoThumbnail(url: string): string {
  return conTransformacion(url, "so_0").replace(/\.\w+$/, ".jpg");
}
