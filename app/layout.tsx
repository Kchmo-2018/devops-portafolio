import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { PROFILE, SITE } from "../content/data";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-src", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-src",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-src", display: "swap" });

export const metadata: Metadata = {
  /* Solo el dominio: Next ya antepone basePath (/devops-portafolio) a las imágenes e iconos. */
  metadataBase: new URL(new URL(SITE.url).origin),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: PROFILE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

export const viewport: Viewport = { themeColor: SITE.themeColor };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}