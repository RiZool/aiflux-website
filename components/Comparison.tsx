"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Konzisztens SVG vonal-ikonok (24×24 viewBox, stroke stílus)
const rowIcons: Record<string, ReactNode> = {
  clock:   <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  money:   <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.4" /><path d="M6 12h.01M18 12h.01" /></>,
  cpu:     <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
  bolt:    <path d="M13 2 3 14h8l-1 8 11-13h-8l1-7z" />,
  chat:    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />,
  mail:    <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  trend:   <><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  globe:   <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.6-4-9s1.5-6.5 4-9z" /></>,
};

function RowIcon({ name }: { name: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,229,255,.75)"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      {rowIcons[name]}
    </svg>
  );
}

const rows = [
  { label: "Fejlesztési idő",       icon: "clock", traditional: "4–12 hét",                 aiflux: "3–5 hét" },
  { label: "Ár",                    icon: "money", traditional: "Magas fix díj",              aiflux: "Átlátható, rugalmas" },
  { label: "AI integráció",         icon: "cpu",   traditional: "Ritka vagy extra",           aiflux: "Minden projektbe beépítve" },
  { label: "Automatizáció",         icon: "bolt",  traditional: "Nem része",                  aiflux: "Alap szolgáltatás" },
  { label: "Chatbot",               icon: "chat",  traditional: "Külön megrendelés",          aiflux: "Beépített opció" },
  { label: "Hírlevél automatizmus", icon: "mail",  traditional: "Nem jellemző",               aiflux: "Igen, MailerLite + AI" },
  { label: "Folyamatos fejlesztés", icon: "trend", traditional: "Plusz díj",                  aiflux: "Együtt növekszünk" },
  { label: "Magyar nyelvű AI",      icon: "globe", traditional: "Ritkán",                     aiflux: "Igen, natívan" },
];

