"use client";
import { useEffect, useRef } from "react";

export default function Guarantee() {
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
      aria-label="Garancia és ígéretünk"
      style={{ background: "#000", padding: "5rem 6% 6rem", position: "relative", overflow: "hidden" }}
    >
      {/* Háttér glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,60,140,.35) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="reveal" style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto" }}>

        {/* Kártya */}
        <div style={{
          borderRadius: 20,
          border: "1px solid rgba(0,229,255,.2)",
          background: "linear-gradient(145deg, rgba(0,229,255,.05), rgba(0,102,255,.04))",
          padding: "clamp(2.5rem, 6vw, 4rem) clamp(2rem, 6vw, 4rem)",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(0,229,255,.06), 0 24px 80px rgba(0,0,0,.4)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Sarkokban dekoratív cián vonal */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: 80, borderTop: "2px solid rgba(0,229,255,.3)", borderLeft: "2px solid rgba(0,229,255,.3)", borderRadius: "20px 0 0 0", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 80, height: 80, borderBottom: "2px solid rgba(0,229,255,.3)", borderRight: "2px solid rgba(0,229,255,.3)", borderRadius: "0 0 20px 0", pointerEvents: "none" }} />

          {/* Badge */}
          <div style={{
            display: "inline-block",
            background: "rgba(0,229,255,.08)",
            border: "1px solid rgba(0,229,255,.25)",
            borderRadius: 100,
            padding: ".35rem 1.1rem",
            fontSize: ".72rem", fontWeight: 700,
            letterSpacing: ".14em", textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "1.8rem",
          }}>
            Ígéretünk
          </div>

          {/* Főcím */}
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "1.6rem",
          }}>
            Nincs rossz ötlet -{" "}
            <span className="accent-display" style={{
              background: "linear-gradient(90deg, var(--cyan), var(--blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              csak ki nem használt lehetőség.
            </span>
          </h2>

          {/* Szöveg */}
          <p style={{ color: "rgba(255,255,255,.72)", fontSize: "1.05rem", lineHeight: 1.85, maxWidth: 580, margin: "0 auto 1.4rem" }}>
            Ha van egy ötleted - legyen az bármilyen folyamat, automatizálás vagy AI megoldás -
            hozd el bátran. Közösen átgondoljuk, megtervezzük, és csak akkor fizetsz, ha a megvalósítás
            valóban azt hozza, amit megígértünk.
          </p>

          <p style={{ color: "rgba(255,255,255,.72)", fontSize: "1.05rem", lineHeight: 1.85, maxWidth: 580, margin: "0 auto 2.4rem" }}>
            Ha mi nem tudjuk megépíteni amit elvállaltunk -{" "}
            <span style={{ color: "var(--cyan)", fontWeight: 600 }}>nem kell fizetni.</span>
            {" "}Pont.
          </p>

          {/* 3 pillér */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.8rem",
          }}>
            {[
              {
                title: "Bármilyen ötlet",
                desc: "Nincs túl furcsa vagy túl egyszerű kérés",
                icon: (
                  <svg viewBox="0 0 26 26" fill="none" stroke="url(#g1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                    <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
                    <circle cx="13" cy="10" r="6" />
                    <path d="M10.5 16.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5" />
                    <path d="M13 19v2M10 10.5c0-1.7 1.3-3 3-3" />
                  </svg>
                ),
              },
              {
                title: "Közös tervezés",
                desc: "Együtt találjuk meg a legjobb megoldást és árat",
                icon: (
                  <svg viewBox="0 0 26 26" fill="none" stroke="url(#g2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                    <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
                    <path d="M17 11c0 3.3-2.7 6-6 6a5.9 5.9 0 01-3.5-1.1L4 17l1.1-3.5A5.9 5.9 0 014 10c0-3.3 2.7-6 6-6s6 2.7 6 6h0z" />
                    <path d="M17.5 14.5c.5.9.5 1.9.1 2.8L19 21l-3.7-1.4A5.9 5.9 0 0113 20c-2 0-3.8-.9-5-2.3" />
                  </svg>
                ),
              },
              {
                title: "Kockázatmentes",
                desc: "Ha nem szállítjuk, amit elvállaltunk - nem fizetsz",
                icon: (
                  <svg viewBox="0 0 26 26" fill="none" stroke="url(#g3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                    <defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00E5FF" /><stop offset="1" stopColor="#0066FF" /></linearGradient></defs>
                    <path d="M13 3L4 7v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V7L13 3z" />
                    <path d="M9 13l3 3 5-5" />
                  </svg>
                ),
              },
            ].map((p) => (
              <div key={p.title} style={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,.07)",
                background: "rgba(255,255,255,.03)",
                padding: "1.25rem 1rem",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, margin: "0 auto .8rem",
                  background: "rgba(0,229,255,.08)",
                  border: "1px solid rgba(0,229,255,.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {p.icon}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: ".92rem", marginBottom: ".4rem" }}>{p.title}</div>
                <div style={{ color: "var(--muted)", fontSize: ".82rem", lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:info@aiflux.hu"
            className="btn-shine btn-glow"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".6rem",
              background: "linear-gradient(90deg, var(--cyan), var(--blue))",
              color: "#000", fontWeight: 700,
              padding: ".95rem 2.4rem",
              borderRadius: 6, fontSize: ".95rem",
              textDecoration: "none",
              letterSpacing: ".04em",
              fontFamily: "var(--font-heading)",
              boxShadow: "0 0 32px rgba(0,229,255,.2)",
            }}
          >
            Meséld el az ötletedet
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
