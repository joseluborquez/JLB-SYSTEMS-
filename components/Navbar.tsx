"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { config } from "@/lib/config";
import { container } from "@/lib/ui";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/#portafolio", texto: "Portafolio" },
  { href: "/agentes-ia", texto: "Agentes IA" },
  { href: "/agentes-ia#planes", texto: "Precios" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-3`}>
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-1.5 text-fg transition-colors duration-150 hover:text-muted"
        >
          <span className="text-base font-semibold tracking-[-0.02em] sm:text-lg">
            {config.marca}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <nav className="hidden items-center gap-1.5 md:flex">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="rounded-md px-2 py-1.5 text-sm text-muted transition-colors duration-150 hover:text-fg"
              >
                {enlace.texto}
              </Link>
            ))}
          </nav>

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

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-fg transition-colors duration-150 hover:bg-surface md:hidden"
          >
            {abierto ? (
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {abierto ? (
        <nav className="border-t border-border bg-bg md:hidden">
          <div className={`${container} flex flex-col py-2`}>
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                onClick={() => setAbierto(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted transition-colors duration-150 hover:text-fg"
              >
                {enlace.texto}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
