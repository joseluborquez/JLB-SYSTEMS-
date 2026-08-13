"use client";

export const CLAVE_TEMA = "jlb-tema";

/**
 * Alterna entre claro y oscuro y guarda la elección en localStorage.
 *
 * El tema inicial ya lo dejó puesto el script inline de app/layout.tsx antes
 * del primer paint, así que este componente solo escribe: no lee estado en
 * useEffect ni re-renderiza. Los íconos se intercambian por CSS según el
 * data-theme del <html>, por eso no hay desajuste de hidratación ni parpadeo.
 */
export default function ThemeToggle() {
  function alternar() {
    const actual = document.documentElement.dataset.theme;
    const siguiente = actual === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = siguiente;
    try {
      localStorage.setItem(CLAVE_TEMA, siguiente);
    } catch {
      // Modo incógnito o storage bloqueado: el tema igual cambia en esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label="Cambiar entre tema claro y oscuro"
      className="rounded-full border border-border p-2 text-muted transition-colors duration-150 hover:border-border-hi hover:text-fg"
    >
      {/* Visible en tema oscuro: ofrece pasar a claro. */}
      <svg
        className="jlb-icono-oscuro"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Visible en tema claro: ofrece pasar a oscuro. */}
      <svg
        className="jlb-icono-claro"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
      </svg>
    </button>
  );
}
