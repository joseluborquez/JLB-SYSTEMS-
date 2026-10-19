type Item = { pregunta: string; respuesta: string };

/** Preguntas frecuentes con <details>: accesible y sin JavaScript. */
export default function Faq({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.pregunta} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium tracking-[-0.01em] text-fg [&::-webkit-details-marker]:hidden">
            {item.pregunta}
            <span
              aria-hidden="true"
              className="shrink-0 text-dim transition-transform duration-150 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {item.respuesta}
          </p>
        </details>
      ))}
    </div>
  );
}
