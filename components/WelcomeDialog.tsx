"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { config } from "@/lib/config";
import { btnPrimary, card } from "@/lib/ui";

export default function WelcomeDialog() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setAbierto(true), 30_000);
    return () => clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [abierto]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={() => setAbierto(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`${card} relative w-full max-w-sm bg-surface p-6 sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar"
          className="absolute top-3 right-3 rounded-md p-1.5 text-dim transition-colors duration-150 hover:text-fg"
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative size-20 overflow-hidden rounded-full border border-border-hi">
            <Image
              src="/jose-profile.png"
              alt="José Luis Bórquez"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <h2 className="mt-5 text-lg font-medium tracking-[-0.01em] text-fg">
            ¿Necesitas resolver un problema operativo?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Construyo software a medida, automatizaciones y agentes de IA.
          </p>
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} mt-6 w-full`}
            onClick={() => setAbierto(false)}
          >
            Agenda una llamada gratuita
          </a>
        </div>
      </div>
    </div>
  );
}
