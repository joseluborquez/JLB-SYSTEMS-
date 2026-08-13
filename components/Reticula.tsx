/**
 * Retícula decorativa de fondo: dos líneas verticales alineadas al ancho del
 * contenido, con cruces en las esquinas. Es el recurso más reconocible de las
 * referencias de Vercel y da estructura sin agregar ruido.
 *
 * Va dentro de una sección con `relative`. No captura clics ni lectores de
 * pantalla.
 */
export default function Reticula() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      <div className="relative mx-auto h-full w-full max-w-5xl">
        <div className="absolute inset-y-0 left-5 w-px bg-border sm:left-6" />
        <div className="absolute inset-y-0 right-5 w-px bg-border sm:right-6" />

        <Cruz className="left-5 top-24 sm:left-6" />
        <Cruz className="right-5 top-24 sm:right-6" />
        <Cruz className="left-5 bottom-16 sm:left-6" />
        <Cruz className="right-5 bottom-16 sm:right-6" />
      </div>
    </div>
  );
}

/** Cruz fina centrada sobre la línea vertical. */
function Cruz({ className }: { className: string }) {
  return (
    <span className={`absolute block size-3 -translate-x-1/2 ${className}`}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-border-hi" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-hi" />
    </span>
  );
}
