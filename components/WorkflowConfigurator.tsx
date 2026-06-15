"use client";
import { useState, useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { workflows, categories, type Workflow } from "@/data/workflows";
import { plans, formatPrice } from "@/data/plans";
import PlanIcon from "@/components/PlanIcon";

const CAT_RGB: Record<string, string> = {
  Elemzés: "0,153,255",
  Kommunikáció: "0,229,255",
  Értékesítés: "124,58,237",
  Admin: "5,150,105",
};

// Egér-követő spotlight pozíció
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// Folyamat-ikonok (emoji helyett SVG vonal-ikonok, 24×24 viewBox)
const wfIcons: Record<string, ReactNode> = {
  chart:     <><path d="M3 3v18h18" /><path d="M8 17v-6M13 17V7M18 17v-3" /></>,
  bot:       <><rect x="5" y="8" width="14" height="11" rx="2" /><path d="M12 8V5" /><circle cx="12" cy="3.5" r="1.5" /><path d="M9.5 13h.01M14.5 13h.01" /><path d="M2 12v4M22 12v4" /></>,
  mail:      <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  target:    <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  inbox:     <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
  doc:       <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" /></>,
  handshake: <><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" /></>,
  invoice:   <><path d="M5 2h14v20l-2.3-1.6L14.4 22l-2.4-1.6L9.6 22l-2.3-1.6L5 22V2z" /><path d="M9 8h6M9 12h6" /></>,
  social:    <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="8" cy="10" r="1.5" /><path d="M10.5 10h5M10.5 13h5M8 13h.01" /></>,
  calendar:  <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /><path d="M8 14h.01M12 14h.01M16 14h.01" /></>,
};

function WfIcon({ name, rgb }: { name: string; rgb: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={`rgba(${rgb},.85)`}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {wfIcons[name]}
    </svg>
  );
}

export default function WorkflowConfigurator() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedWorkflows, setSelectedWorkflows] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("Összes");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeCategory]);

  function toggleWorkflow(w: Workflow) {
    if (w.status === "soon") return;
    setSelectedWorkflows((prev) => {
      const next = new Set(prev);
      if (next.has(w.id)) {
        next.delete(w.id);
      } else {
        next.add(w.id);
      }
      return next;
    });
  }

  const filtered = activeCategory === "Összes"
    ? workflows
    : workflows.filter((w) => w.category === activeCategory);

  const chosenPlan = plans.find((p) => p.id === selectedPlan) ?? null;
  const chosenWorkflows = workflows.filter((w) => selectedWorkflows.has(w.id));
  const totalSelected = (selectedPlan ? 1 : 0) + selectedWorkflows.size;

  function requestQuote() {
    const planLine = chosenPlan
      ? `Kiválasztott csomag: ${chosenPlan.name} - ${formatPrice(chosenPlan.price)} egyszeri, ${formatPrice(chosenPlan.monthly)}/hó`
      : "";
    const wfLines = chosenWorkflows.length > 0
      ? `Plusz termékek:%0A${chosenWorkflows.map((w) => `- ${w.title}`).join("%0A")}`
      : "";
    const body = `Sziasztok!%0A%0A${planLine}${planLine && wfLines ? "%0A%0A" : ""}${wfLines}%0A%0AKérem az ajánlatot!%0A%0AKöszönettel,`;
    window.location.assign(`mailto:info@aiflux.hu?subject=Ajánlatkérés%20|%20AIFlux%20konfigurátor&body=${body}`);
  }

  const planDone = selectedPlan !== null;
  const wfDone = selectedWorkflows.size > 0;

  return (
    <section ref={ref} style={{
      background: "var(--bg)",
      padding: "5rem 0 9rem",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background depth - lassan lebegő orbok */}
      <div className="orb-a" style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,80,200,.055) 0%, transparent 65%)", top: "-20%", left: "55%", pointerEvents: "none" }} />
      <div className="orb-b" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,255,.035) 0%, transparent 70%)", bottom: "15%", left: "2%", pointerEvents: "none" }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,229,255,.065) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black 0%, transparent 100%)",
      }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 6%" }}>

        {/* ── FEJLÉC ── */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            marginBottom: "1.5rem", padding: ".35rem 1.05rem", borderRadius: 100,
            background: "rgba(0,229,255,.06)", border: "1px solid rgba(0,229,255,.2)",
          }}>
            <div className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 6px rgba(0,229,255,.7)" }} />
            <span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--cyan)" }}>
              Konfigurátor
            </span>
          </div>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem,4.5vw,3.2rem)",
            fontWeight: 700, lineHeight: 1.1,
            marginBottom: "1.25rem", letterSpacing: "-.02em",
          }}>
            Rakd össze a{" "}
            <span className="accent-display" style={{ background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              saját csomagodat
            </span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto", fontSize: "1rem", lineHeight: 1.85 }}>
            Válassz alap csomagot, bővítsd egyedi AI termékekkel -
            majd kérj árajánlatot egyszerre mindenre.
          </p>
        </div>

        {/* ── PROGRESS STEPS ── */}
        <div className="reveal" style={{
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          gap: 0, marginBottom: "4rem",
        }}>
          {/* Step 1 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".55rem" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: planDone ? "linear-gradient(135deg,var(--cyan),var(--blue))" : "rgba(0,229,255,.08)",
              border: planDone ? "none" : "1px solid rgba(0,229,255,.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-heading)", fontSize: ".88rem", fontWeight: 800,
              color: planDone ? "#000" : "var(--cyan)",
              transition: "all .4s ease",
              boxShadow: planDone ? "0 0 24px rgba(0,229,255,.3)" : "none",
            }}>
              {planDone ? "✓" : "1"}
            </div>
            <span style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: planDone ? "var(--cyan)" : "rgba(255,255,255,.35)", transition: "color .4s" }}>
              Alap csomag
            </span>
          </div>

          {/* Connector */}
          <div style={{ width: 100, height: 2, margin: "1.35rem 1rem 0", background: "rgba(255,255,255,.06)", borderRadius: 1, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,var(--cyan),var(--blue))", transform: planDone ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .5s ease .1s" }} />
          </div>

          {/* Step 2 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".55rem" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: wfDone ? "linear-gradient(135deg,var(--cyan),var(--blue))" : "rgba(0,229,255,.08)",
              border: wfDone ? "none" : "1px solid rgba(0,229,255,.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-heading)", fontSize: ".88rem", fontWeight: 800,
              color: wfDone ? "#000" : "var(--cyan)",
              transition: "all .4s ease",
              boxShadow: wfDone ? "0 0 24px rgba(0,229,255,.3)" : "none",
            }}>
              {wfDone ? selectedWorkflows.size : "2"}
            </div>
            <span style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: wfDone ? "var(--cyan)" : "rgba(255,255,255,.35)", transition: "color .4s" }}>
              Termékek
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════
            1. ALAP CSOMAG VÁLASZTÓ
        ══════════════════════════════════════ */}
        <div className="reveal" style={{ marginBottom: "5.5rem" }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700 }}>
              <span style={{ color: "var(--cyan)", marginRight: ".55rem", fontWeight: 800 }}>01</span>
              Válassz alap csomagot
              <span style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--muted)", marginLeft: ".6rem" }}>- opcionális</span>
            </h2>
            <Link
              href="/#pricing"
              className="arrow-link"
              style={{ fontSize: ".8rem", color: "var(--cyan)", textDecoration: "none", fontWeight: 600, opacity: .65, transition: "opacity .2s", display: "inline-flex", alignItems: "center", gap: ".4rem" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = ".65")}
            >
              Részletes összehasonlítás
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {plans.map((plan) => {
              const isSel = selectedPlan === plan.id;
              const isHov = hoveredCard === `plan-${plan.id}`;
              return (
                <div
                  key={plan.id}
                  className="spotlight-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlan(isSel ? null : plan.id)}
                  onKeyDown={e => e.key === "Enter" && setSelectedPlan(isSel ? null : plan.id)}
                  onMouseEnter={() => setHoveredCard(`plan-${plan.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onMouseMove={trackSpotlight}
                  style={{
                    position: "relative", borderRadius: 16, padding: "1.75rem 1.5rem",
                    cursor: "pointer", outline: "none",
                    background: isSel
                      ? "linear-gradient(145deg, rgba(0,229,255,.1), rgba(0,102,255,.07))"
                      : isHov ? "rgba(255,255,255,.045)" : "rgba(255,255,255,.025)",
                    border: isSel
                      ? "1px solid rgba(0,229,255,.55)"
                      : plan.highlight ? "1px solid rgba(0,229,255,.2)"
                      : isHov ? "1px solid rgba(255,255,255,.12)" : "1px solid rgba(255,255,255,.07)",
                    transform: isSel ? "translateY(-5px)" : isHov ? "translateY(-2px)" : "none",
                    transition: "border-color .25s ease, box-shadow .25s ease, transform .25s ease, background .25s ease",
                    boxShadow: isSel
                      ? "0 8px 40px rgba(0,229,255,.12)"
                      : isHov ? "0 8px 24px rgba(0,0,0,.3)" : "none",
                  }}
                >
                  {plan.badge && (
                    <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,var(--cyan),var(--blue))", color: "#000", fontSize: ".6rem", fontWeight: 800, padding: ".25rem .9rem", borderRadius: 100, letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {plan.badge}
                    </div>
                  )}

                  {/* Check circle */}
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    width: 24, height: 24, borderRadius: "50%",
                    background: isSel ? "var(--cyan)" : "rgba(255,255,255,.05)",
                    border: isSel ? "none" : "1px solid rgba(255,255,255,.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isSel ? "#000" : "rgba(255,255,255,.15)",
                    fontSize: ".6rem", fontWeight: 900,
                    transition: "all .25s",
                    boxShadow: isSel ? "0 0 12px rgba(0,229,255,.4)" : "none",
                  }}>
                    ✓
                  </div>

                  <div style={{ marginBottom: ".8rem" }}><PlanIcon id={plan.id} highlight={plan.highlight} size={42} /></div>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, marginBottom: ".2rem" }}>{plan.name}</div>
                  <div style={{ fontSize: ".78rem", color: "var(--muted)", marginBottom: "1.1rem" }}>{plan.tagline}</div>

                  <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: "1.1rem" }} />

                  <div style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800,
                    marginBottom: ".2rem",
                    ...(isSel
                      ? { background: "linear-gradient(90deg,var(--cyan),var(--blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                      : { color: "rgba(255,255,255,.85)" }
                    ),
                  }}>
                    {formatPrice(plan.price)}
                  </div>
                  <div style={{ fontSize: ".75rem", color: "var(--muted)", marginBottom: "1.1rem" }}>
                    egyszeri ·{" "}
                    <span style={{ color: isSel ? "var(--cyan)" : "rgba(255,255,255,.35)" }}>
                      +{formatPrice(plan.monthly)}/hó
                    </span>
                  </div>

                  <ul style={{ listStyle: "none" }}>
                    {plan.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".45rem", padding: ".22rem 0", fontSize: ".8rem", color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
                        <span style={{ color: "var(--cyan)", flexShrink: 0, fontSize: ".68rem", marginTop: 2 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "1.1rem", fontSize: ".73rem", fontWeight: 600, color: isSel ? "rgba(0,229,255,.65)" : "rgba(255,255,255,.18)", transition: "color .25s", letterSpacing: ".04em" }}>
                    {isSel ? "● Kiválasztva - kattints az eltávolításhoz" : "Kiválasztom →"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════
            2. EGYEDI FOLYAMATOK
        ══════════════════════════════════════ */}
        <div>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 700 }}>
              <span style={{ color: "var(--cyan)", marginRight: ".55rem", fontWeight: 800 }}>02</span>
              Termékeink
              <span style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--muted)", marginLeft: ".6rem" }}>- opcionális</span>
            </h2>
            {wfDone && (
              <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--cyan)", background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.2)", borderRadius: 100, padding: ".28rem .85rem" }}>
                {selectedWorkflows.size} kiválasztva
              </span>
            )}
          </div>

          {/* Kategória szűrő */}
          <div className="reveal" style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: ".4rem 1.1rem", borderRadius: 100, fontFamily: "var(--font-heading)",
                    border: isActive ? "1px solid rgba(0,229,255,.45)" : "1px solid rgba(255,255,255,.1)",
                    background: isActive ? "rgba(0,229,255,.1)" : "transparent",
                    color: isActive ? "var(--cyan)" : "rgba(255,255,255,.45)",
                    fontSize: ".8rem", fontWeight: 600, cursor: "pointer",
                    transition: "all .2s", letterSpacing: ".04em",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.45)"; }}}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Workflow kártyák */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            paddingBottom: totalSelected > 0 ? "7rem" : "0",
            transition: "padding .3s",
          }}>
            {filtered.map((w, i) => {
              const isSel = selectedWorkflows.has(w.id);
              const isSoon = w.status === "soon";
              const isHov = hoveredCard === `wf-${w.id}`;
              const rgb = CAT_RGB[w.category] ?? "0,229,255";
              return (
                <article
                  key={w.id}
                  className={`reveal reveal-scale spotlight-card ${["", "delay-1", "delay-2"][i % 3]}`}
                  onMouseMove={trackSpotlight}
                  role="button"
                  tabIndex={isSoon ? -1 : 0}
                  onClick={() => toggleWorkflow(w)}
                  onKeyDown={e => e.key === "Enter" && toggleWorkflow(w)}
                  onMouseEnter={() => !isSoon && setHoveredCard(`wf-${w.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position: "relative", borderRadius: 16, padding: "1.5rem",
                    background: isSel
                      ? "linear-gradient(145deg, rgba(0,229,255,.09), rgba(0,102,255,.06))"
                      : isHov ? "rgba(255,255,255,.045)" : "rgba(255,255,255,.025)",
                    border: isSel
                      ? "1px solid rgba(0,229,255,.5)"
                      : isHov ? "1px solid rgba(255,255,255,.13)" : "1px solid rgba(255,255,255,.07)",
                    cursor: isSoon ? "default" : "pointer",
                    opacity: isSoon ? 0.42 : 1,
                    transition: "all .22s ease",
                    boxShadow: isSel ? "0 4px 32px rgba(0,229,255,.1)" : isHov ? "0 4px 20px rgba(0,0,0,.25)" : "none",
                    transform: !isSoon && (isSel || isHov) ? "translateY(-3px)" : "none",
                    outline: "none",
                  }}
                >
                  {/* Check badge */}
                  {isSel && (
                    <div style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", background: "var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: ".58rem", fontWeight: 900, boxShadow: "0 0 12px rgba(0,229,255,.45)" }}>✓</div>
                  )}
                  {isSoon && (
                    <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.3)", fontSize: ".6rem", fontWeight: 700, padding: ".2rem .6rem", borderRadius: 100, letterSpacing: ".08em", textTransform: "uppercase" }}>
                      Hamarosan
                    </div>
                  )}

                  {/* Icon + category */}
                  <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1rem" }}>
                    <div className="icon-box" style={{
                      width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                      background: `rgba(${rgb},.08)`,
                      border: `1px solid rgba(${rgb},.2)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <WfIcon name={w.icon} rgb={rgb} />
                    </div>
                    <span style={{ fontSize: ".68rem", fontWeight: 700, color: `rgba(${rgb},.75)`, letterSpacing: ".1em", textTransform: "uppercase" }}>
                      {w.category}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem", letterSpacing: "-.01em", lineHeight: 1.3 }}>
                    {w.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: ".85rem", lineHeight: 1.72, marginBottom: "1rem" }}>
                    {w.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: "1rem" }}>
                    {w.tags.map((tag, j) => (
                      <span key={j} style={{ fontSize: ".7rem", fontWeight: 500, color: "var(--cyan)", background: "rgba(0,229,255,.06)", border: "1px solid rgba(0,229,255,.12)", borderRadius: 100, padding: ".2rem .6rem", letterSpacing: ".03em" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ paddingTop: ".85rem", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: ".82rem", fontWeight: 700, color: isSel ? "var(--cyan)" : "rgba(255,255,255,.3)", transition: "color .2s" }}>
                      {w.priceLabel}
                    </span>
                    {!isSoon && (
                      <span style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".04em", color: isSel ? "var(--cyan)" : isHov ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.18)", transition: "color .2s" }}>
                        {isSel ? "Kiválasztva ●" : "Hozzáad +"}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════
          STICKY ÖSSZESÍTŐ PANEL
      ══════════════════════════════════════ */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        transform: totalSelected > 0 ? "translateY(0)" : "translateY(115%)",
        transition: "transform .4s cubic-bezier(.4,0,.2,1)",
        willChange: "transform",
      }}>
        {/* Top gradient border */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(0,229,255,.55) 30%, rgba(0,102,255,.55) 70%, transparent 100%)" }} />

        <div style={{
          background: "rgba(2,6,24,.96)",
          backdropFilter: "blur(28px)",
          padding: ".95rem 6%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1.5rem", flexWrap: "wrap",
        }}>
          {/* Left: pills */}
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem", flex: 1, minWidth: 0, flexWrap: "wrap" }}>
            <span style={{ fontSize: ".7rem", fontWeight: 600, color: "rgba(255,255,255,.28)", letterSpacing: ".1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Összeállításod:
            </span>

            {chosenPlan && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", background: "rgba(0,229,255,.1)", border: "1px solid rgba(0,229,255,.3)", borderRadius: 100, padding: ".3rem .7rem .3rem .95rem", fontSize: ".82rem", fontWeight: 600, color: "var(--cyan)", whiteSpace: "nowrap" }}>
                {chosenPlan.name}
                <button
                  onClick={() => setSelectedPlan(null)}
                  style={{ background: "rgba(0,229,255,.15)", border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--cyan)", fontSize: ".6rem", flexShrink: 0, lineHeight: 1 }}
                  aria-label={`${chosenPlan.name} eltávolítása`}
                >
                  ✕
                </button>
              </div>
            )}

            {chosenWorkflows.map((w) => (
              <div key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 100, padding: ".3rem .7rem .3rem .95rem", fontSize: ".8rem", fontWeight: 600, color: "rgba(255,255,255,.7)", whiteSpace: "nowrap" }}>
                {w.title}
                <button
                  onClick={() => toggleWorkflow(w)}
                  style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,.5)", fontSize: ".6rem", flexShrink: 0, lineHeight: 1 }}
                  aria-label={`${w.title} eltávolítása`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <button
            onClick={requestQuote}
            className="btn-shine btn-glow arrow-link"
            style={{
              background: "linear-gradient(90deg,var(--cyan),var(--blue))",
              color: "#000", fontFamily: "var(--font-heading)",
              fontWeight: 800, fontSize: ".9rem", letterSpacing: ".04em",
              padding: ".82rem 2.2rem", borderRadius: 10, border: "none",
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              display: "flex", alignItems: "center", gap: ".55rem",
              boxShadow: "0 0 28px rgba(0,229,255,.25), 0 4px 16px rgba(0,0,0,.5)",
              transition: "box-shadow .25s, transform .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 44px rgba(0,229,255,.4), 0 4px 24px rgba(0,0,0,.6)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,255,.25), 0 4px 16px rgba(0,0,0,.5)"; e.currentTarget.style.transform = "none"; }}
          >
            Ajánlatot kérek
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
}
