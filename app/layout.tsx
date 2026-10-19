import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import EfectoCtas from "@/components/EfectoCtas";
import EfectoTarjetas from "@/components/EfectoTarjetas";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titulo = "JLB Systems — Auditoría de flujos con IA para tu negocio";
const descripcion =
  "Convierte tus procesos manuales en sistemas con IA que tu equipo domina. Conectamos las herramientas que ya usas, automatizamos lo repetitivo y capacitamos a tu equipo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jlbsystems.cl"),
  title: {
    default: titulo,
    template: "%s — JLB Systems",
  },
  description: descripcion,
  openGraph: {
    title: titulo,
    description: descripcion,
    url: "https://www.jlbsystems.cl",
    siteName: "JLB Systems",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/og/default.png"],
  },
};

// Corre antes del primer paint para que la página no aparezca con el tema
// equivocado y después salte. Por eso va inline y no en un componente.
const scriptTema = `
(function () {
  try {
    var guardado = localStorage.getItem('jlb-tema');
    var tema =
      guardado === 'light' || guardado === 'dark'
        ? guardado
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    document.documentElement.dataset.theme = tema;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      // El script de arriba escribe data-theme antes de hidratar.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <EfectoTarjetas />
        <EfectoCtas />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
