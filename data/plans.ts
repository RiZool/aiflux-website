export type Plan = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  price: number;
  monthly: number;
  highlight: boolean;
  badge?: string;
  highlights: string[];
  features: { text: string; included: boolean }[];
};

export const plans: Plan[] = [
  {
    id: "alap",
    name: "Alap",
    emoji: "🌊",
    tagline: "Professzionális webjelenlét",
    price: 150000,
    monthly: 15000,
    highlight: false,
    highlights: ["5 oldalas Next.js weboldal", "SEO + mobil reszponzív", "Vercel hosting + domain"],
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "AI Chatbot", included: false },
      { text: "Hírlevél automatizálás", included: false },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "halado",
    name: "Haladó",
    emoji: "⚡",
    tagline: "Weboldal + AI ügyfélszolgálat",
    price: 250000,
    monthly: 25000,
    highlight: false,
    highlights: ["Alap csomag tartalma", "Flux Lite chatbot (0-24, magyar)", "Többcsatornás telepítés"],
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "Flux Lite chatbot (0-24, magyar)", included: true },
      { text: "Hírlevél automatizálás", included: false },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "premium",
    name: "Prémium",
    emoji: "🚀",
    tagline: "Weboldal + AI foglalási rendszer",
    price: 320000,
    monthly: 35000,
    highlight: true,
    badge: "Legnépszerűbb",
    highlights: ["Haladó csomag tartalma", "Flux Pro chatbot (foglalással)", "Google Calendar integráció"],
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "Flux Pro chatbot (foglalással, 0-24, magyar)", included: true },
      { text: "Google Calendar integráció", included: true },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "extra",
    name: "Extra",
    emoji: "🔥",
    tagline: "Teljeskörű AI transzformáció",
    price: 550000,
    monthly: 50000,
    highlight: false,
    highlights: ["Prémium csomag tartalma", "Egyedi Make/n8n folyamatok", "Teljeskörű AI integráció"],
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "Flux Pro chatbot (foglalással, 0-24, magyar)", included: true },
      { text: "Google Calendar integráció", included: true },
      { text: "Egyedi Make/n8n folyamatok", included: true },
    ],
  },
];

export function formatPrice(price: number) {
  return price.toLocaleString("hu-HU") + " Ft";
}
