// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL MEDIA AUTOMATIZÁLÓ - RÉSZLETES ÁRLAP
//
// Ezt olvassa az /folyamatok/social-media-auto oldal.
// Árat módosítani ITT kell - az oldal automatikusan követi.
//
// FONTOS: minden ár NETTÓ. Ha ez változik, a `priceNote` szöveget is írd át.
// A konfigurátor kártyáján lévő ár külön van: data/workflows.ts → priceLabel.
// A kettőt kézzel kell szinkronban tartani!
// ─────────────────────────────────────────────────────────────────────────────

export type PriceRow = {
  label: string;
  desc?: string;
  price: string;
  /** Tételes felsorolás a leírás alatt - ha pontosan le kell írni, mi van benne. */
  includes?: string[];
  /** Kiemelt sor (halvány cyan háttér) - pl. a legnépszerűbb bővítmény. */
  highlight?: boolean;
};

export type CompareRow = {
  what: string;
  market: string;
  ours: string;
  /** Ha true, nem "nyerünk" - őszinte sor, magyarázattal. */
  note?: string;
};

export const priceNote = "Minden ár nettó, ÁFA nélkül értendő.";

// ── 1. ALAPRENDSZER ──────────────────────────────────────────────────────────

export const setupPrice = "150.000 Ft";
export const monthlyPrice = "59.000 Ft / hó";

/** Mit kap az egyszeri beüzemelési díjért. */
export const setupIncludes: string[] = [
  "A rendszer telepítése és beállítása, saját admin felülettel",
  "A Facebook oldalad összekötése a rendszerrel",
  "Google Drive képtár struktúra kialakítása (mappák, elnevezési rend)",
  "Márkahang és posztstratégia beállítása: témakörök, hangnem, poszttípusok",
  "Webshop vagy terméklista bekötése - a rendszer csak valós termékről ír",
  "Betanítás és átadás, írásos használati útmutatóval",
];

/** Mit fedez a havidíj. Ez a lap legfontosabb szakasza. */
export const monthlyIncludes: string[] = [
  "Havi kb. 20 poszt - minden hétköznapra egy, a Facebook oldaladra",
  "A szövegeket az AI írja a valós termékkatalógusodból - neked nem kell szöveget adnod",
  "Ütemezés, jóváhagyási felület és statisztika",
  "A rendszer karbantartása és a hibák javítása",
  "A Facebook hozzáférési token újragenerálása (kb. kéthavonta lejár)",
  "A platformok API-változásainak követése és a rendszer hozzáigazítása",
  "E-mail support, 2 munkanapon belüli válasszal",
  "Apró szövegi igazítások, egy-egy poszt átíratása - díjmentes",
];

/** Amit az ügyfélnek kell biztosítania. Ez előzi meg az onboarding elakadást. */
export const clientProvides: string[] = [
  "Admin hozzáférés a Facebook oldaladhoz",
  "Termékfotók: éles, min. 1500 px, termékkód szerint elnevezve (ha nincs így, elkészítjük - lásd a bővítményeknél)",
  "A webshop vagy a terméklista elérhetősége",
  "Havi egy jóváhagyás a legenerált posztokra",
];

// ── 2. BŐVÍTMÉNYEK ───────────────────────────────────────────────────────────

