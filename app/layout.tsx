import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Flux | AI Fejlesztő Stúdió — Weboldal, Automatizáció, Chatbot",
  description:
    "Az AI Flux magyar AI-natív fejlesztő stúdió. Intelligens weboldalak, üzleti folyamat automatizáció és chatbot megoldások, amelyek valódi eredményeket hoznak. Ingyenes konzultáció.",
  keywords: [
    "AI fejlesztés", "mesterséges intelligencia", "weboldal fejlesztés",
    "AI automatizáció", "chatbot fejlesztés", "folyamat optimalizáció",
    "digitális transzformáció", "AI ügynökség", "magyar AI fejlesztő",
    "vállalati AI megoldások", "intelligens weboldal", "üzleti automatizáció",
  ],
  openGraph: {
    title: "AI Flux | AI-Natív Fejlesztő Stúdió",
    description:
      "Nem csak weboldalt építünk — intelligens rendszereket alkotunk. Webfejlesztés, AI automatizáció és chatbot megoldások magyar vállalkozásoknak.",
    url: "https://aiflux.hu",
    siteName: "AI Flux",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Flux | AI-Natív Fejlesztő Stúdió",
    description: "Intelligens weboldalak, automatizáció és chatbotok magyar vállalkozásoknak.",
  },
  alternates: {
    canonical: "https://aiflux.hu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
