// ── ESETTANULMÁNYOK (Referenciák) ───────────────────────────────────────────
// Minden esettanulmány egy objektum az alábbi tömbben. Új referencia hozzáadása:
//   1. Másold le egy meglévő objektumot, és töltsd ki a mezőket.
//   2. Adj egyedi `slug`-ot (ez lesz az URL: /referenciak/<slug>).
//   3. Képek: tedd a fájlokat a `public/referenciak/<slug>/` mappába, és add meg
//      a `heroImage` / `gallery` mezőkben (`src` a /-tól, pl. "/referenciak/.../1.png").
//      Ha nincs kép, a heroImage/gallery maradhat üres - az oldal akkor is rendben néz ki.
//   4. Videó: ha lesz, a `video` mezőbe a beágyazható (embed) URL. (A videós verzió
//      akár külön, ÚJ esettanulmány is lehet - több aloldal = jobb SEO.)
//   5. Az új URL automatikusan bekerül a sitemap-be (app/sitemap.ts olvassa ezt a tömböt).
// ────────────────────────────────────────────────────────────────────────────

export type CaseImage = { src: string; alt: string; caption?: string; width?: number; height?: number };
export type CaseMetric = { value: string; label: string };
export type CaseStep = { title: string; desc: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  // SEO + megjelenítés
  title: string;            // H1 az aloldalon
  metaTitle: string;        // <title> a keresőben
  metaDescription: string;  // meta description
  excerpt: string;          // rövid leírás a kártyán
  tags: string[];
  published: string;        // ISO dátum, pl. "2026-06-24"
  badge?: { value: string; unit: string; label: string }; // kör-jelvény a kártyán (kiemelt eredmény)
  heroImage?: CaseImage;
  // Tartalom
  challenge: string[];      // "A kihívás" bekezdései
  solution: string[];       // "A megoldás" bekezdései
  howItWorks: CaseStep[];   // "Hogyan működik" számozott lépések
  metrics: CaseMetric[];    // kiemelt eredmény-számok
  resultsBody: string[];    // "Az eredmény" bekezdései
  techStack: string[];
  gallery?: CaseImage[];    // képek (opcionális)
  video?: { url: string; title: string }; // beágyazott videó (opcionális)
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "somafix-chatbot",
    client: "SomaFix Magyarország",
    industry: "Építőipari segédanyagok",
    title: "SomaFix: 0-24 magyar AI chatbot a weboldalon - a saját termékkatalógusból válaszol",
    metaTitle: "SomaFix esettanulmány: AI chatbot a weboldalon | AI Flux",
    metaDescription:
      "Hogyan kapott a SomaFix egy 0-24 elérhető, magyar nyelvű AI chatbotot a weboldalára: a cég saját tudásbázisából válaszol, kattintható termékajánlásokkal és árakkal - a tudásbázist pedig az ügyfél maga bővítheti, ha új termék vagy szolgáltatás érkezik.",
    excerpt:
      "Magyar nyelvű AI chatbot a SomaFix weboldalán, ami a cég saját tudásbázisából válaszol - termékajánlással, árakkal és kattintható linkekkel. A tudásbázist a SomaFix bármikor bővítheti, ha új termék vagy szolgáltatás kerül a weboldalra.",
    tags: ["AI Chatbot", "Weboldal", "Claude AI", "Tudásbázis", "0-24"],
    published: "2026-06-25",
    badge: { value: "0-24", unit: "óra", label: "elérhetőség" },
    heroImage: {
      src: "/referenciak/somafix-chatbot/1.png",
      alt: "A SomaFix weboldala a beépített AI chatbot widgettel a jobb alsó sarokban",
      width: 1729,
      height: 1181,
    },

    challenge: [
      "A SomaFix weboldalára érkező látogatóknak gyakran ugyanazok a kérdéseik: melyik termék való az adott feladatra, mennyibe kerül, és hol rendelhető meg. Ezek jó része munkaidőn kívül vagy hétvégén merül fel.",
      "A kézi ügyfélszolgálat nem tud 0-24 elérhető lenni, a sok ismétlődő kérdés pedig időt vesz el az érdemi munkától.",
      "Az igény egy mindig elérhető, magyar nyelvű asszisztens volt a weboldalon, ami azonnal, pontosan és a SomaFix termékeire szabottan válaszol - kitalált adatok nélkül.",
    ],

    solution: [
      "A SomaFix weboldalára beépítettünk egy magyar nyelvű AI chatbotot (Flux Lite), ami a látogatók kérdéseire azonnal, a cég saját hangnemén válaszol.",
      "A chatbot a SomaFix weboldalának tartalmára van betanítva: a termékeket, leírásokat, árakat és szolgáltatásokat ebből a jóváhagyott tudásbázisból ismeri. Kizárólag ebből dolgozik - soha nem talál ki terméket, árat vagy adatot (anti-hallucináció).",
      "A termékajánlásokat kattintható linkekkel adja: a látogató egy kattintással a webáruház megfelelő termékoldalára jut, az árral együtt. Egy kérdésre akár több terméket is összehasonlít.",
      "Nem csak termékkérdésekre válaszol: a viszonteladói és partnerségi érdeklődést is kezeli, és ahol kell, az ügyfélszolgálat elérhetőségeihez irányít.",
      "A tudásbázist a SomaFix bármikor, önállóan bővítheti - ha új termék kerül a weboldalra vagy új szolgáltatás indul, egyszerűen frissítik a tudásbázist, és a chatbot máris tudja. A teljes infrastruktúrát az AI Flux üzemelteti.",
      "Beépítés: egyetlen sor kód a weboldalba (WordPress vagy bármilyen platform).",
    ],

    howItWorks: [
      {
        title: "1. Tudásbázis a weboldalból",
        desc: "A chatbot a SomaFix weboldalának tartalmából - termékek, leírások, árak, szolgáltatások - tanul. Ez a jóváhagyott tudásbázis a válaszok kizárólagos forrása.",
      },
      {
        title: "2. Beépítés egyetlen sor kóddal",
        desc: "A widget egyetlen script-sorral kerül a weboldalra, és a jobb alsó sarokban jelenik meg, a SomaFix színeiben. Nincs bonyolult integráció.",
      },
      {
        title: "3. Azonnali, pontos válaszok",
        desc: "A látogató kérdez, a chatbot magyarul, márkahangon válaszol - termékajánlással, árral és kattintható linkkel a webáruházba. Amire nincs adat a tudásbázisban, ott az ügyfélszolgálathoz irányít.",
      },
      {
        title: "4. A cég maga bővíti a tudásbázist",
        desc: "Új termék vagy szolgáltatás esetén a SomaFix frissíti a tudásbázist, és a chatbot azonnal naprakész - fejlesztői munka nélkül.",
      },
    ],

    metrics: [
      { value: "0-24", label: "elérhető - munkaidőn kívül is válaszol" },
      { value: "azonnali", label: "válaszidő a látogatónak" },
      { value: "1 sor", label: "kód a weboldalba építéshez" },
      { value: "100%", label: "a cég saját tudásbázisából (nincs kitalált adat)" },
    ],

    resultsBody: [
      "A SomaFix weboldalán mostantól egy mindig elérhető asszisztens fogadja a látogatókat - munkaidőn kívül és hétvégén is azonnal válaszol, így egyetlen érdeklődő sem marad válasz nélkül.",
      "A chatbot a megfelelő termékre irányít, árral és kattintható linkkel a webáruházba - ezzel csökkenti az ismétlődő ügyfélszolgálati kérdéseket, és segíti a vásárlást. A partnerségi és viszonteladói érdeklődést is kezeli.",
      "Mivel a SomaFix maga bővíti a tudásbázist, a chatbot mindig naprakész marad: új termék vagy szolgáltatás esetén sincs szükség fejlesztőre.",
    ],

    techStack: ["Next.js", "Claude AI (Anthropic)", "Embed widget", "WordPress-kompatibilis"],

    gallery: [
      {
        src: "/referenciak/somafix-chatbot/2.png",
        alt: "A chatbot díszléc-ragasztót ajánl kattintható linkkel és árral",
        caption: "Termékajánlás kattintható linkkel és árral - a látogató egy kattintással a webáruházba jut.",
        width: 357,
        height: 493,
      },
      {
        src: "/referenciak/somafix-chatbot/3.png",
        alt: "Strukturált, többtermékes ajánlás (purhab) árakkal",
        caption: "Egy kérdésre több termék összehasonlítása - strukturált ajánlás árakkal.",
        width: 355,
        height: 497,
      },
      {
        src: "/referenciak/somafix-chatbot/4.png",
        alt: "A chatbot egy viszonteladói partnerség iránti érdeklődést kezel",
        caption: "Nem csak termékek: a partnerségi és viszonteladói kérdéseket is megválaszolja.",
        width: 354,
        height: 490,
      },
      {
        src: "/referenciak/somafix-chatbot/5.png",
        alt: "A chatbot a viszonteladói programról ad tájékoztatást linkkel és elérhetőségekkel",
        caption: "A viszonteladói program részletei és az ügyfélszolgálat elérhetőségei - egy helyen.",
        width: 355,
        height: 486,
      },
    ],
  },
  {
    slug: "somafix-social-media-automatizalas",
    client: "SomaFix Magyarország",
    industry: "Építőipari segédanyagok",
    title: "SomaFix: havi 20+ Facebook és Instagram poszt - egyetlen jóváhagyással",
    metaTitle: "SomaFix esettanulmány: AI Social Media Automatizálás | AI Flux",
    metaDescription:
      "Hogyan automatizáltuk a SomaFix Facebook és Instagram jelenlétét AI-jal: havi ~20 poszt valós termékfotókkal és termékadatokból, egyetlen jóváhagyással, automatikus kiküldéssel és statisztikával.",
    excerpt:
      "Egy építőipari márka közösségi médiája kézi kezelés helyett egy AI-admin platformról: a rendszer egy egész hónap posztjait megírja valós termékadatokból és fotókból, az ügyfél egyszer jóváhagyja, a többi automatikus.",
    tags: ["Facebook", "Instagram", "Claude AI", "Meta API", "Automatizálás"],
    published: "2026-06-24",
    badge: { value: "15", unit: "óra", label: "havi megtakarítás" },
    heroImage: {
      src: "/referenciak/somafix-social-media-automatizalas/posztok_1.png",
      alt: "Havi batch nézet: egy hónap jóváhagyásra kész posztja a SomaFix admin felületén",
      width: 1665,
      height: 1245,
    },

    challenge: [
      "A SomaFix egy erős termékportfólióval rendelkező építőipari segédanyag-márka. A közösségi média viszont kézi munka volt: posztok írása, megfelelő képek keresése, ütemezés és kiküldés - heti több alkalommal.",
      "A napi teendők mellett ez a feladat könnyen kiesett: a tartalom akadozott, a megjelenés következetlen lett, a márkahang pedig posztról posztra változott.",
      "Az igény világos volt: rendszeres, profi, márkahű Facebook- és Instagram-jelenlét - anélkül, hogy bárkinek naponta ezzel kelljen foglalkoznia.",
    ],

    solution: [
      "Egy saját, böngészőből elérhető admin platformot építettünk, amely a SomaFix nevében automatikusan generál, ütemez és kiküld Facebook- és Instagram-posztokat, majd visszahúzza a teljesítményadatokat.",
      "A szövegeket az AI (Claude) a SomaFix márkahangján írja, de kizárólag valós forrásból dolgozik: a webshop termékoldalaiból és iparági hírekből. A rendszer soha nem talál ki terméket, termékkódot vagy adatot - ez a beépített „anti-hallucináció” garantálja a hitelességet.",
      "A képek valós termékfotók a cég Google Drive mappájából - nincs mesterséges vagy AI-generált kép. A rendszer automatikusan ráhelyezi a logót és a feliratokat, a termékfotókra pedig a termékkódot.",
      "Az ügyfélnek havonta gyakorlatilag egyetlen teendője maradt: a legenerált posztok átnézése és jóváhagyása. Minden más automatikusan történik.",
    ],

    howItWorks: [
      {
        title: "1. Generálás (havi batch)",
        desc: "Az AI egy egész hónap posztjait megírja egyszerre - a hét napjához kötött, változatos tartalomtípusokkal (iparági hír, termékbemutató, szakmai tipp, Instagram-poszt), valós termékadatokból és fotókból.",
      },
      {
        title: "2. Jóváhagyás (az ügyfél egyetlen teendője)",
        desc: "A SomaFix az admin felületen átnézi a posztokat, szükség esetén szerkeszti vagy újrageneráltatja, majd egy kattintással jóváhagyja őket.",
      },
      {
        title: "3. Automatikus kiküldés",
        desc: "Egy időzített folyamat minden nap kiküldi az aznapra ütemezett, jóváhagyott posztokat a Facebookra és az Instagramra - emberi beavatkozás nélkül, kihagyott nap nélkül.",
      },
      {
        title: "4. Statisztika",
        desc: "A rendszer visszahúzza a Metáról a követőszámot és a posztok teljesítményét, és egy átlátható dashboardon mutatja - platformonkénti bontásban.",
      },
    ],

    metrics: [
      { value: "45 perc", label: "naponta megspórolt munka" },
      { value: "~20", label: "poszt / hó automatikusan generálva" },
      { value: "1", label: "jóváhagyás / hó - ennyi az ügyfél teendője" },
      { value: "2", label: "platform: Facebook + Instagram" },
    ],

    resultsBody: [
      "A korábbi kézi munka (írás, képkeresés, ütemezés, kiküldés) helyett a SomaFix naponta átlagosan 45 percet spórol - ami havonta közel 15 óra felszabaduló idő, amit a szakmájukra fordíthatnak.",
      "A megjelenés folyamatos és egységes márkahangú lett, a posztok pedig valós termékadatokból és hiteles fotókból készülnek - így a tartalom szakmai és megbízható.",
      "A teljes infrastruktúrát (generálás, kiküldés, statisztika) az AI Flux üzemelteti; a SomaFix oldalán nincs technikai teendő.",
    ],

    techStack: [
      "Next.js",
      "Claude AI (Anthropic)",
      "Meta Graph API",
      "Google Drive",
      "PostgreSQL",
      "Vercel",
    ],

    gallery: [
      {
        src: "/referenciak/somafix-social-media-automatizalas/osszes_poszt.png",
        alt: "Az Összes poszt nézet a posztok státuszával és valós termékfotókkal",
        caption: "Az „Összes poszt” nézet: minden poszt státusza, szerkesztése és jóváhagyása egy helyen.",
        width: 1678,
        height: 1248,
      },
      {
        src: "/referenciak/somafix-social-media-automatizalas/posztok_2.png",
        alt: "Termék- és hírposztok valós termékfotókkal a havi batch-ben",
        caption: "Termék- és hírposztok valós termékfotókkal, automatikus logózással és termékkóddal.",
        width: 1677,
        height: 1251,
      },
      {
        src: "/referenciak/somafix-social-media-automatizalas/statisztika.png",
        alt: "Statisztika dashboard a követőszámmal és a posztok teljesítményével",
        caption: "A statisztika dashboard: követőszám, növekedés és a posztok teljesítménye platformonkénti bontásban.",
        width: 1667,
        height: 1253,
      },
      {
        src: "/referenciak/somafix-social-media-automatizalas/uj_poszt.png",
        alt: "Új poszt kézi létrehozása az admin felületen",
        caption: "Eseti, kézi poszt létrehozása is lehetséges - pl. akcióhoz vagy eseményhez.",
        width: 1687,
        height: 1252,
      },
    ],

    // video: { url: "https://www.youtube.com/embed/XXXXXXXX", title: "SomaFix social automatizálás bemutató" },
  },
];

// Segédfüggvény az aloldalakhoz / sitemap-hez
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
