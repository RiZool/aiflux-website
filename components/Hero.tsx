"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
        if (next === 0) { setDeleting(false); setTi((t) => (t + 1) % texts.length); setWait(8); }
      }
    }, deleting ? 45 : 80);
    return () => clearTimeout(timeout);
  }, [ci, deleting, ti, texts, wait]);

  return display;
}

// Lépcsőzetes belépő animáció - minden elem kicsit később úszik be
function stagger(visible: boolean, i: number): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(26px)",
    filter: visible ? "blur(0)" : "blur(6px)",
    transition: `opacity .9s cubic-bezier(.22,1,.36,1) ${i * 0.13}s, transform .9s cubic-bezier(.22,1,.36,1) ${i * 0.13}s, filter .9s cubic-bezier(.22,1,.36,1) ${i * 0.13}s`,
  };
}

// ── Fő Hero komponens ──────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(TEXTS);
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);


  // Canvas particles - prefers-reduced-motion tudatos
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    type Particle = { x: number; y: number; size: number; speed: number; opacity: number; dir: number };
    const pts: Particle[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    for (let i = 0; i < 55; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4 + 0.4,
        speed: Math.random() * 0.35 + 0.08,
        opacity: Math.random() * 0.4 + 0.08,
        dir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.y -= p.speed;
        p.opacity += p.dir * 0.004;
        if (p.opacity > 0.55) p.dir = -1;
        if (p.opacity < 0.04) p.dir = 1;
        if (p.y < -8) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <section
      id="hero"
      aria-label="Főoldal - AI Flux fejlesztő ügynökség"
      style={{
        position: "relative", width: "100%", height: "100vh",
        minHeight: 700, display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden", background: "#000",
      }}
    >
      {/* Háttér kép - sötétítve */}
      <Image src="/hero.jpg" alt="AI Flux - technológiai háttér" fill priority
        style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.35 }} />

      {/* Particles */}
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        width: "100%", height: "100%", pointerEvents: "none",
      }} />

      {/* Gradient rétegek */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "rgba(0,5,22,.52)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 65% 55% at 50% 52%, rgba(0,100,255,.14) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, height: "55%", pointerEvents: "none", background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.88) 70%, #000 100%)" }} />

      {/* Finom rács-háttér */}
      <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />

      {/* Lebegő fény-orbok */}
      <div className="orb orb-a" aria-hidden="true" style={{ width: 380, height: 380, top: "12%", left: "8%", zIndex: 2, background: "radial-gradient(circle, rgba(0,229,255,.13) 0%, transparent 70%)" }} />
      <div className="orb orb-b" aria-hidden="true" style={{ width: 460, height: 460, bottom: "8%", right: "5%", zIndex: 2, background: "radial-gradient(circle, rgba(0,102,255,.16) 0%, transparent 70%)" }} />

      {/* Fő tartalom - lépcsőzetes belépő animáció */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 1.5rem", maxWidth: 860 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: ".5rem",
          marginBottom: "2rem", padding: ".38rem 1.05rem", borderRadius: 100,
          fontSize: ".7rem", fontWeight: 600, letterSpacing: ".14em",
          textTransform: "uppercase", color: "var(--cyan)",
          background: "rgba(0,229,255,.07)", border: "1px solid rgba(0,229,255,.28)",
          ...stagger(visible, 0),
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block", boxShadow: "0 0 6px rgba(0,229,255,.7)" }} />
          AI-Natív Fejlesztő Ügynökség · Magyarország
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.3rem,6vw,5rem)",
          fontWeight: 700, lineHeight: 1.08,
          marginBottom: "1.2rem", letterSpacing: "-.02em",
          ...stagger(visible, 1),
        }}>
          <span style={{ display: "block", color: "#fff" }}>Az AI nem helyettesít,</span>
          <span style={{ display: "block" }}>
            csupán <span className="gradient-text accent-display" style={{ fontWeight: 800 }}>FELERŐSÍT.</span>
          </span>
        </h1>

        {/* Typewriter - monospace HUD stílus */}
        <div style={{
          fontSize: "clamp(.9rem,1.9vw,1.18rem)",
          minHeight: "2rem", marginBottom: "1.8rem",
          letterSpacing: ".03em", fontWeight: 500,
          fontFamily: "'Courier New', monospace",
          ...stagger(visible, 2),
        }}>
          <span style={{ color: "rgba(0,229,255,.4)" }}>{"// "}</span>
          <span style={{ color: "var(--cyan)" }}>{typed}</span>
          <span className="blink" style={{ marginLeft: 1, color: "var(--cyan)" }}>▋</span>
        </div>

        {/* Alcím */}
        <p style={{
          fontSize: "clamp(.92rem,1.5vw,1.07rem)",
          color: "rgba(255,255,255,.67)",
          maxWidth: 555, margin: "0 auto 3rem", lineHeight: 1.85,
          ...stagger(visible, 3),
        }}>
          Az AI Flux az az ügynökség, ahol a mesterséges intelligencia nem egy extra funkció -
          hanem az alapja mindennek. Gyorsabb fejlesztés, okosabb rendszerek, mérhető üzleti eredmények.
        </p>

        {/* CTA gombok */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", ...stagger(visible, 4) }}>
          <a href="#contact" className="btn-shine btn-glow arrow-link" style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            background: "linear-gradient(90deg,var(--cyan),var(--blue))",
            color: "#000", fontWeight: 700, padding: ".9rem 2.4rem",
            borderRadius: 6, textDecoration: "none", fontSize: ".97rem",
            letterSpacing: ".04em", fontFamily: "var(--font-heading)",
            boxShadow: "0 0 28px rgba(0,229,255,.4), 0 0 55px rgba(0,229,255,.14)",
            cursor: "pointer",
          }}>
            Ingyenes konzultáció
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#services" style={{
            display: "inline-flex", alignItems: "center",
            background: "transparent",
            border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.82)",
            padding: ".9rem 2.4rem", borderRadius: 6,
            textDecoration: "none", fontSize: ".97rem", fontWeight: 500,
            cursor: "pointer",
            transition: "border-color .25s, color .25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,.4)"; e.currentTarget.style.color = "var(--cyan)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.82)"; }}
          >
            Szolgáltatások
          </a>
        </div>
      </div>

      {/* Scroll jelző */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem",
        color: "rgba(255,255,255,.32)", fontSize: ".67rem",
        letterSpacing: ".15em", textTransform: "uppercase",
      }}>
        <span>Tovább</span>
        <div className="scroll-arrow" style={{
          width: 13, height: 13,
          borderRight: "1px solid rgba(255,255,255,.28)",
          borderBottom: "1px solid rgba(255,255,255,.28)",
          transform: "rotate(45deg)",
        }} />
      </div>

    </section>
  );
}
