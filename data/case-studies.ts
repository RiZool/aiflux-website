// ── ESETTANULMÁNYOK (Referenciák) ───────────────────────────────────────────
// Minden esettanulmány egy objektum az alábbi tömbben. Új referencia hozzáadása:
//   1. Másold le egy meglévő objektumot, és töltsd ki a mezőket.
//   2. Adj egyedi `slug`-ot (ez lesz az URL: /referenciak/<slug>).
//   3. Képek: tedd a fájlokat a `public/referenciak/<slug>/` mappába, és add meg
//      a `heroImage` / `gallery` mezőkben (`src` a /-tól, pl. "/referenciak/.../1.png").
//      Ha nincs kép, a heroImage/gallery maradhat üres - az oldal akkor is rendben néz ki.
//   4. Videó - két lehetőség:
//      a) Saját MP4: tedd a fájlt a `public/referenciak/<slug>/` mappába, és vedd fel a
//         `videos` tömbbe (src, title, width, height). Az oldal beépített lejátszóval
//         mutatja, `preload="metadata"`-val (nem tölti le a fájlt, amíg nem indítják el).
//      b) Beágyazott (YouTube/Vimeo): a `video` mezőbe az embed URL.
//      A kettő egyszerre is használható.
//      FONTOS - MP4 feltöltés előtt mindig tömörítsd (a nyers exportok 8-10 Mbps-esek):
//        ffmpeg -i be.mp4 -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p \
//               -c:a aac -b:a 128k -movflags +faststart ki.mp4
//      A `+faststart` kötelező: enélkül a böngészőnek le kell töltenie a teljes fájlt,
//      mielőtt elindul a lejátszás. Borítókép (poster) kinyerése egy jó képkockából:
//        ffmpeg -ss <mp> -i ki.mp4 -frames:v 1 -vf scale=540:-2 -q:v 4 poszter.jpg
//   5. Az új URL automatikusan bekerül a sitemap-be (app/sitemap.ts olvassa ezt a tömböt).
// ────────────────────────────────────────────────────────────────────────────

import type { FlowStage } from "@/components/FlowDiagram";

export type CaseImage = { src: string; alt: string; caption?: string; width?: number; height?: number };
export type CaseMetric = { value: string; label: string };
export type CaseStep = { title: string; desc: string };

