"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    tag: "01",
    title: "AI-Alapú Webfejlesztés",
    desc: "Nem sablonokat adunk el. Minden weboldalt az üzleti céljaidra szabunk — gyors, SEO-optimalizált, konverzióra hangolt. A fejlesztés minden lépésénél AI-t használunk, hogy gyorsabban és okosabban jussunk el az eredményig.",
    features: ["Next.js & React", "SEO-first felépítés", "3× gyorsabb szállítás"],
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="url(#ic1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <defs><linearGradient id="ic1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
        <rect x="2" y="3" width="22" height="16" rx="2" />
        <path d="M8 19v4M18 19v4M5 23h16" />
        <path d="M7 9l3 3-3 3M13 15h6" />
      </svg>
    ),
  },
  {
    tag: "02",
    title: "Üzleti Folyamat Automatizáció",
    desc: "Képzeld el, hogy a hírleveled magától megy ki, az e-mailek automatikusan válaszolnak, a chatbotod 0-24 kiszolgálja az ügyfeleidet — mindezt mesterséges intelligencia hajtja. Te csak a növekedésre fókuszálsz, a rendszer dolgozik helyetted.",
    features: ["Make & n8n folyamatok", "AI automatizmusok", "Hírlevél & e-mail automatizálás"],
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="url(#ic2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <defs><linearGradient id="ic2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
        <circle cx="5" cy="13" r="2" /><circle cx="13" cy="5" r="2" />
        <circle cx="21" cy="13" r="2" /><circle cx="13" cy="21" r="2" />
        <path d="M7 13h4M13 7v4M15 13h4M13 15v4" />
        <circle cx="13" cy="13" r="2.5" />
      </svg>
    ),
  },
  {
    tag: "03",
    title: "Intelligens Chatbot Rendszerek",
    desc: "A következő generációs ügyfélkiszolgálás már nem várakoztat. AI-chatbotjaink ismerik a vállalkozásodat, értik a kérdéseket és valódi értéket adnak — nem csak sablonválaszokat. Telepítés weboldalra, Messengerre vagy belső rendszerekre.",
    features: ["RAG-alapú tudásbázis", "Többcsatornás telepítés", "Magyar nyelvű AI"],
    icon: (
      <svg viewBox="0 0 26 26" fill="none" stroke="url(#ic3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <defs><linearGradient id="ic3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
        <path d="M4 6h18a1 1 0 011 1v10a1 1 0 01-1 1H6l-4 3V7a1 1 0 011-1z" />
        <circle cx="9" cy="12" r="1.2" fill="url(#ic3)" />
        <circle cx="13" cy="12" r="1.2" fill="url(#ic3)" />
        <circle cx="17" cy="12" r="1.2" fill="url(#ic3)" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref}
      aria-label="Szolgáltatásaink"
      style={{ background: "var(--bg2)", padding: "5rem 6% 7rem" }}>

      <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Amit építünk
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Három terület,{" "}
          <span style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            egy közös cél
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 540, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Az AI-t nem ráhúzzuk a meglévő folyamatokra. Együtt tervezzük meg, hogyan tud valódi értéket teremteni a vállalkozásodban.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        {services.map((s, i) => (
          <article key={i} className={`glass-card reveal ${["", "delay-1", "delay-2"][i]}`}
            style={{ padding: "2.4rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <div style={{ width: 52, height: 52, background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.icon}
              </div>
              <span style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(0,229,255,.4)", letterSpacing: ".1em" }}>
                {s.tag}
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: ".85rem", letterSpacing: "-.01em" }}>
              {s.title}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.78, marginBottom: "1.6rem" }}>
              {s.desc}
            </p>

            {/* Feature tagek */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1.6rem" }}>
              {s.features.map((f, j) => (
                <span key={j} style={{
                  fontSize: ".75rem", fontWeight: 500,
                  color: "var(--cyan)", letterSpacing: ".04em",
                  background: "rgba(0,229,255,.07)",
                  border: "1px solid rgba(0,229,255,.15)",
                  borderRadius: 100, padding: ".25rem .75rem",
                }}>
                  {f}
                </span>
              ))}
            </div>

            <a href="#contact" style={{
              color: "var(--cyan)", fontSize: ".85rem", fontWeight: 600,
              textDecoration: "none", letterSpacing: ".04em",
              display: "inline-flex", alignItems: "center", gap: ".4rem",
              transition: "gap .2s",
            }}>
              Érdekel → 
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
