"use client";
import { useEffect, useRef } from "react";

const rows = [
  { label: "Fejlesztési idő",        traditional: "4–12 hét",          aiflux: "1–4 hét" },
  { label: "Ár",                     traditional: "Magas fix díj",      aiflux: "Átlátható, rugalmas" },
  { label: "AI integráció",          traditional: "Ritka vagy extra",   aiflux: "Minden projektbe beépítve" },
  { label: "Automatizáció",          traditional: "Nem része",          aiflux: "Alap szolgáltatás" },
  { label: "Chatbot",                traditional: "Külön megrendelés",  aiflux: "Beépített opció" },
  { label: "Hírlevél automatizmus",  traditional: "Nem jellemző",       aiflux: "Igen, MailerLite + AI" },
  { label: "Folyamatos fejlesztés",  traditional: "Plusz díj",          aiflux: "Együtt növekszünk" },
  { label: "Magyar nyelvű AI",       traditional: "Ritkán",             aiflux: "Igen, natívan" },
];

export default function Comparison() {
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
    <section
      id="comparison"
      ref={ref}
      aria-label="Összehasonlítás hagyományos fejlesztőkkel"
      style={{ background: "var(--bg3)", padding: "5rem 6% 7rem", position: "relative", overflow: "hidden" }}
    >
      {/* Háttér glow */}
      <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(0,102,255,.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* Header */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Miért válassz minket?
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Nem vagyunk{" "}
          <span style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            hagyományos fejlesztők
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Az AI Flux nem egy webügynökség, amely AI-t is kínál. Mi AI-alapon dolgozunk — és ez mindent megváltoztat.
        </p>
      </div>

      {/* Comparison table */}
      <div className="reveal" style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Column headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: ".5rem", padding: "0 1rem",
        }}>
          <div style={{ fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Szempont
          </div>
          <div style={{ textAlign: "center", fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase" }}>
            Hagyományos fejlesztő
          </div>
          <div style={{ textAlign: "center", fontSize: ".85rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}
            className="gradient-text">
            AI Flux
          </div>
        </div>

        {/* Rows */}
        <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,229,255,.1)" }}>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "1rem 1.2rem",
                background: i % 2 === 0 ? "rgba(255,255,255,.02)" : "rgba(0,229,255,.02)",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                alignItems: "center",
                transition: "background .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,229,255,.05)")}
              onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,.02)" : "rgba(0,229,255,.02)")}
            >
              {/* Label */}
              <div style={{ fontSize: ".9rem", fontWeight: 500, color: "rgba(255,255,255,.75)" }}>
                {row.label}
              </div>

              {/* Traditional */}
              <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "rgba(255,80,80,.12)",
                  border: "1px solid rgba(255,80,80,.25)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: ".65rem", color: "#ff6b6b", flexShrink: 0,
                }}>✕</span>
                <span style={{ fontSize: ".88rem", color: "rgba(255,255,255,.45)" }}>
                  {row.traditional}
                </span>
              </div>

              {/* AI Flux */}
              <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem" }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "rgba(0,229,255,.12)",
                  border: "1px solid rgba(0,229,255,.3)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: ".65rem", color: "var(--cyan)", flexShrink: 0,
                }}>✓</span>
                <span style={{ fontSize: ".88rem", fontWeight: 600, color: "#fff" }}>
                  {row.aiflux}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: ".6rem",
            background: "linear-gradient(90deg,var(--cyan),var(--blue))",
            color: "#000", fontWeight: 700, padding: ".85rem 2.2rem",
            borderRadius: 6, fontSize: ".95rem", textDecoration: "none",
            letterSpacing: ".04em", fontFamily: "var(--font-heading)",
            boxShadow: "0 0 30px rgba(0,229,255,.25)",
          }}>
            Mutasd meg, hogy miben segíthetünk →
          </a>
        </div>
      </div>
    </section>
  );
}
