interface Props {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
}

/** Solo lectura si no se pasa `onChange`; si se pasa, es un radiogroup
 * interactivo de 1 a 5 (usado en /resena). */
export default function StarRating({ value, onChange, className }: Props) {
  const interactivo = typeof onChange === "function";

  return (
    <div
      className={`flex items-center gap-1 ${className ?? ""}`}
      role={interactivo ? "radiogroup" : undefined}
    >
      {[1, 2, 3, 4, 5].map((estrella) => {
        const llena = estrella <= value;
        const icono = (
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill={llena ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={llena ? "text-fg" : "text-dim"}
            aria-hidden="true"
          >
            <path d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L12 16.7l-5.3 2.9 1.1-5.9-4.3-4.1 5.9-.7L12 3.5Z" />
          </svg>
        );

        if (!interactivo) {
          return <span key={estrella}>{icono}</span>;
        }

        return (
          <button
            key={estrella}
            type="button"
            role="radio"
            aria-checked={value === estrella}
            aria-label={`${estrella} de 5 estrellas`}
            onClick={() => onChange?.(estrella)}
            className="rounded-sm p-0.5 transition-transform duration-150 hover:scale-110 focus-visible:outline-none"
          >
            {icono}
          </button>
        );
      })}
    </div>
  );
}
