"use client";

import { useState } from "react";
import BranchedMenu from "@/components/BranchedMenu";
import { pasosConPuntos } from "@/lib/auditoria";
import { cardFlujo } from "@/lib/ui";

// Menú ramificado (BranchedMenu, React Bits): los tres meses son las ramas
// y sus puntos clave los hijos. Al elegir un punto, el panel de la derecha
// muestra su detalle. Los colores usan los tokens del sitio, así que siguen
// el tema claro/oscuro solos.
const items = pasosConPuntos.map((paso) => ({
  label: paso.label,
  children: paso.puntos.map(({ value, label }) => ({ value, label })),
}));

function buscar(valor: string) {
  for (const paso of pasosConPuntos) {
    const punto = paso.puntos.find((p) => p.value === valor);
    if (punto) return { paso, punto };
  }
  return { paso: pasosConPuntos[0], punto: pasosConPuntos[0].puntos[0] };
}

export default function ArbolPasos() {
  const [valor, setValor] = useState(pasosConPuntos[0].puntos[0].value);
  const { paso, punto } = buscar(valor);

  return (
    <div className="mt-14 grid items-start gap-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-14">
      <BranchedMenu
        items={items}
        defaultOpen={0}
        defaultActive={pasosConPuntos[0].puntos[0].value}
        onSelect={(v) => setValor(v)}
        color="var(--color-fg)"
        accentColor="var(--color-fg)"
        lineColor="var(--color-border-hi)"
        width={272}
        rowHeight={38}
        indent={40}
        fontSize={14}
      />

      <div className={`${cardFlujo} bg-surface p-6 sm:p-8`} aria-live="polite">
        <p className="font-mono text-xs text-dim">{paso.label}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{paso.resumen}</p>
        <div className="mt-6 border-t border-border pt-6">
          <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
            {punto.titulo}
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            {punto.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
