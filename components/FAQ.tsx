"use client";
import { useEffect, useRef, useState } from "react";
import { faqs } from "@/lib/faq-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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
      id="faq"
      ref={ref}
      aria-label="Gyakori kérdések"
      style={{ background: "var(--bg2)", padding: "5rem 6% 7rem" }}
    >
      <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{ fontSize: ".74rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "1rem" }}>
          Kérdések & Válaszok
        </p>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.15 }}>
          Amit a legtöbben{" "}
          <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            megkérdeznek tőlünk
          </span>
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "1rem", lineHeight: 1.8 }}>
          Nem találod a választ? Írj az{" "}
          <a href="mailto:info@aiflux.hu" style={{ color: "var(--cyan)", textDecoration: "none" }}>info@aiflux.hu</a>
          {" "}címre vagy{" "}
          <a href="/foglalas" style={{ color: "var(--cyan)", textDecoration: "none" }}>foglalj ingyenes konzultációt</a>.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`reveal ${i < 5 ? ["", "delay-1", "delay-2", "delay-1", "delay-2"][i] : ""}`}
              style={{
                borderRadius: 12,
                border: isOpen ? "1px solid rgba(0,229,255,.3)" : "1px solid rgba(255,255,255,.07)",
                background: isOpen ? "rgba(0,229,255,.04)" : "rgba(255,255,255,.02)",
                overflow: "hidden",
                transition: "border-color .25s, background .25s",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", textAlign: "left",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                  padding: "1.1rem 1.4rem",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-heading)", fontSize: ".97rem", fontWeight: 600,
                  color: isOpen ? "var(--cyan)" : "rgba(255,255,255,.9)",
                  transition: "color .25s",
                }}
              >
                {item.q}
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={isOpen ? "var(--cyan)" : "rgba(255,255,255,.4)"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: 0, transition: "transform .3s, stroke .25s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>

              <div style={{
                maxHeight: isOpen ? 300 : 0,
                overflow: "hidden",
                transition: "max-height .35s cubic-bezier(.22,1,.36,1)",
              }}>
                <p style={{
                  padding: "0 1.4rem 1.2rem",
                  color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.8,
                  margin: 0,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
