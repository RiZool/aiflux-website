import type { Metadata } from "next";
import { Space_Grotesk, Inter, Unbounded } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

// latin-ext subset kell mindenhol a magyar ő/ű karakterekhez!
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Display font - kiemelt szavakhoz (hero accent, címek gradient része)
const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiflux.hu"),
  title: "AI Flux | AI Fejlesztő Ügynökség - Weboldal, Automatizáció, Chatbot",
  description:
    "Az AI Flux magyar AI-natív fejlesztő ügynökség. Intelligens weboldalak, üzleti folyamat automatizáció és chatbot megoldások, amelyek valódi eredményeket hoznak. Ingyenes konzultáció.",
  keywords: [
    "AI fejlesztés", "mesterséges intelligencia", "weboldal fejlesztés",
    "AI automatizáció", "chatbot fejlesztés", "folyamat optimalizáció",
    "digitális transzformáció", "AI ügynökség", "magyar AI fejlesztő",
    "vállalati AI megoldások", "intelligens weboldal", "üzleti automatizáció",
  ],
  openGraph: {
    title: "AI Flux | AI-Natív Fejlesztő Ügynökség",
    description:
      "Nem csak weboldalt építünk - intelligens rendszereket alkotunk. Webfejlesztés, AI automatizáció és chatbot megoldások magyar vállalkozásoknak.",
    url: "https://aiflux.hu",
    siteName: "AI Flux",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Flux - AI-natív fejlesztő ügynökség",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Flux | AI-Natív Fejlesztő Ügynökség",
    description: "Intelligens weboldalak, automatizáció és chatbotok magyar vállalkozásoknak.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://aiflux.hu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Strukturált adat — Google jobban "érti" a céget és a keresési találatban gazdagabban jelenhet meg
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Flux",
  url: "https://aiflux.hu",
  logo: "https://aiflux.hu/logo.png",
  description:
    "Magyar AI-natív fejlesztő ügynökség. Intelligens weboldalak, üzleti folyamat automatizáció és chatbot megoldások.",
  email: "info@aiflux.hu",
  areaServed: "HU",
  knowsLanguage: "hu",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Flux",
  url: "https://aiflux.hu",
  inLanguage: "hu-HU",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${spaceGrotesk.variable} ${inter.variable} ${unbounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
