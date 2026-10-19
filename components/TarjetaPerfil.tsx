"use client";

import Image from "next/image";
import ReflectiveCard from "@/components/ReflectiveCard";
import { config } from "@/lib/config";
import { useTemaClaro } from "@/lib/useTemaClaro";

/** Tarjeta metálica con la foto, el nombre y el cargo. Sin datos de relleno. */
export default function TarjetaPerfil() {
  const claro = useTemaClaro();

  return (
    <ReflectiveCard
      theme={claro ? "light" : "dark"}
      width={300}
      height={400}
      className="shrink-0"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="relative flex-1 overflow-hidden rounded-xl">
          <Image
            src="/jose-profile.png"
            alt={config.persona}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-medium tracking-[-0.02em]">
            {config.persona}
          </p>
          <p className="text-sm" style={{ color: "var(--rc-muted)" }}>
            AI Operations Expert
          </p>
        </div>
      </div>
    </ReflectiveCard>
  );
}