// Saját tárhelyről lejátszott videó (MP4 a public/referenciak/<slug>/ mappából).
// A width/height a videó natív mérete - ebből számolja az oldal a képarányt
// (álló 9:16 és fekvő 16:9 is jó). A poster opcionális borítókép.
export type CaseVideo = {
  src: string;
  title: string;
  caption?: string;
  poster?: string;
  width?: number;
  height?: number;
};

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
  galleryTitle?: string;    // a képek szekció címe (alapértelmezés: "Képek a rendszerről")
  // Vegyes képarányú galériához: fix képarány (szélesség/magasság) minden
  // galéria-képre, `contain` illesztéssel. Pl. 1 = négyzetes dobozok.
  // Enélkül minden kép a saját arányát tartja (a régi viselkedés).
  galleryAspect?: number;
  video?: { url: string; title: string }; // beágyazott videó, pl. YouTube (opcionális)
  videos?: CaseVideo[];     // saját tárhelyről lejátszott MP4-ek (opcionális)
  videosTitle?: string;     // a videó szekció címe (alapértelmezés: "Videók")
  // Folyamatábra a "Hogyan működik?" alatt (opcionális). A stages 3 elemnél
  // marad olvasható; a loop a visszacsatolás szövege az ábra alatt.
  flow?: { title: string; stages: FlowStage[]; loop?: string };
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
      "A termékfotók valós képek a tényleges termékekről - a rendszer soha nem talál ki és nem generál terméklátványt. Emellett a márka saját kabalafigurája, SOMA is szerepel a posztokon: az ő képei AI-eszközökkel készültek, és ugyanebbe a Google Drive mappába kerülnek, ahonnan a rendszer automatikusan behúzza őket.",
      "A képekre a rendszer automatikusan ráhelyezi a logót és a feliratokat, a termékfotókra pedig a termékkódot.",
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

  {
    slug: "somafix-soma-kabalafigura",
    client: "SomaFix Magyarország",
    industry: "Építőipari segédanyagok",
    title: "SOMA: saját kabalafigura, ami a SomaFix teljes arculatát összefogja",
    metaTitle: "SomaFix esettanulmány: céges kabalafigura és arculattervezés | AI Flux",
    metaDescription:
      "Hogyan készült SOMA, a SomaFix saját kabalafigurája AI-eszközökkel: egy karakter, ami a plakátoktól az online hirdetéseken át a weboldal chatbotjáig mindenhol ugyanaz - és amiből bármikor generálható új póz.",
    excerpt:
      "A SomaFix teljesen új arculatot akart építeni, és ehhez egy figurát, amiről a szakemberek ránézésre felismerik a céget. SOMA lett a neve: egy kis „szaki\", aki a marketinganyagokban, a hirdetésekben és a weboldal chatbotjában is megjelenik - és akiből a meglévő prompttal bármikor készül új póz.",
    tags: ["Kabalafigura", "Arculat", "Claude AI", "Gemini", "Branding"],
    published: "2026-08-07",
    badge: { value: "1", unit: "karakter", label: "az egész arculatban" },
    heroImage: {
      src: "/referenciak/somafix-soma-kabalafigura/61.png",
      alt: "SOMA, a SomaFix kabalafigurája - a márka flakonjából formált zöld karakter piros sapkában és kertésznadrágban",
      width: 1024,
      height: 1024,
    },

    challenge: [
      "A SomaFix teljesen új arculat építésébe kezdett. Egy építőipari segédanyag-márkánál viszont a termék önmagában nehezen megjegyezhető: a flakonok hasonlítanak egymásra, a szakmai kommunikáció pedig könnyen személytelenné válik.",
      "Kellett tehát egy vizuális kapaszkodó - egy figura, amiről a szakemberek ránézésre felismerik a céget, és amivel azonosítani tudják a márkát.",
      "Az elvárás kettős volt: legyen barátságos és ember közeli, de közben ne veszítsen a szakmai hitelességből. És legyen elég rugalmas ahhoz, hogy plakáton, online hirdetésben, közösségi médiában és a weboldalon is működjön.",
    ],

    solution: [
      "Megalkottuk SOMA-t, a SomaFix saját kabalafiguráját: egy kis „szaki\" karaktert, aki maga is a márka terméke. A figura a jellegzetes SomaFix flakon formájából épül fel - piros sapkában, SOMA feliratú kertésznadrágban és munkásbakancsban.",
      "A karakter több AI-eszköz együttes használatával készült: a tervezés és a generálás Claude és Gemini rendszerekkel, az utómunka és a finomhangolás Photoshopban.",
      "SOMA nem egyetlen kép, hanem egy újrahasznosítható készlet: mindig ugyanaz a karakter, más-más pózban és más-más termékkel a kezében. Így a teljes termékportfólió lefedhető anélkül, hogy a megjelenés széttartana - a bemutató pózoktól a védőszemüveges, kipisztolyos munkahelyzetig.",
      "A figura nem áll meg a képeknél: a weboldal chatbotja is SOMA nevét viseli, tehát a látogatónak ugyanaz a karakter válaszol, akit a hirdetéseken lát. Az arculat így a kommunikáció minden pontján összeér.",
      "Az elkészült képek egy Google Drive mappába kerülnek, ahonnan a social media posztoló platform automatikusan választ és illeszt be - és minden későbbi rendszer, a reklámanimációktól a videókig, ugyanebből a készletből dolgozik.",
      "A karakter nincs lezárva: a generáláshoz használt prompt megmarad, így új pózra vagy új ötletre bármikor készülhet további kép, ami aztán ugyanígy beépül a folyamatokba.",
    ],

    howItWorks: [
      {
        title: "1. A karakter megtervezése",
        desc: "A SomaFix jellegzetes flakonformájából indultunk ki: SOMA maga a termék, csak sapkában, kertésznadrágban és bakancsban. Így a figura ránézésre a márkához kötődik, nem egy tetszőleges rajzfilmfigura.",
      },
      {
        title: "2. Generálás és utómunka",
        desc: "A karakter Claude és Gemini rendszerekkel készült, majd Photoshopban kapta meg a végleges finomítást - egységes színek és tiszta kontúrok, nyomdai és online felhasználásra egyaránt alkalmas képekkel.",
      },
      {
        title: "3. Póz- és termékkészlet",
        desc: "Ugyanabból a karakterből több póz és több termékvariáció készült: bemutató, irányjelző, munka közbeni. Így minden kommunikációs helyzetre van kész kép, és a megjelenés mégis egységes marad.",
      },
      {
        title: "4. Bekötés a rendszerekbe",
        desc: "A képek egy Google Drive mappába kerülnek. Innen dolgozik a social media posztoló platform, a reklámanimációk és minden jövőbeli rendszer - kézi képkeresés nélkül.",
      },
      {
        title: "5. Bővítés bármikor",
        desc: "Ha új póz vagy új ötlet merül fel, a meglévő prompttal generálható további kép, ami ugyanúgy bekerül a képtárba és a folyamatokba. A karakter így együtt nő a márkával.",
      },
    ],

    flow: {
      title: "Egy karakter, minden felületen",
      stages: [
        {
          label: "01 · Készítés",
          title: "SOMA karakter és pózkészlet",
          desc: "Tervezés és generálás AI-eszközökkel, végleges finomítás kézi utómunkával.",
          chips: ["Claude", "Gemini", "Photoshop"],
        },
        {
          label: "02 · Központi képtár",
          title: "Google Drive mappa",
          desc: "Minden kész SOMA-kép egy helyen - ez a rendszerek közös forrása.",
          chips: ["1 mappa", "verziózható", "bővíthető"],
        },
        {
          label: "03 · Felhasználás",
          title: "Minden csatorna ugyanabból dolgozik",
          desc: "A rendszerek automatikusan innen választanak képet, kézi keresés nélkül.",
          chips: ["Social poszt platform", "Reklámanimációk", "Weboldali chatbot", "Plakát & hirdetés"],
        },
      ],
      loop: "Új pózra vagy új ötletre nem új projekt kell: a meglévő prompttal generálunk további képet, ami visszakerül a képtárba - és onnan azonnal elérhető minden rendszernek.",
    },

    metrics: [
      { value: "1", label: "karakter - plakáton, hirdetésben és a chatbotban is ugyanaz" },
      { value: "3", label: "eszköz a készítéshez: Claude, Gemini, Photoshop" },
      { value: "1 mappa", label: "Google Drive - innen dolgozik az összes rendszer" },
      { value: "bármikor", label: "új póz generálható a meglévő prompttal" },
    ],

    resultsBody: [
      "A SomaFix kapott egy védjegyet, ami nem logó, hanem karakter: SOMA-t a szakemberek ránézésre a céghez kötik, és ott van a plakátokon, az online hirdetésekben és a közösségi médiában is.",
      "A megjelenés barátságosabb és ember közelibb lett, miközben a szakmai hitelesség megmaradt - a figura ugyanis maga a termék: munkaruhában, védőszemüvegben, valódi SomaFix flakonokkal a kezében.",
      "Mivel a képek egy központi Drive mappából érhetők el, a kabala automatikusan bekerül a már működő rendszerekbe: a social media posztoló platform magától választ képet, és minden később épülő megoldás ugyanebből a készletből dolgozik. Új pózhoz pedig nem kell új projekt, csak egy újabb generálás.",
    ],

    techStack: ["Claude AI (Anthropic)", "Google Gemini", "Adobe Photoshop", "Google Drive"],

    galleryTitle: "SOMA a gyakorlatban",
    // A képek zöme 1024x1024, de az s915 álló (720x1463) - fix négyzetes
    // dobozokkal minden kártya egyforma magas marad.
    galleryAspect: 1,
    gallery: [
      {
        src: "/referenciak/somafix-soma-kabalafigura/59.png",
        alt: "SOMA piros nyíllal a kezében, irányjelző pózban",
        caption: "Irányjelző póz - figyelemfelhívó elemekhez, ajánlatokhoz és linkekhez.",
        width: 1024,
        height: 1024,
      },
      {
        src: "/referenciak/somafix-soma-kabalafigura/s937_2.png",
        alt: "SOMA védőszemüvegben, kipisztollyal és SomaFix S937 purhabbal a kezében",
        caption: "Munka közben: védőszemüveg és kipisztoly az S937 purhabbal - szakmai hitelesség.",
        width: 1024,
        height: 1024,
      },
      {
        src: "/referenciak/somafix-soma-kabalafigura/s937_4.png",
        alt: "SOMA a SomaFix S937 60 másodperces purhab flakonjával",
        caption: "Termékbemutató póz - a karakter minden termékhez újrahasznosítható.",
        width: 1024,
        height: 1024,
      },
      {
        src: "/referenciak/somafix-soma-kabalafigura/s80.png",
        alt: "SOMA a SomaFix S80 tisztító sprayjével a kezében",
        caption: "Ugyanaz a karakter, másik termék - egységes megjelenés a teljes portfólión.",
        width: 1024,
        height: 1024,
      },
      {
        src: "/referenciak/somafix-soma-kabalafigura/s915.png",
        alt: "SOMA a SomaFix S915 EPS-XPS Gun Foam ragasztóhab flakonjára mutatva",
        caption: "Álló, 9:16-os változat - Instagram- és Facebook-story formátumhoz.",
        width: 720,
        height: 1463,
      },
    ],
  },

  {
    slug: "somafix-soma-reklamanimaciok",
    client: "SomaFix Magyarország",
    industry: "Építőipari segédanyagok",
    title: "SomaFix: reklámanimációk, amik maguktól kimennek - forgatás nélkül",
    metaTitle: "SomaFix esettanulmány: reklámanimációk készítése és automata kiküldése | AI Flux",
    metaDescription:
      "Hogyan készülnek a SomaFix álló formátumú reklámanimációi a SOMA kabalafigurából és valós termékfotókból - forgatás és stáb nélkül -, majd hogyan kerülnek ki előre ütemezve Facebookra és Instagramra.",
    excerpt:
      "Álló (9:16) reklámanimációk a SomaFix szolgáltatásairól, szakmai üzeneteiről és akcióiról - a meglévő SOMA kabalafigurából és valós termékfotókból, forgatás nélkül. A kész animációk egy Drive mappából, a szövegek Google táblázatokból kerülnek a már működő automatizálásba, ami előre ütemezve küldi ki őket.",
    tags: ["Reklámanimáció", "Facebook", "Instagram", "Videó", "Automatizálás"],
    published: "2026-08-07",
    badge: { value: "0", unit: "forgatás", label: "stáb és stúdió nélkül" },
    heroImage: {
      src: "/referenciak/somafix-soma-reklamanimaciok/hero.jpg",
      alt: "Hat SomaFix reklámanimáció nyitóképe egymás mellett, mindegyiken a SOMA kabalafigurával",
      width: 2064,
      height: 600,
    },

    challenge: [
      "A SomaFix közösségi média jelenléte ekkor már automatizált volt - de kizárólag állóképes posztokkal. A közösségi platformok algoritmusai viszont a mozgóképet díjazzák, a fizetett hirdetésekben pedig a videó jellemzően jobban teljesít, mint a statikus kép.",
      "Videót gyártani azonban hagyományos úton drága és lassú: forgatás, stáb, stúdió, vágás - és minden új szolgáltatásnál vagy akciónál kezdődik elölről.",
      "Ráadásul a kész videó önmagában kevés. Ha kézzel kell feltölteni, szöveget írni hozzá és időzíteni, akkor pontosan oda jutunk vissza, ahonnan a social media automatizálással elindultunk.",
      "Az igény tehát kettős volt: legyenek márkahű reklámanimációk, amik posztként és hirdetésként is működnek - és ugyanúgy maguktól menjenek ki, mint a képes posztok.",
    ],

    solution: [
      "Reklámanimációkat gyártunk a SomaFix közösségi felületeire, álló (9:16) formátumban. Jelenleg a Facebookra és az Instagramra megy ki automatikusan minden anyag - a 9:16 viszont a TikTok, a YouTube Shorts és a LinkedIn natív mérete is, így a most készülő animációk átdolgozás nélkül fognak működni, amint ezek a platformok is bekerülnek az automatizálásba.",
      "Az animációk nem nulláról készülnek: a már meglévő SOMA kabalafigurát és a valós termékfotókat használjuk fel újra, Claude Design segítségével. A karakter így mozgóképen is ugyanaz, mint a plakátokon és a posztokon - nem kell új arculatot tanulnia a közönségnek.",
      "A tartalom három téma köré épül: a cég szolgáltatásai (garancia, másnapi szállítás, partnerregisztráció), a szakembereknek szóló szakmai közlendő, valamint az aktuális akciók.",
      "Ugyanaz az animáció kettős munkát végez: organikus posztként és fizetett hirdetésként is fut. Egy gyártásból tehát két csatorna profitál.",
      "Az elkészült animációk előre legyártva, Drive mappákban állnak - innen a már működő social media automatizálás teljesen automata módon használja fel őket. A hozzájuk tartozó szövegeket és további infókat Google táblázatokban tároljuk, ahonnan a folyamat ugyancsak magától olvassa be az adatokat.",
      "Az utolsó lépés az előre ütemezés: minden animáció a megfelelő időben, a megfelelő helyre kerül ki - emberi beavatkozás nélkül.",
    ],

    howItWorks: [
      {
        title: "1. Gyártás a meglévő elemekből",
        desc: "Az animációk a SOMA kabalafigurából és a valós termékfotókból épülnek fel, Claude Design segítségével. Nincs forgatás, stáb és stúdió - és nincs új arculat sem, mert a karakter már ismerős.",
      },
      {
        title: "2. Előre legyártott készlet",
        desc: "Az animációk nem esetileg, hanem előre készülnek el, és Drive mappákban várakoznak. Így mindig van kész anyag, amikor kimenne egy poszt vagy indulna egy hirdetés.",
      },
      {
        title: "3. Szövegek és infók táblázatban",
        desc: "A posztszövegek és a további információk Google táblázatokban vannak. A folyamat innen olvassa ki automatikusan, hogy melyik animációhoz mi tartozik - fejlesztői munka nélkül szerkeszthető.",
      },
      {
        title: "4. Az automatizálás összerakja",
        desc: "A már működő social media automatizálás a Drive mappából veszi az animációt, a táblázatból a szöveget, és összeállítja belőle a kész posztot.",
      },
      {
        title: "5. Ütemezett kiküldés",
        desc: "Minden animáció előre ütemezve, a megfelelő időben, a megfelelő platformra kerül ki. A SomaFix oldalán ehhez nincs teendő.",
      },
    ],

    flow: {
      title: "A gyártástól a kiküldésig",
      stages: [
        {
          label: "01 · Gyártás",
          title: "Animáció a meglévő elemekből",
          desc: "Forgatás helyett a kész kabalából és a valós termékfotókból épül fel minden animáció.",
          chips: ["SOMA kabala", "Termékfotók", "Claude Design", "9:16"],
        },
        {
          label: "02 · Tárolás",
          title: "Drive mappa + Google táblázat",
          desc: "Az előre legyártott animációk és a hozzájuk tartozó szövegek egy helyen, szerkeszthetően állnak.",
          chips: ["Drive: animációk", "Sheets: szövegek, infók"],
        },
        {
          label: "03 · Kiküldés",
          title: "Automatizálás, előre ütemezve",
          desc: "A meglévő social automatizálás összerakja és kiküldi - a megfelelő időben, a megfelelő helyre.",
          chips: ["Facebook", "Instagram", "Poszt + hirdetés", "Hamarosan: TikTok, YouTube, LinkedIn"],
        },
      ],
      loop: "Új szolgáltatás vagy akció esetén csak egy új animáció kerül a Drive mappába és egy sor a táblázatba - a folyamat többi része változatlanul viszi tovább.",
    },

    metrics: [
      { value: "0", label: "forgatás - a meglévő kabalából és termékfotókból" },
      { value: "9:16", label: "álló formátum - minden nagy platform natív mérete" },
      { value: "2-ben 1", label: "ugyanaz az animáció poszt és hirdetés is" },
      { value: "6", label: "kész animáció a szolgáltatásokról és a márkáról" },
    ],

    resultsBody: [
      "A SomaFix közösségi jelenléte állóképes posztokról mozgóképre bővült - méghozzá úgy, hogy egyetlen forgatási nap sem kellett hozzá. Az animációk a már kifizetett munkából, a SOMA kabalafigurából és a meglévő termékfotókból épülnek fel.",
      "Mivel ugyanaz az anyag megy ki organikus posztként és fizetett hirdetésként is, egy gyártásból két csatorna profitál - levágott vagy fekete sávos megjelenés nélkül, mert a 9:16 a platformok natív mérete.",
      "A folyamat a már működő automatizálásba illeszkedik: az animációk a Drive mappából, a szövegek a Google táblázatokból érkeznek, az ütemezés pedig gondoskodik róla, hogy minden a megfelelő időben, a megfelelő helyre kerüljön ki. A SomaFix oldalán ehhez nincs technikai teendő.",
      "Új szolgáltatás vagy akció esetén nem indul új projekt: elég egy új animáció a mappába és egy sor a táblázatba.",
      "A rendszer jelenleg Facebookra és Instagramra posztol, a TikTok, a YouTube és a LinkedIn bekötése pedig már úton van. Mivel az animációk eleve álló formátumban készülnek, a bővítéskor nem kell újragyártani semmit - a meglévő készlet azonnal használható lesz az új felületeken is.",
    ],

    techStack: [
      "Claude Design",
      "SOMA kabalafigura",
      "Google Drive",
      "Google Sheets",
      "Meta Graph API",
      "Next.js",
    ],

    videosTitle: "Az elkészült animációk",
    videos: [
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/somafix_reklam_1.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/somafix_reklam_1.jpg",
        title: "SomaFix márkafilm",
        caption: "A leghosszabb, összefoglaló animáció: építkezési látvány, termékdemó és a márkaüzenet egy anyagban. 1 perc 23 mp.",
        width: 1080,
        height: 1920,
      },
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/ceges_miertvalaszd_3.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/ceges_miertvalaszd_3.jpg",
        title: "Miért minket válassz?",
        caption: "Céges bemutatkozó animáció - 5 érv számozott kártyákon, SOMA vezetésével. 25 mp.",
        width: 1080,
        height: 1920,
      },
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/ceges_soma_chatbot_3.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/ceges_soma_chatbot_3.jpg",
        title: "„Ezt még te sem tudod?\" - a SOMA chatbot",
        caption: "A weboldali AI chatbotot bemutató animáció, kérdés-alapú felvezetéssel. 14 mp.",
        width: 1080,
        height: 1920,
      },
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_garancia_2.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_garancia_2.jpg",
        title: "Garancia",
        caption: "„A vevők imádják a SomaFixet\" - termékfelvonultatás SOMA-val, a garanciára fókuszálva. 15 mp.",
        width: 1080,
        height: 1920,
      },
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_kiszallitas_4.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_kiszallitas_4.jpg",
        title: "Másnapi szállítás",
        caption: "Kisebb rendelés is másnapra érkezik - animált szállítási üzenet. 15 mp.",
        width: 1080,
        height: 1920,
      },
      {
        src: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_partnerregisztracio_3.mp4",
        poster: "/referenciak/somafix-soma-reklamanimaciok/szolgaltatas_partnerregisztracio_3.jpg",
        title: "Partnerregisztráció",
        caption: "Műszaki előnyök számozott listában, termékkódokkal - viszonteladóknak. 20 mp.",
        width: 1080,
        height: 1920,
      },
    ],
  },
];

// Segédfüggvény az aloldalakhoz / sitemap-hez
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
