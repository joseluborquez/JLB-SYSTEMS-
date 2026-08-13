import ThemeToggle from "@/components/ThemeToggle";
import { config } from "@/lib/config";
import { container } from "@/lib/ui";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-3`}>
        {/* La marca lleva el peso; "SpA" queda como sufijo discreto, igual que
            el ".JS" de la navbar de Next en las referencias. Bajo 400px se
            oculta el sufijo para que no compita con el CTA. */}
        <a
          href="#"
          className="flex shrink-0 items-baseline gap-1.5 text-fg transition-colors duration-150 hover:text-muted"
        >
          <span className="text-base font-semibold tracking-[-0.02em] sm:text-lg">
            {config.marca}
          </span>
          <span className="hidden font-mono text-[10px] text-dim sm:inline">
            SpA
          </span>
        </a>

        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <a
            href="#planes"
            className="hidden rounded-md px-2 py-1.5 text-sm text-muted transition-colors duration-150 hover:text-fg sm:block"
          >
            Precios
          </a>
          <ThemeToggle />
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium whitespace-nowrap text-accent-fg transition-opacity duration-150 hover:opacity-90 sm:px-4"
          >
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agenda una llamada</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
