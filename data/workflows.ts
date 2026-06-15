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
// icon: SVG ikon neve - elérhető: chart, bot, mail, target, inbox, doc,
//       handshake, invoice (definíció: components/WorkflowConfigurator.tsx wfIcons)
// ────────────────────────────────────────────────────────────────────────────
export const workflows: Workflow[] = [
  {
    id: 'prezentacio-keszito',
    title: 'AI Prezentáció Készítő',
    desc: 'Töltsd fel az adatfájlod (Excel, CSV, PDF, Word) és az AI percek alatt profi prezentációt készít belőle - grafikonokkal, KPI-kkal, interaktív slide-okkal.',
    category: 'Elemzés',
    icon: 'chart',
    tags: ['Claude AI', 'n8n', 'Excel · CSV · PDF'],
    priceLabel: '50 000 Ft beállítás',
    status: 'active',
  },
  {
    id: 'ai-chatbot',
    title: 'Flux Lite Chatbot (0-24)',
    desc: 'Magyar nyelvű, tudásbázisra épülő chatbot, ami ismeri a vállalkozásodat. 1 sor kód - és máris ott van a weboldalon, WordPressben, bárhol. Te kezeled a tartalmat, mi az infrastruktúrát.',
    category: 'Kommunikáció',
    icon: 'bot',
    tags: ['Claude AI', 'Embed widget', 'WordPress'],
    priceLabel: '80.000 Ft + 15.000 Ft/hó',
    status: 'active',
  },
  {
    id: 'social-media-auto',
    title: 'AI Social Media Automatizáló',
    desc: 'Havi 1 jóváhagyás - minden más automatikus. Az AI megírja és kiküldi a Facebook és Instagram posztokat, te csak átnézed. Képgenerálás, ütemezés, statisztika - egy admin felületen.',
    category: 'Kommunikáció',
    icon: 'social',
    tags: ['Claude AI', 'Meta API', 'Facebook · Instagram'],
    priceLabel: '150.000 Ft + 59.000 Ft/hó',
    status: 'active',
  },
  {
    id: 'hirlevel-automatizacio',
    title: 'Hírlevél & Welcome Sorozat',
    desc: 'Automatikus üdvözlő e-mail sorozat új feliratkozóknak, szegmentálással. A megfelelő üzenet, a megfelelő embernek, a megfelelő időben - emberi beavatkozás nélkül.',
    category: 'Kommunikáció',
    icon: 'mail',
    tags: ['MailerLite', 'n8n', 'Email marketing'],
    priceLabel: 'Egyedi árajánlat',
    status: 'active',
  },
  {
    id: 'lead-kvalifikalo',
    title: 'Lead Kvalifikáló Bot',
    desc: 'Ajánlatkérők automatikusan átmennek egy AI-vezérelt minősítési folyamaton. A jó leadek rögtön a CRM-be kerülnek, a gyengébbeket kezeli a rendszer.',
    category: 'Értékesítés',
    icon: 'target',
    tags: ['AI értékelés', 'CRM integráció', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'email-asszisztens',
    title: 'AI Email Asszisztens',
    desc: 'Beérkező e-mailek automatikus kategorizálása, prioritizálása és előre megírt AI-válaszok generálása. A csapat csak jóváhagyja - a rendszer küld.',
    category: 'Admin',
    icon: 'inbox',
    tags: ['Gmail · Outlook', 'Claude AI', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'dokumentum-osszefoglalo',
    title: 'Dokumentum Összefoglaló',
    desc: 'Hosszú szerződések, riportok, pályázatok feltöltésekor az AI percek alatt elkészíti a lényeget - kiemelt pontokkal, kockázatokkal, teendőkkel.',
    category: 'Admin',
    icon: 'doc',
    tags: ['PDF · Word', 'Claude AI', 'n8n'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'ajanlatkereso-automatizacio',
    title: 'Ajánlatkérés Automatizátor',
    desc: 'Weboldal-form kitöltésekor automatikusan generálódik az ajánlat, bemegy a CRM-be, és e-mailt kap az érdeklődő - emberi beavatkozás nélkül.',
    category: 'Értékesítés',
    icon: 'handshake',
    tags: ['Webform', 'CRM', 'Email'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
  {
    id: 'szamlazas-automatizacio',
    title: 'Számlázás Automatizáció',
    desc: 'Rendelés vagy szerződés alapján automatikusan kiállított számla, küldés e-mailben és nyilvántartás táblázatban vagy könyvelő szoftverben.',
    category: 'Admin',
    icon: 'invoice',
    tags: ['Számlázz.hu', 'n8n', 'Google Sheets'],
    priceLabel: 'Egyedi árajánlat',
    status: 'soon',
  },
];

export const categories = ['Összes', 'Elemzés', 'Kommunikáció', 'Értékesítés', 'Admin'] as const;