export const addons: PriceRow[] = [
  {
    label: "Reklámanimációk - havi előfizetés",
    desc: "Havonta 3 új, álló (9:16) reklámanimáció, automatikus videós kiküldéssel. Ugyanaz az anyag megy ki organikus posztként és fizetett hirdetésként is - egy gyártásból két csatorna profitál. 12 hónapos futamidő.",
    price: "+60.000 Ft / hó",
    includes: [
      "Havi 3 új animáció, álló 9:16 formátumban",
      "Forgatókönyv, gyártás és utómunka - forgatás és stáb nélkül",
      "A meglévő termékfotóidból és a kabalafiguládból építkezik",
      "Automatikus kiküldés a már működő ütemezésbe illesztve",
      "Poszt és fizetett hirdetés ugyanabból az anyagból",
      "Animációnkénti ár így 20.000 Ft - a darabra vásárolt 35.000 Ft helyett",
    ],
    highlight: true,
  },
  {
    label: "Animáció kötelezettség nélkül",
    desc: "Eseti darabgyártás előfizetés nélkül - kampányra, akcióra, egyszeri bejelentésre. Ugyanaz a minőség, csak nincs mögötte havi elkötelezettség. Ez az ár érvényes akkor is, ha az előfizetésed havi 3 darabja felett kérsz továbbit.",
    price: "35.000 Ft / db",
  },
  {
    label: "Brand Kit - kabalafigura és képkészlet",
    desc: "Saját karakter a márkádhoz, ami minden felületen ugyanaz: a posztokon, az animációkban és a hirdetésekben is. Nem egyetlen rajz, hanem újrahasznosítható készlet - és megmarad a recept, amiből bármikor készül újabb kép. Egyszeri díj.",
    includes: [
      "Kabalafigura koncepció: 2 vázlat a márkádból levezetve, ebből 1 teljesen kidolgozva",
      "5 alap póz: bemutató, irányjelző, munka közbeni, üdvözlő, és egy álló 9:16 story-változat",
      "10 termékkép előkészítése (lásd a következő tételt)",
      "A Drive-képtár felépítése és bekötése a rendszerbe - innen dolgozik a posztoló és az animációgyártás is",
      "A generáló recept megőrzése: új póz később külön projekt nélkül készíthető",
      "2 revíziós kör",
    ],
    price: "180.000 Ft",
  },
  {
    label: "Extra kabala-póz",
    desc: "Új helyzet, új termék a karakter kezében - a meglévő receptből, bármikor. Nem kell újratervezni a figurát.",
    price: "12.000 Ft / db",
  },
  {
    label: "Termékfotó előkészítése",
    desc: "A rendszer csak akkor tud a fotóidból posztot írni, ha azok tiszták és a termékkód szerint vannak elnevezve. Ha nyers fotókat küldesz, ezt mi végezzük el.",
    includes: [
      "A termék kivágása a háttérből, szélek tisztítása",
      "Színek és fényerő egységesítése, hogy a posztok ne tarkálljanak",
      "Két változat: átlátszó hátterű PNG és fehér hátteres verzió",
      "Elnevezés a termékkód szerint - ettől találja meg a rendszer a valós terméket a katalógusodban, és ez akadályozza meg, hogy kitalált adatot írjon",
      "Feltöltés a Drive-képtárba, a megfelelő mappába",
    ],
    price: "1.900 Ft / kép",
  },
  {
    label: "Posztstratégia vagy márkahang átalakítása",
    desc: "Új témakörök, más hangnem, átszabott poszttípusok - ha a kommunikációd iránya megváltozik. Egyszeri díj, NEM platformonként: a stratégia egyszer készül el, és minden platformodra érvényes lesz.",
    includes: [
      "A témakörök és a poszttípusok újratervezése",
      "A márkahang (stílus, megszólítás, hangnem) átírása",
      "Alkalmazás az összes már bekötött platformodra - felár nélkül",
      "Ha egy platform külön, eltérő hangnemet kap: +19.000 Ft platformonként",
    ],
    price: "49.000 Ft",
  },
  {
    label: "Új platform bekötése",
    desc: "Instagram, TikTok, LinkedIn vagy YouTube. Az alaprendszer a Facebook oldaladat kezeli; minden további platform külön bekötés. A bekötés után ugyanúgy magától megy ki minden - neked nincs vele teendőd.",
    includes: [
      "A platform hozzáférésének beállítása és összekötése a rendszerrel",
      "A heti ütemterv megtervezése az adott platformra: melyik napon milyen tartalom megy ki",
      "A tartalom igazítása a platform natív méretéhez és formátumához",
      "Végigtesztelt kiküldés, hogy éles indulásnál ne érjen meglepetés",
      "Utána teljesen automatikus: te ugyanabban az admin felületen hagyod jóvá havonta egyszer, mint eddig",
      "A havidíjad emiatt nem változik",
    ],
    price: "79.000 Ft / platform",
  },
  {
    label: "Sürgős kampányanyag",
    desc: "48 órán belüli elkészítés soron kívül, a normál sorrend megkerülésével.",
    price: "+50% felár",
  },
];

// ── 3. PIACI ÖSSZEHASONLÍTÁS ─────────────────────────────────────────────────
// Csak olyan sort tegyél ide, amit vállalni is tudsz. A `note` mezővel
// az őszinte, "nem nyerünk" sorokat is fel lehet vállalni.

export const comparison: CompareRow[] = [
  {
    what: "Havi közösségi média kezelés",
    market: "199.000 - 519.000 Ft / hó",
    ours: "59.000 Ft / hó",
  },
  {
    what: "Havi videós tartalom",
    market: "150.000 Ft / hó-tól (2 videó)",
    ours: "60.000 Ft / hó (3 videó)",
  },
  {
    what: "Egy közösségi kampányvideó",
    market: "200.000 - 500.000 Ft / db",
    ours: "35.000 Ft / db",
    note: "Ez a darabár, elköteleződés nélkül - egyetlen kampányra vagy bejelentésre is megrendelhető. Havi előfizetéssel viszont 20.000 Ft-ra jön le animációnként (3 db havonta, 60.000 Ft-ért), vagyis közel a feléért kapod ugyanazt.",
  },
  {
    what: "Kabalafigura és képkészlet",
    market: "kb. 105.000 Ft",
    ours: "180.000 Ft",
    note: "Itt drágábbak vagyunk - és ezt vállaljuk. A hagyományos ár egy karaktertervet és néhány retusált képet takar. Nálunk ebben benne van az 5 pózos készlet, a bekötött Drive-képtár és a megőrzött generálási recept, amiből bármikor készül új kép, új projekt nélkül.",
  },
];

// ── 4. JÓ TUDNI ──────────────────────────────────────────────────────────────

export const goodToKnow: string[] = [
  "A havidíj hónapról hónapra fizetendő, 30 napos felmondási idővel. Kivétel a Reklámanimációk előfizetés, ahol 12 hónapos futamidő van - ezért kerül animációnként 20.000 Ft-ba ahelyett, hogy 35.000 lenne.",
  "A hirdetési költségkeret (Meta felé fizetett összeg) nem része az árnak, azt közvetlenül te fizeted a platformnak.",
  "A rendszer soha nem talál ki terméket vagy adatot: kizárólag a valós katalógusodból és a feltöltött fotókból dolgozik.",
  "A kabalafigura és a leszállított képek a tiéd, korlátlan felhasználásra.",
];
