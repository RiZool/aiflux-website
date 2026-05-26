export type WorkflowCategory = 'Elemzés' | 'Kommunikáció' | 'Értékesítés' | 'Admin';

export type Workflow = {
  id: string;
  title: string;
  desc: string;
  category: WorkflowCategory;
  icon: string;
  tags: string[];
  priceLabel: string;
  status: 'active' | 'soon';
};

// ── ÚJ FOLYAMAT HOZZÁADÁSA ──────────────────────────────────────────────────
// Másold le az egyik objektumot, add meg az id-t, title-t, desc-t stb.
// status: 'active' → kész, kiválasztható | 'soon' → hamarosan, nem klikkelható
// ────────────────────────────────────────────────────────────────────────────
export const workflows: Workflow[] = [
  {
    id: 'prezentacio-keszito',
    title: 'AI Prezentáció Készítő',
    desc: 'Töltsd fel az adatfájlod (Excel, CSV, PDF, Word) és az AI percek alatt profi prezentációt készít belőle — grafikonokkal, KPI-kkal, interaktív slide-okkal.',
    category: 'Elemzés',
    icon: '📊',
    tags: ['Claude AI', 'n8n', 'Excel · CSV · PDF'],
    priceLabel: '50 000 Ft beállítás',
    status: 'active',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot (0-24)',
    desc: 'Magyar nyelvű, tudásbázisra épülő chatbot, ami ismeri a vállalkozásodat. Automatikusan válaszol az ügyfeleknek — weboldal, Messenger vagy belső rendszeren.',
    category: 'Kommunikáció',
    icon: '🤖',
    tags: ['RAG', 'Claude AI', 'Többcsatornás'],
    priceLabel: 'Egyedi árajánlat',
    status: 'active',
  },
  {
    id: 'hirlevel-automatizacio',
    title: 'Hírlevél & Welcome Sorozat',
    desc: 'Automatikus üdvözlő e-mail sorozat új feliratkozóknak, szegmentálással. A megfelelő üzenet, a megfelelő embernek, a megfelelő időben — emberi beavatkozás nélkül.',
    category: 'Kommunikáció',
    icon: '📧',
    tags: ['MailerLite', 'n8n', 'Email marketing'],
    priceLabel: 'Egyedi árajánlat',
    status: 'active',
  },
  {
    id: 'lead-kvalifikalo',
    title: 'Lead Kvalifikáló Bot',
    desc: 'Ajánlatkérők automatikusan átmennek egy AI-vezérelt minősítési folyamaton. A jó leadek rögtön a CRM-be kerülnek, a gyengébbeket kezeli a rendszer.',
    category: 'Értékesítés',
    icon: '🎯',
    tags: ['AI értékelés', 'CRM integráció', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'email-asszisztens',
    title: 'AI Email Asszisztens',
    desc: 'Beérkező e-mailek automatikus kategorizálása, prioritizálása és előre megírt AI-válaszok generálása. A csapat csak jóváhagyja — a rendszer küld.',
    category: 'Admin',
    icon: '✉️',
    tags: ['Gmail · Outlook', 'Claude AI', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'dokumentum-osszefoglalo',
    title: 'Dokumentum Összefoglaló',
    desc: 'Hosszú szerződések, riportok, pályázatok feltöltésekor az AI percek alatt elkészíti a lényeget — kiemelt pontokkal, kockázatokkal, teendőkkel.',
    category: 'Admin',
    icon: '📄',
    tags: ['PDF · Word', 'Claude AI', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'ajanlatkereso-automatizacio',
    title: 'Ajánlatkérés Automatizátor',
    desc: 'Weboldal-form kitöltésekor automatikusan generálódik az ajánlat, bemegy a CRM-be, és e-mailt kap az érdeklődő — emberi beavatkozás nélkül.',
    category: 'Értékesítés',
    icon: '🤝',
    tags: ['Webform', 'CRM', 'Email'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'szamlazas-automatizacio',
    title: 'Számlázás Automatizáció',
    desc: 'Rendelés vagy szerződés alapján automatikusan kiállított számla, küldés e-mailben és nyilvántartás táblázatban vagy könyvelő szoftverben.',
    category: 'Admin',
    icon: '🧾',
    tags: ['Számlázz.hu', 'n8n', 'Google Sheets'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
];

export const categories = ['Összes', 'Elemzés', 'Kommunikáció', 'Értékesítés', 'Admin'] as const;
