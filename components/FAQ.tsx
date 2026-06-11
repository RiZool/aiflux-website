"use client";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "Mit tud automatizálni az AI?",
    a: "Minden ismétlődő, szabály alapján működő feladatot: ügyfélkommunikáció, e-mail válaszok, ajánlatkérések feldolgozása, hírlevél sorozatok, időpontfoglalás, riportok generálása. Ha ugyanazt csinálod újra és újra — azt az AI elvégzi helyetted.",
  },
  {
    q: "Az AI automatizáció ugyanaz, mint a chatbot?",
    a: "Nem. A chatbot az AI automatizáció egyik eszköze — de az AI ennél sokkal tágabb: folyamatok összekötése, adatok feldolgozása, e-mail kezelés, dokumentum összefoglalás, mind chatbot nélkül is működnek. Mi mindkettőt csináljuk.",
  },
  {
    q: "Mennyi idő alatt készül el egy projekt?",
    a: "Jellemzően 3–5 hét, a csomagtól és az igényektől függően. Hagyományos fejlesztőknél ez 4–12 hét szokott lenni — mi AI-asszisztált folyamattal akár háromszor gyorsabban szállítunk.",
  },
  {
    q: "Mi van a havidíjban?",
    a: "Hosting, karbantartás, az AI modell költsége (ez nálunk benne van — nem kell külön Anthropic vagy OpenAI számlával foglalkoznod), hibajavítás és kisebb módosítások. Átláthatóan, meglepetések nélkül.",
  },
  {
    q: "Elveszi az AI a munkatársaim munkáját?",
    a: "Nem váltja ki az embereket, hanem az ismétlődő, időrabló feladatokat veszi át tőlük. A legtöbb ügyfelünknél ez azt jelenti, hogy ugyanannyi emberrel több ügyfelet tudnak kiszolgálni — a csapat az értékesebb munkára fókuszálhat.",
  },
  {
    q: "Mi van, ha rossz választ ad az AI?",
    a: "A chatbotjaink kizárólag az általad jóváhagyott tudásbázisból válaszolnak — nem találnak ki információt. Ha valamire nincs válasz, az ügyfelet hozzád irányítja. Beüzemelés előtt minden rendszert tesztelünk és finomhangolunk.",
  },
  {
    q: "Nálatok maradnak az adataim? Mennyire biztonságos?",
    a: "Az adataid a te tulajdonod. A rendszer a te szerverededen fut, az AI modell iparági szabványoknak megfelelő adatkezeléssel dolgozik. Érzékeny adat (jelszó, bankkártya) a rendszerbe soha nem kerülhet.",
  },
  {
    q: "Kell AI stratégia előtte?",
    a: "Nem kötelező. Az ingyenes konzultáción mi is segítünk azonosítani, hol adna az AI a legtöbbet a vállalkozásodnak — tehát ha nincs kész stratégiád, a konzultáció ezt is pótolja.",
  },
  {
    q: "Le tudom írni költségként?",
    a: "Igen, a fejlesztési díj és a havidíj is vállalkozási költségként elszámolható. Általában IT vagy operatív költségként könyvelik — a könyvelőddel érdemes egyeztetni.",
  },
  {
    q: "Mi van, ha egyedi igényem van, ami nincs a csomagokban?",
    a: "Minden projekt egyedi. Kérj személyre szabott ajánlatot az info@aiflux.hu címen vagy az ingyenes 30 perces konzultáción — együtt kitaláljuk a legjobb megoldást.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      aria-label="Gyakori kérdések"
      style={{ background: "var(--bg2)", padding: "5rem 6% 7rem" }}
    >
      <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Kérdések & Válaszok
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Amit a legtöbben{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            megkérdeznek tőlünk
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Nem találod a választ? Írj az{" "}
          <a href="mailto:info@aiflux.hu" style={{ color: "var(--cyan)", textDecoration: "none" }}>info@aiflux.hu</a>
          {" "}címre vagy foglalj ingyenes konzultációt.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`reveal ${i < 5 ? ["", "delay-1", "delay-2", "delay-1", "delay-2"][i] : ""}`}
              style={{
                borderRadius: 12,
                border: isOpen ? "1px solid rgba(0,229,255,.3)" : "1px solid rgba(255,255,255,.07)",
                background: isOpen ? "rgba(0,229,255,.04)" : "rgba(255,255,255,.02)",
                overflow: "hidden",
                transition: "border-color .25s, background .25s",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", textAlign: "left",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                  padding: "1.1rem 1.4rem",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-heading)", fontSize: ".97rem", fontWeight: 600,
                  color: isOpen ? "var(--cyan)" : "rgba(255,255,255,.9)",
                  transition: "color .25s",
                }}
              >
                {item.q}
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={isOpen ? "var(--cyan)" : "rgba(255,255,255,.4)"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0, transition: "transform .3s, stroke .25s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>

              <div style={{
                maxHeight: isOpen ? 300 : 0,
                overflow: "hidden",
                transition: "max-height .35s cubic-bezier(.22,1,.36,1)",
              }}>
                <p style={{
                  padding: "0 1.4rem 1.2rem",
                  color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8,
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