const stats = [
  { value: "3×", label: "gyorsabb szállítás" },
  { value: "0–24", label: "AI ügyfélszolgálat" },
  { value: "100%", label: "AI-natív fejlesztés" },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.5" fill="rgba(0,229,255,.12)" stroke="rgba(0,229,255,.35)" />
      <path d="M5 8.2l2 2 4-4" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7.5" fill="rgba(255,80,80,.08)" stroke="rgba(255,80,80,.2)" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="rgba(255,100,100,.7)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="comparison"
      ref={ref}
      aria-label="Összehasonlítás hagyományos fejlesztőkkel"
      style={{ background: "var(--bg3)", padding: "5rem 6% 7rem", position: "relative", overflow: "hidden" }}
    >
      {/* Háttér */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,.04) 0%, transparent 70%)", top: "10%", right: "8%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* ── FEJLÉC ── */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
            Miért válassz minket?
          </p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.12, letterSpacing: "-.02em" }}>
            Nem vagyunk{" "}
            <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              hagyományos fejlesztők
            </span>
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
            Az AI Flux nem egy webügynökség, amely AI-t is kínál. Mi AI-alapon dolgozunk - és ez mindent megváltoztat.
          </p>
        </div>

        {/* ── STAT CSÍKOK ── */}
        <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: ".75rem",
              background: "rgba(0,229,255,.05)",
              border: "1px solid rgba(0,229,255,.15)",
              borderRadius: 100, padding: ".55rem 1.4rem",
            }}>
              <span style={{
                fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800,
                color: "var(--cyan)",
              }}>
                {s.value}
              </span>
              <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.55)", fontWeight: 500 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── ÖSSZEHASONLÍTÁS ── */}
        <div className="reveal" style={{ position: "relative" }}>

          {/* AIFlux oszlop highlight overlay */}
          <div style={{
            position: "absolute",
            top: 44, bottom: 0,
            right: 0, width: "calc(100% / 3)",
            background: "linear-gradient(180deg, rgba(0,229,255,.05) 0%, rgba(0,102,255,.03) 100%)",
            borderLeft: "1px solid rgba(0,229,255,.15)",
            borderRight: "1px solid rgba(0,229,255,.15)",
            borderBottom: "1px solid rgba(0,229,255,.15)",
            borderRadius: "0 0 16px 0",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Fejléc sor */}
          <div style={{
            display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr",
            padding: ".6rem 1.2rem 1rem",
            position: "relative", zIndex: 1,
          }}>
            <div />

            {/* Hagyományos fejléc */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                display: "inline-block",
                fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em",
                textTransform: "uppercase", color: "rgba(255,255,255,.3)",
                padding: ".3rem .85rem", borderRadius: 100,
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.03)",
              }}>
                Hagyományos
              </div>
            </div>

            {/* AIFlux fejléc */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: ".4rem",
                fontSize: ".78rem", fontWeight: 800, letterSpacing: ".08em",
                textTransform: "uppercase",
                padding: ".35rem 1rem", borderRadius: 100,
                background: "linear-gradient(90deg, rgba(0,229,255,.15), rgba(0,102,255,.12))",
                border: "1px solid rgba(0,229,255,.35)",
                color: "var(--cyan)",
                boxShadow: "0 0 16px rgba(0,229,255,.1)",
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" fill="var(--cyan)" />
                </svg>
                AI Flux
              </div>
            </div>
          </div>

          {/* Táblázat sorok */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.07)", position: "relative", zIndex: 1 }}>
            {rows.map((row, i) => {
              const isHov = hoveredRow === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr",
                    alignItems: "center",
                    padding: "0 1.2rem",
                    background: isHov
                      ? "rgba(0,229,255,.04)"
                      : i % 2 === 0 ? "rgba(255,255,255,.02)" : "transparent",
                    borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                    transition: "background .18s ease",
                    minHeight: 58,
                  }}
                >
                  {/* Sor label */}
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".85rem 0" }}>
                    <RowIcon name={row.icon} />
                    <span style={{ fontSize: ".88rem", fontWeight: 500, color: isHov ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.65)", transition: "color .18s" }}>
                      {row.label}
                    </span>
                  </div>

                  {/* Hagyományos érték */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", padding: ".85rem 0" }}>
                    <CrossIcon />
                    <span style={{ fontSize: ".84rem", color: "rgba(255,255,255,.32)", lineHeight: 1.35 }}>
                      {row.traditional}
                    </span>
                  </div>

                  {/* AIFlux érték */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", padding: ".85rem 0" }}>
                    <CheckIcon />
                    <span style={{ fontSize: ".86rem", fontWeight: 600, color: isHov ? "#fff" : "rgba(255,255,255,.9)", lineHeight: 1.35, transition: "color .18s" }}>
                      {row.aiflux}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AIFlux oszlop alap sarka */}
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: "calc(100% / 3)", height: 16,
            borderRadius: "0 0 16px 0",
            background: "linear-gradient(90deg, transparent, rgba(0,229,255,.08))",
            pointerEvents: "none", zIndex: 2,
          }} />
        </div>

        {/* ── CTA ── */}
        <div className="reveal" style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "var(--muted)", fontSize: ".9rem", marginBottom: "1.5rem" }}>
            Meggyőzött? Induljunk el együtt egy ingyenes konzultációval.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".6rem",
              background: "linear-gradient(90deg,var(--cyan),var(--blue))",
              color: "#000", fontWeight: 700, padding: ".88rem 2.4rem",
              borderRadius: 8, fontSize: ".95rem", textDecoration: "none",
              letterSpacing: ".04em", fontFamily: "var(--font-heading)",
              boxShadow: "0 0 32px rgba(0,229,255,.28)",
              transition: "box-shadow .25s, transform .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 48px rgba(0,229,255,.45)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 32px rgba(0,229,255,.28)"; e.currentTarget.style.transform = "none"; }}
          >
            Ingyenes konzultáció
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
