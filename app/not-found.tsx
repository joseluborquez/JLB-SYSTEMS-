import Link from "next/link";
import { btnPrimary, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center py-28">
      <div className={`${container} text-center`}>
        <p className="font-mono text-xs tracking-[0.02em] text-dim">404</p>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-fg">
          Esa página no existe.
        </h1>
        <p className="mt-2 text-sm text-muted">
          Puede que el link esté roto o el proyecto ya no esté disponible.
        </p>
        <Link href="/" className={`${btnPrimary} mt-8`}>
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
