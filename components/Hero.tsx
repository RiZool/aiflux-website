"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const TEXTS = [
  "AI-alapú webfejlesztés.",
  "Üzleti folyamat automatizáció.",
  "Intelligens chatbot rendszerek.",
  "Digitális transzformáció.",
];

function useTypewriter(texts: string[]) {
  const [display, setDisplay] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (wait > 0) { setWait((w) => w - 1); return; }
      const full = texts[ti];
      if (!deleting) {
        const next = ci + 1;
        setDisplay(full.slice(0, next));
        setCi(next);
        if (next === full.length) { setWait(28); setDeleting(true); }
      } else {
        const next = ci - 1;
        setDisplay(full.slice(0, next));
        setCi(next);
        if (next === 0) {
          setDeleting(false);
          setTi((t) => (t + 1) % texts.length);
          setWait(8);
        }
      }
    }, deleting ? 45 : 80);
    return () => clearTimeout(timeout);
  }, [ci, deleting, ti, texts, wait]);

  return display;
}

export default function Hero() {
  const typed = useTypewriter(TEXTS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Főoldal — AI Flux fejlesztő stúdió"
      style={{
        position: "relative", width: "100%", height: "100vh",
        minHeight: 700, display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden", background: "#000",
      }}
    >
      <Image
        src="/hero.jpg"
        alt="Mélykék óceán — az AI Flux kreatív technológiai stúdió háttere"
        fill priority
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
      />

      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,8,35,.62)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, height: 200, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,.65) 0%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(0,140,255,.13) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, height: "50%", pointerEvents: "none", background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.82) 70%, #000 100%)" }} />

      {/* Hero tartalom */}
      <div style={{
        position: "relative", zIndex: 3, textAlign: "center",
        padding: "0 1.5rem", maxWidth: 920,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity .8s ease, transform .8s ease",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: ".5rem",
          marginBottom: "2rem", padding: ".4rem 1.1rem", borderRadius: 100,
          fontSize: ".75rem", fontWeight: 600, letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--cyan)",
          background: "rgba(0,229,255,.09)", border: "1px solid rgba(0,229,255,.28)",
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} />
          AI-Natív Fejlesztő Stúdió · Magyarország
        </div>

        {/* H1 — SEO főcím */}
        <h1 style={{
          fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem,5.5vw,4.6rem)",
          fontWeight: 700, lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "-.01em",
        }}>
          <span style={{ display: "block", color: "#fff" }}>
            Nem csak weboldalt építünk.
          </span>
          <span className="gradient-text" style={{ display: "block" }}>
            Intelligens rendszereket.
          </span>
        </h1>

        {/* Typewriter */}
        <div style={{
          fontSize: "clamp(.95rem,2vw,1.25rem)", color: "var(--cyan)",
          minHeight: "2rem", marginBottom: "1.8rem", letterSpacing: ".03em",
          fontWeight: 500,
        }}>
          {typed}<span className="blink" style={{ marginLeft: 2 }}>|</span>
        </div>

        {/* SEO subtitle */}
        <p style={{
          fontSize: "clamp(.95rem,1.5vw,1.1rem)",
          color: "rgba(255,255,255,.72)",
          maxWidth: 580, margin: "0 auto 2.8rem", lineHeight: 1.85,
        }}>
          Az AI Flux az a stúdió, ahol a mesterséges intelligencia nem egy extra funkció —
          hanem az alapja mindennek. Gyorsabb fejlesztés, okosabb rendszerek,
          mérhető üzleti eredmények.
        </p>

        {/* CTA gombok */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={{
            display: "inline-block",
            background: "linear-gradient(90deg,var(--cyan),var(--blue))",
            color: "#000", fontWeight: 700, padding: ".9rem 2.4rem",
            borderRadius: 6, textDecoration: "none", fontSize: "1rem",
            letterSpacing: ".04em",
            boxShadow: "0 0 32px rgba(0,229,255,.32)",
            fontFamily: "var(--font-heading)",
          }}>
            Ingyenes konzultáció →
          </a>
          <a href="#services" style={{
            display: "inline-block", background: "transparent",
            border: "1px solid rgba(255,255,255,.28)", color: "#fff",
            padding: ".9rem 2.4rem", borderRadius: 6,
            textDecoration: "none", fontSize: "1rem", fontWeight: 500,
          }}>
            Megnézem a szolgáltatásokat
          </a>
        </div>
      </div>

      {/* Scroll jelző */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem",
        color: "rgba(255,255,255,.45)", fontSize: ".7rem",
        letterSpacing: ".12em", textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <div className="scroll-arrow" style={{
          width: 16, height: 16,
          borderRight: "1px solid rgba(255,255,255,.35)",
          borderBottom: "1px solid rgba(255,255,255,.35)",
          transform: "rotate(45deg)",
        }} />
      </div>
    </section>
  );
}
