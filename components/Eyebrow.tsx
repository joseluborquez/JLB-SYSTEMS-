type Props = {
  children: React.ReactNode;
  /** Ícono opcional a la izquierda. 14×14, trazo currentColor. */
  icono?: React.ReactNode;
};

/**
 * Etiqueta pequeña sobre el titular de una sección ("✦ The AI Cloud" en las
 * referencias de Vercel). Da jerarquía sin agregar otro tamaño de texto.
 */
export default function Eyebrow({ children, icono }: Props) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-[0.02em] text-dim">
      {icono}
      {children}
    </p>
  );
}

const svgProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconoChispa = (
  <svg {...svgProps}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Z" />
  </svg>
);

export const IconoReloj = (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconoFlujo = (
  <svg {...svgProps}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 6.5h4a2 2 0 0 1 2 2V14" />
  </svg>
);

export const IconoCapas = (
  <svg {...svgProps}>
    <path d="M12 3l9 5-9 5-9-5 9-5Z" />
    <path d="M3 14l9 5 9-5" />
  </svg>
);

export const IconoEtiqueta = (
  <svg {...svgProps}>
    <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
    <circle cx="7.5" cy="7.5" r="1.25" />
  </svg>
);
