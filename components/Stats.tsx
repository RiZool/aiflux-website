"use client";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix, fixed }: { target?: number; suffix?: string; fixed?: string }) {
  const [val, setVal] = useState(fixed ?? ("0" + (suffix ?? "")));
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (fixed) return; // fix érték - a useState már beállította
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const duration = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart - a vége felé lassul
        setVal(Math.round(eased * (target ?? 0)) + (suffix ?? ""));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [target, suffix, fixed]);

  return (
    <div ref={ref} className="stat-num"
      style={{ fontFamily: "var(--font-display), var(--font-heading)", fontSize: "clamp(1.7rem,3.4vw,2.5rem)", fontWeight: 700, lineHeight: 1, marginBottom: ".6rem", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
      {val}
    </div>
  );
}

const stats = [
  { target: 10,  suffix: "×",  label: "Gyorsabb fejlesztés", sub: "AI-asszisztált munkamenettel" },
  { target: 40,  suffix: "%",  label: "Kevesebb operatív teher", sub: "automatizált folyamatok után" },
  { fixed: "24/7",             label: "Rendelkezésre állás",  sub: "az AI-rendszered soha nem alszik" },
  { target: 100, suffix: "%",  label: "Egyedi megoldás",      sub: "nincs sablon, csak célirányos build" },
];

export default function Stats() {
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
    <section id="stats" ref={ref}
      aria-label="Eredményeink számokban"
      style={{ background: "var(--bg3)", padding: "5rem 6% 7rem", position: "relative", overflow: "hidden" }}>

      <div style={{ position: "absolute", width: 700, height: 700, background: "radial-gradient(circle,rgba(0,102,255,.06) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Miért érdemes velünk dolgozni?
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Mérhetően{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            jobb eredmények
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Az AI nem varázslat - mérhető. Ügyfeleink valós adatain alapuló számok.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "2px", maxWidth: 960, margin: "0 auto", border: "1px solid rgba(0,229,255,.1)", borderRadius: 16, overflow: "hidden" }}>
        {stats.map((s, i) => (
          <div key={i} className={`reveal ${["", "delay-1", "delay-2", "delay-3"][i]}`}
            style={{ background: "rgba(0,229,255,.03)", padding: "2.8rem 1.25rem", textAlign: "center", transition: "background .3s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,229,255,.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,229,255,.03)")}>
            <CountUp target={s.target} suffix={s.suffix} fixed={s.fixed} />
            <div style={{ fontWeight: 600, fontSize: ".95rem", marginBottom: ".35rem", color: "#fff" }}>
              {s.label}
            </div>
            <div style={{ color: "var(--muted)", fontSize: ".8rem", lineHeight: 1.5 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
