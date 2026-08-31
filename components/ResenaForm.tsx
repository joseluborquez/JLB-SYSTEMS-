"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import { supabase } from "@/lib/supabase";
import { btnPrimary, btnSecondary, card, container } from "@/lib/ui";

const BUCKET = "testimonial-photos";
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];

interface Valores {
  name: string;
  role: string;
  email: string;
  rating: number;
  quote: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Mismos checks que las CHECK constraints de la tabla — a mano, sin zod
 * ni react-hook-form, consistente con el resto del sitio. */
function validar(v: Valores): Partial<Record<keyof Valores, string>> {
  const errores: Partial<Record<keyof Valores, string>> = {};

  const nombre = v.name.trim();
  if (nombre.length < 2 || nombre.length > 80) {
    errores.name = "El nombre debe tener entre 2 y 80 caracteres.";
  }
  if (v.role.trim().length > 120) {
    errores.role = "Máximo 120 caracteres.";
  }
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) {
    errores.email = "Ingresa un email válido.";
  }
  if (v.email.trim().length > 160) {
    errores.email = "Máximo 160 caracteres.";
  }
  if (v.rating < 1 || v.rating > 5) {
    errores.rating = "Elige una puntuación.";
  }
  const quote = v.quote.trim();
  if (quote.length < 20 || quote.length > 600) {
    errores.quote = "Cuéntame un poco más (entre 20 y 600 caracteres).";
  }

  return errores;
}

const iniciales = (nombre: string) =>
  nombre
    .trim()
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ResenaForm() {
  const [valores, setValores] = useState<Valores>({
    name: "",
    role: "",
    email: "",
    rating: 0,
    quote: "",
  });
  const [errores, setErrores] = useState<Partial<Record<keyof Valores, string>>>({});
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const inputFotoRef = useRef<HTMLInputElement>(null);

  const onFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      setErrorEnvio("La foto debe ser JPG, PNG o WebP.");
      return;
    }
    if (archivo.size > MAX_PHOTO_BYTES) {
      setErrorEnvio("La foto no puede pesar más de 2 MB.");
      return;
    }

    setErrorEnvio(null);
    setFoto(archivo);
    setPreviewFoto((anterior) => {
      if (anterior) URL.revokeObjectURL(anterior);
      return URL.createObjectURL(archivo);
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return;

    setEnviando(true);
    setErrorEnvio(null);

    try {
      let photoUrl: string | null = null;

      if (foto) {
        const extension = foto.name.split(".").pop() ?? "jpg";
        const path = `${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, foto, { contentType: foto.type, upsert: false });
        if (uploadError) throw uploadError;

        photoUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      }

      const { error } = await supabase.from("testimonials").insert({
        name: valores.name.trim(),
        role: valores.role.trim() || null,
        email: valores.email.trim() || null,
        rating: valores.rating,
        quote: valores.quote.trim(),
        photo_url: photoUrl,
        approved: false,
      });
      if (error) throw error;

      setEnviado(true);
    } catch (err) {
      console.error(err);
      setErrorEnvio("No pudimos enviar tu reseña. Inténtalo de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <section className="flex flex-1 items-center justify-center py-28">
        <div className={`${card} ${container} max-w-md bg-surface p-8 text-center sm:p-10`}>
          <h1 className="text-xl font-medium tracking-[-0.01em] text-fg">¡Gracias!</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Recibí tu reseña. La reviso y en cuanto la apruebe aparece en el sitio.
          </p>
          <Link href="/" className={`${btnPrimary} mt-8`}>
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 sm:py-32">
      <div className={`${container} max-w-xl`}>
        <h1 className="text-2xl font-medium tracking-[-0.02em] text-fg">Deja tu reseña</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Cuéntame cómo fue trabajar conmigo — esto aparece en mi página web una vez que lo revise.
        </p>

        <form onSubmit={onSubmit} className={`${card} mt-8 flex flex-col gap-6 bg-surface p-6 sm:p-8`} noValidate>
          <Campo label="Nombre *" error={errores.name}>
            <input
              type="text"
              value={valores.name}
              onChange={(e) => setValores((v) => ({ ...v, name: e.target.value }))}
              placeholder="Juan Pérez"
              className={inputClass}
            />
          </Campo>

          <Campo label="Cargo y empresa" error={errores.role} hint="Aparece bajo tu nombre en la tarjeta.">
            <input
              type="text"
              value={valores.role}
              onChange={(e) => setValores((v) => ({ ...v, role: e.target.value }))}
              placeholder="Fundador de Acme"
              className={inputClass}
            />
          </Campo>

          <Campo label="Puntuación *" error={errores.rating}>
            <StarRating
              value={valores.rating}
              onChange={(rating) => setValores((v) => ({ ...v, rating }))}
            />
          </Campo>

          <Campo
            label="Tu reseña *"
            error={errores.quote}
            hint={`${valores.quote.length}/600 caracteres`}
          >
            <textarea
              rows={5}
              value={valores.quote}
              onChange={(e) => setValores((v) => ({ ...v, quote: e.target.value }))}
              placeholder="¿Qué problema resolvimos y qué cambió en tu negocio?"
              className={`${inputClass} resize-none`}
            />
          </Campo>

          <Campo label="Foto de perfil o logo de la empresa" hint="Opcional · JPG, PNG o WebP · máx. 2 MB">
            <div className="flex items-center gap-4">
              {previewFoto ? (
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-border-hi">
                  <Image src={previewFoto} alt="" fill sizes="56px" className="object-cover" />
                </div>
              ) : (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border-hi font-mono text-xs text-muted">
                  {iniciales(valores.name) || "—"}
                </div>
              )}
              <button
                type="button"
                onClick={() => inputFotoRef.current?.click()}
                className={btnSecondary}
              >
                {foto ? "Cambiar imagen" : "Subir imagen"}
              </button>
              <input
                ref={inputFotoRef}
                type="file"
                accept={TIPOS_PERMITIDOS.join(",")}
                className="sr-only"
                onChange={onFoto}
              />
            </div>
          </Campo>

          <Campo
            label="Email"
            error={errores.email}
            hint="No se publica. Solo para contactarte si tengo alguna duda."
          >
            <input
              type="email"
              value={valores.email}
              onChange={(e) => setValores((v) => ({ ...v, email: e.target.value }))}
              placeholder="juan@empresa.com"
              className={inputClass}
            />
          </Campo>

          {errorEnvio ? <p className="text-sm text-red-400">{errorEnvio}</p> : null}

          <button type="submit" disabled={enviando} className={btnPrimary}>
            {enviando ? "Enviando..." : "Enviar reseña"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg outline-none transition-colors duration-150 placeholder:text-dim focus:border-border-hi";

function Campo({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-fg">{label}</span>
      {children}
      {error ? (
        <span className="text-xs text-red-400">{error}</span>
      ) : hint ? (
        <span className="text-xs text-dim">{hint}</span>
      ) : null}
    </label>
  );
}
