"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Feltérképezés",
    sub: "1–2 nap",
    desc: "Ingyenes konzultáción megismerjük a vállalkozásodat, a fájdalompontjaidat és a céljaidat. Nem általános kérdéseket teszünk fel — konkrétan elemezzük, hol tud az AI a legtöbbet hozzáadni.",
  },
  {
    num: "02",
    title: "Tervezés & Építés",
    sub: "3–5 hét",
    desc: "AI-asszisztált fejlesztési folyamatunkkal akár háromszor gyorsabban szállítjuk az eredményt — a minőség feláldozása nélkül. Rendszeresen mutatunk haladást, nem csak az átadásnál.",
  },
  {
    num: "03",
    title: "Élesítés & Növekedés",
    sub: "Folyamatos",
    desc: "Az átadás után sem hagyjuk magadra. Monitorozzuk a rendszert, finomhangoljuk az AI-t és segítünk kihozni belőle a maximumot — mert az igazi értéket az jelenti, ha az eredmény tartós.",
  },
];

export default function Process() {
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
    <section id="process" ref={ref}
      aria-label="Munkafolyamatunk"
      style={{ background: "var(--bg2)", padding: "5rem 6% 7rem" }}>

      <div className="reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Hogyan dolgozunk?
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Átlátható folyamat,{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            kiszámítható eredmény
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Nem szeretjük a meglepetéseket. Minden lépést előre kommunikálunk — te mindig tudod, hol tartunk.
        </p>
      </div>

      <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", maxWidth: 960, margin: "0 auto", position: "relative" }}>
        <div className="process-line reveal-line reveal" style={{ position: "absolute", top: 36, left: "calc(16.67% + 24px)", right: "calc(16.67% + 24px)", height: 1, background: "linear-gradient(90deg,var(--cyan),var(--mid),var(--blue))", zIndex: 0, boxShadow: "0 0 12px rgba(0,229,255,.35)" }} />

        {steps.map((s, i) => (
          <div key={i} className={`reveal ${["", "delay-1", "delay-2"][i]}`}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}>

            <div className="step-circle" style={{ width: 72, height: 72, border: "2px solid rgba(0,229,255,.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", background: "var(--bg2)", transition: "all .35s", animationDelay: `${i * 0.9}s` }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--cyan)"; el.style.background = "rgba(0,229,255,.08)"; el.style.boxShadow = "0 0 28px rgba(0,229,255,.28)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(0,229,255,.25)"; el.style.background = "var(--bg2)"; el.style.boxShadow = "none"; }}>
              {s.num}
            </div>

            <div style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--mid)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem" }}>
              {s.sub}
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, marginBottom: ".75rem" }}>
              {s.title}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.75 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
