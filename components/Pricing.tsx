"use client";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    id: "alap",
    name: "Alap",
    emoji: "🌊",
    tagline: "Professzionális webjelenlét",
    price: 150000,
    monthly: 15000,
    highlight: false,
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "AI Chatbot", included: false },
      { text: "Hírlevél automatizálás", included: false },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "halado",
    name: "Haladó",
    emoji: "⚡",
    tagline: "Weboldal + AI ügyfélszolgálat",
    price: 250000,
    monthly: 25000,
    highlight: false,
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "AI Chatbot (0-24, magyar)", included: true },
      { text: "Hírlevél automatizálás", included: false },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "premium",
    name: "Prémium",
    emoji: "🚀",
    tagline: "Teljes AI marketing rendszer",
    price: 380000,
    monthly: 35000,
    highlight: true,
    badge: "Legnépszerűbb",
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "AI Chatbot (0-24, magyar)", included: true },
      { text: "MailerLite hírlevél + welcome sorozat", included: true },
      { text: "Egyedi folyamatok", included: false },
    ],
  },
  {
    id: "extra",
    name: "Extra",
    emoji: "🔥",
    tagline: "Teljeskörű AI transzformáció",
    price: 550000,
    monthly: 50000,
    highlight: false,
    features: [
      { text: "5 oldalas Next.js weboldal", included: true },
      { text: "SEO alap beállítások", included: true },
      { text: "Mobil reszponzív design", included: true },
      { text: "Vercel hosting beállítás", included: true },
      { text: "Domain beállítás segítség", included: true },
      { text: "Beüzemelés + 1. hónap karbantartás", included: true },
      { text: "AI Chatbot (0-24, magyar)", included: true },
      { text: "MailerLite hírlevél + welcome sorozat", included: true },
      { text: "Egyedi Make/n8n folyamatok", included: true },
    ],
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("hu-HU") + " Ft";
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
          <span style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
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
            className={`reveal ${["", "delay-1", "delay-2", "delay-3"][i]}`}
            onMouseEnter={() => setHovered(plan.id)}
            onMouseLeave={() => setHovered(null)}
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

            {/* Emoji + Name */}
            <div style={{ marginBottom: "1.2rem" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: ".5rem" }}>{plan.emoji}</div>
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

      {/* Bottom note */}
      <div className="reveal" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
          💡 Nem találod amit keresel? Minden projekt egyedi —{" "}
          <a href="#contact" style={{ color: "var(--cyan)", textDecoration: "none", fontWeight: 600 }}>
            kérj személyre szabott ajánlatot
          </a>
          {" "}és együtt kitaláljuk a legjobb megoldást.
        </p>
      </div>
    </section>
  );
}
