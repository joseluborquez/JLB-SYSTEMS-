import { config } from "@/lib/config";
import { container } from "@/lib/ui";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div
        className={`${container} flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between`}
      >
        {/* Mismo logotipo que la navbar. Si algún día hay un archivo de logo,
            se reemplaza acá y en components/Navbar.tsx. */}
        <a
          href="#"
          className="flex items-baseline gap-1.5 text-fg transition-colors duration-150 hover:text-muted"
        >
          <span className="text-base font-semibold tracking-[-0.02em] sm:text-lg">
            {config.marca}
          </span>
          <span className="font-mono text-[10px] text-dim">SpA</span>
        </a>

        <a
          href={`mailto:${config.email}`}
          className="text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          {config.email}
        </a>
      </div>
    </footer>
  );
}
