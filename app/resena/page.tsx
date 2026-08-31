import type { Metadata } from "next";
import ResenaForm from "@/components/ResenaForm";

export const metadata: Metadata = {
  title: "Deja tu reseña",
  description: "Cuéntame cómo fue trabajar conmigo — aparece en la página una vez que la reviso.",
};

export default function ResenaPage() {
  return <ResenaForm />;
}
