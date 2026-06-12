"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { plans, formatPrice } from "@/data/plans";
import PlanIcon from "@/components/PlanIcon";

// Egér-követő spotlight pozíció
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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
      id="pricing"
      ref={ref}
      aria-label="Árazás és csomagok"
      style={{ background: "var(--bg2)", padding: "5rem 6% 7rem", position: "relative", overflow: "hidden" }}
    >
      {/* Háttér glow */}
      <div style={{ position: "absolute", width: 800, height: 800, background: "radial-gradient(circle, rgba(0,80,200,.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* Header */}
      <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Átlátható árazás
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Válaszd ki a{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            hozzád illő csomagot
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Minden csomag tartalmaz egyszeri fejlesztési díjat és az első hónap karbantartást.
          Utána havi díj — átláthatóan, meglepetések nélkül.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.25rem",
        maxWidth: 1140,
        margin: "0 auto 3rem",
      }}>
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`reveal spotlight-card ${plan.highlight ? "glow-border" : ""} ${["", "delay-1", "delay-2", "delay-3"][i]}`}
            onMouseEnter={() => setHovered(plan.id)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={trackSpotlight}
            style={{
              position: "relative",
              borderRadius: 16,
              padding: plan.highlight ? "2.2rem 1.8rem" : "2rem 1.8rem",
              background: plan.highlight
                ? "linear-gradient(145deg, rgba(0,229,255,.08), rgba(0,102,255,.06))"
                : "rgba(255,255,255,.03)",
              border: plan.highlight
                ? "1px solid rgba(0,229,255,.35)"
                : hovered === plan.id
                ? "1px solid rgba(0,229,255,.2)"
                : "1px solid rgba(255,255,255,.07)",
              transform: hovered === plan.id ? "translateY(-6px)" : "translateY(0)",
              transition: "all .3s ease",
              boxShadow: plan.highlight
                ? "0 0 40px rgba(0,229,255,.08)"
                : hovered === plan.id
                ? "0 16px 40px rgba(0,0,0,.3)"
                : "none",
            }}
          >
            {/* Legnépszerűbb badge */}
            {plan.badge && (
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(90deg,var(--cyan),var(--blue))",
                color: "#000", fontSize: ".72rem", fontWeight: 700,
                padding: ".3rem 1rem", borderRadius: 100,
                letterSpacing: ".08em", textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {plan.badge}
              </div>
            )}

            {/* Ikon + Name */}
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ marginBottom: ".8rem" }}><PlanIcon id={plan.id} highlight={plan.highlight} /></div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, marginBottom: ".25rem" }}>
                {plan.name}
              </div>
              <div style={{ fontSize: ".82rem", color: "var(--muted)" }}>{plan.tagline}</div>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".3rem", marginBottom: ".4rem" }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.6rem,3vw,2.1rem)",
                  fontWeight: 700,
                  background: plan.highlight ? "linear-gradient(90deg,var(--cyan),var(--blue))" : "#fff",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {formatPrice(plan.price)}
                </span>
              </div>
              <div style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                egyszeri díj
              </div>
              <div style={{ marginTop: ".6rem", display: "flex", alignItems: "center", gap: ".4rem" }}>
                <span style={{
                  fontSize: ".9rem", fontWeight: 600,
                  color: plan.highlight ? "var(--cyan)" : "rgba(255,255,255,.6)",
                }}>
                  + {formatPrice(plan.monthly)}/hó
                </span>
                <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>karbantartás</span>
              </div>
            </div>

            {/* Features */}
            <ul style={{ listStyle: "none", marginBottom: "1.8rem" }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: ".6rem",
                  padding: ".4rem 0",
                  borderBottom: j < plan.features.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                  opacity: f.included ? 1 : 0.35,
                }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".6rem",
                    background: f.included ? "rgba(0,229,255,.12)" : "rgba(255,255,255,.05)",
                    border: f.included ? "1px solid rgba(0,229,255,.3)" : "1px solid rgba(255,255,255,.1)",
                    color: f.included ? "var(--cyan)" : "rgba(255,255,255,.3)",
                  }}>
                    {f.included ? "✓" : "✕"}
                  </span>
                  <span style={{ fontSize: ".85rem", color: f.included ? "rgba(255,255,255,.85)" : "var(--muted)", lineHeight: 1.5 }}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className={plan.highlight ? "btn-shine btn-glow" : "btn-shine"}
              style={{
                display: "block", textAlign: "center",
                padding: ".8rem",
                borderRadius: 8,
                fontFamily: "var(--font-heading)",
                fontSize: ".88rem", fontWeight: 700,
                textDecoration: "none",
                letterSpacing: ".04em",
                transition: "all .25s",
                background: plan.highlight
                  ? "linear-gradient(90deg,var(--cyan),var(--blue))"
                  : "transparent",
                color: plan.highlight ? "#000" : "var(--cyan)",
                border: plan.highlight ? "none" : "1px solid rgba(0,229,255,.3)",
                boxShadow: plan.highlight ? "0 0 24px rgba(0,229,255,.2)" : "none",
              }}
            >
              {plan.highlight ? "Ezt választom →" : "Érdeklődöm →"}
            </a>
          </div>
        ))}
      </div>

      {/* Folyamatok callout */}
      <div className="reveal" style={{ maxWidth: 860, margin: "0 auto 3rem" }}>
        <div style={{
          borderRadius: 14,
          border: "1px solid rgba(0,229,255,.18)",
          background: "linear-gradient(135deg, rgba(0,229,255,.04), rgba(0,102,255,.03))",
          padding: "1.8rem 2.2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1.2rem",
        }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", marginBottom: ".4rem" }}>
              Szeretnél még többet kihozni a csomagodból?
            </div>
            <p style={{ color: "var(--muted)", fontSize: ".87rem", lineHeight: 1.7, margin: 0 }}>
              Minden csomaghoz egyedi AI folyamatokat adhatsz hozzá — vagy akár csomag nélkül, önállóan is megvásárolhatod őket.
              Foglalási rendszer, lead generálás, hírlevél automatizmus és még sok más vár rád.
            </p>
          </div>
          <a
            href="/folyamatok"
            className="btn-shine"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              border: "1px solid rgba(0,229,255,.35)",
              color: "var(--cyan)", fontWeight: 700,
              padding: ".75rem 1.6rem", borderRadius: 8,
              fontSize: ".88rem", textDecoration: "none",
              fontFamily: "var(--font-heading)", whiteSpace: "nowrap",
              transition: "all .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,.08)"; e.currentTarget.style.borderColor = "rgba(0,229,255,.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,229,255,.35)"; }}
          >
            AI Folyamatok böngészése
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom note */}
      <div className="reveal" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
          Nem találod amit keresel? Minden projekt egyedi —{" "}
          <a href="#contact" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 600 }}>
            kérj személyre szabott ajánlatot
          </a>
          {" "}és együtt kitaláljuk a legjobb megoldást.
        </p>
      </div>
    </section>
  );
}
