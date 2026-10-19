import { config } from "@/lib/config";
import { btnPrimary, btnSecondary } from "@/lib/ui";

type Props = {
  variante?: "primario" | "secundario";
  className?: string;
  children?: React.ReactNode;
};

/** Botón de agenda: el mismo destino y texto en todas las páginas. */
export default function BotonAgenda({
  variante = "primario",
  className = "",
  children,
}: Props) {
  const base = variante === "primario" ? btnPrimary : btnSecondary;

  return (
    <a
      href={config.calendario}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`.trim()}
    >
      {children ?? config.ctaAgenda}
    </a>
  );
}
