"use client";
import { useEffect, useRef } from "react";

export default function CTA() {
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
    <section id="contact" ref={ref}
      aria-label="Kapcsolatfelvétel"
      style={{ background: "#000", padding: "7rem 6% 8rem", textAlign: "center", position: "relative", overflow: "hidden" }}>

      {/* Háttér glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,40,110,.45) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,229,255,.3), transparent)" }} />

      {/* Pulzáló gyűrűk a tartalom mögött — a layout-kritikus pozíció inline, csak az animáció jön CSS-ből */}
      {[0, 1.5, 3].map((delay) => (
        <div key={delay} className="pulse-ring" aria-hidden="true" style={{
          width: 560, height: 560,
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          border: "1px solid rgba(0,229,255,.25)", borderRadius: "50%",
          pointerEvents: "none",
          animationDelay: `${delay}s`,
        }} />
      ))}

      <div className="reveal" style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>

        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1.2rem" }}>
          Kezdjük el együtt
        </p>

        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.7rem,3.6vw,2.7rem)", fontWeight: 700, marginBottom: "1.4rem", lineHeight: 1.22, letterSpacing: "-.01em" }}>
          Szeretnéd, hogy az AI{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            átformálja a vállalkozásodat
          </span>{" "}
          és jobbá tegye a folyamataidat?
        </h2>

        <p style={{ color: "rgba(255,255,255,.68)", fontSize: "1.05rem", marginBottom: "1rem", lineHeight: 1.85, maxWidth: 580, margin: "0 auto 1rem" }}>
          Egy 30 perces ingyenes konzultáció alatt megmutatjuk, hol rejtőznek a legnagyobb lehetőségek a te iparágadban — és azt is, hogyan valósíthatók meg reálisan.
        </p>
        <p style={{ color: "rgba(0,229,255,.7)", fontSize: ".9rem", marginBottom: "2.8rem", fontWeight: 500 }}>
          Nincs kötelezettség. Csak értékes 30 perc.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:info@aiflux.hu" className="btn-shine btn-glow arrow-link" style={{
            display: "inline-flex", alignItems: "center", gap: ".6rem",
            background: "linear-gradient(90deg,var(--cyan),var(--blue))",
            color: "#000", fontWeight: 700, padding: "1rem 2.6rem",
            borderRadius: 6, fontSize: "1rem", textDecoration: "none",
            letterSpacing: ".04em", fontFamily: "var(--font-heading)",
            boxShadow: "0 0 40px rgba(0,229,255,.25)",
          }}>
            Ingyenes konzultáció foglalása
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="mailto:info@aiflux.hu" style={{
            display: "inline-flex", alignItems: "center",
            border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.75)",
            padding: "1rem 2rem", borderRadius: 6, fontSize: ".95rem",
            textDecoration: "none", fontWeight: 500, transition: "all .25s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,.4)"; e.currentTarget.style.color = "var(--cyan)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}>
            info@aiflux.hu
          </a>
        </div>
      </div>
    </section>
  );
}
