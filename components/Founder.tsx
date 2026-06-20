"use client";
import { useEffect, useRef } from "react";

export default function Founder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Az AI Flux alapítója"
      style={{ background: "#050510", padding: "5rem 6% 6rem", position: "relative", overflow: "hidden" }}
    >
      {/* Háttér glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 70% 40%, rgba(0,102,255,.18) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div
        className="reveal"
        style={{
          position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(2rem, 5vw, 3.5rem)", alignItems: "center",
        }}
      >
        {/* Fotó */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            width: "min(320px, 80vw)", aspectRatio: "1 / 1",
            borderRadius: 20, overflow: "hidden",
            border: "1px solid rgba(0,229,255,.25)",
            background: "linear-gradient(145deg, rgba(0,229,255,.06), rgba(0,102,255,.04))",
            boxShadow: "0 0 60px rgba(0,229,255,.08), 0 24px 70px rgba(0,0,0,.5)",
          }}>
            <img
              src="/alapito.jpg"
              alt="Richtscheid Zoltán - az AI Flux alapítója"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* Szöveg */}
        <div>
          <div style={{
            display: "inline-block",
            background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.25)",
            borderRadius: 100, padding: ".35rem 1.1rem",
            fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
            color: "var(--cyan)", marginBottom: "1.4rem",
          }}>
            Az alapító
          </div>

          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.7rem, 3.6vw, 2.4rem)", fontWeight: 700,
            lineHeight: 1.2, marginBottom: ".5rem",
          }}>
            Richtscheid Zoltán
          </h2>

          <p style={{
            color: "var(--cyan)", fontWeight: 600, fontSize: "1rem",
            marginBottom: "1.5rem",
          }}>
            AI Flux alapító · 16 év e-commerce tapasztalat
          </p>

          <p style={{ color: "rgba(255,255,255,.74)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
            16 évig vezettem e-commerce és termékadat-csapatokat olyan cégeknél, mint a{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>MediaMarkt Magyarország</span> és az{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>eMAG (Extreme Digital)</span> — tudom, hogyan
            működik egy cég belül, és hol vesznek el az órák ismétlődő feladatokban.
          </p>

          <p style={{ color: "rgba(255,255,255,.74)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: "2rem" }}>
            2023 óta az AI-ra specializálódtam: az{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>AiBoT Academy</span> YouTube-csatornán
            magyarul tanítok AI eszközöket és automatizálást. Az AI Flux-szal ezt a két világot kötöm
            össze — valódi, működő megoldásokat építek magyar cégeknek.
          </p>

          {/* Linkek */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
            <a
              href="https://www.linkedin.com/in/zoltán-richtscheid-164334b7/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.25)",
                color: "var(--cyan)", fontWeight: 600, fontSize: ".9rem",
                padding: ".65rem 1.2rem", borderRadius: 8, textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@aibot_hu"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: ".55rem",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.12)",
                color: "rgba(255,255,255,.85)", fontWeight: 600, fontSize: ".9rem",
                padding: ".65rem 1.2rem", borderRadius: 8, textDecoration: "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
              AiBoT Academy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
