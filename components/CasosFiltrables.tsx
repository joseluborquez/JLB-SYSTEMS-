"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nombreModulo } from "@/lib/modulos";
import type { Proyecto } from "@/lib/proyectos";
import { cardFlujo } from "@/lib/ui";

const filtros = [
  { id: "todos", texto: "Todos" },
  ...Object.entries(nombreModulo).map(([id, texto]) => ({ id, texto })),
];

export default function CasosFiltrables({ casos }: { casos: Proyecto[] }) {
  const [filtro, setFiltro] = useState("todos");
  const visibles = casos.filter((c) => filtro === "todos" || c.modulo === filtro);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por módulo">
        {filtros.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            aria-pressed={filtro === f.id}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 ${
              filtro === f.id
                ? "border-fg bg-accent text-accent-fg"
                : "border-border-hi text-muted hover:text-fg"
            }`}
          >
            {f.texto}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {visibles.map((caso) => (
          <Link
            key={caso.id}
            href={`/casos/${caso.id}`}
            className={`${cardFlujo} group flex flex-col overflow-hidden bg-surface transition-colors duration-150 hover:border-border-hi`}
          >
            <div className="relative aspect-video overflow-hidden border-b border-border">
              <Image
                src={caso.imagen}
                alt={caso.nombre}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="font-mono text-xs text-dim">
                {nombreModulo[caso.modulo]}
              </p>
              <h3 className="mt-2 text-base font-medium tracking-[-0.01em] text-fg">
                {caso.nombre}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {caso.descripcion}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
