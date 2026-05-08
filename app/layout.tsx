import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";

/* Fraunces — variable display serif
   opsz 9-144 · SOFT 0-100 · WONK 0-1 · wght 100-900 · ital 0-1 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Inter Tight — variable sans for UI + body */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OLIVEIRA — AI Client Acquisition Systems",
  description:
    "We build automated systems that turn cold visitors into paying clients. WhatsApp automation, AI-powered CRM, conversion funnels. Results in 30 days.",
  openGraph: {
    title: "OLIVEIRA — AI Client Acquisition Systems",
    description: "Automated client acquisition. Results in 30 days.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  );
}
