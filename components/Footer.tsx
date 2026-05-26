"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact"
      aria-label="Lábléc"
      style={{ background: "#000", borderTop: "1px solid rgba(0,229,255,.08)", padding: "3.5rem 6% 2rem", position: "relative", zIndex: 1 }}>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <a href="#hero" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "1rem" }}>
            <Image src="/logo.png" alt="AI Flux logo"
                width={0} height={0} sizes="100vw"
                style={{ width: "auto", height: "32px" }} />
          </a>
          <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, maxWidth: 280 }}>
            Magyar AI-natív fejlesztő ügynökség. Intelligens weboldalak, automatizált folyamatok és chatbot rendszerek — a jövő eszközei, ma.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", color: "var(--cyan)", marginBottom: "1.2rem", textTransform: "uppercase" }}>
            Navigáció
          </h3>
          <ul style={{ listStyle: "none" }}>
            {[["Szolgáltatások","#services"],["Folyamatunk","#process"],["Miért mi?","#stats"],["Kapcsolat","#contact"]].map(([l,h]) => (
              <li key={l} style={{ marginBottom: ".55rem" }}>
                <a href={h} style={{ color: "var(--muted)", textDecoration: "none", fontSize: ".88rem", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", color: "var(--cyan)", marginBottom: "1.2rem", textTransform: "uppercase" }}>
            Kapcsolat
          </h3>
          <ul style={{ listStyle: "none" }}>
            {[["info@aiflux.hu","mailto:info@aiflux.hu"],["ÁSZF","#"],["Adatvédelmi irányelvek","#"],["Cookie szabályzat","#"]].map(([l,h]) => (
              <li key={l} style={{ marginBottom: ".55rem" }}>
                <a href={h} style={{ color: "var(--muted)", textDecoration: "none", fontSize: ".88rem", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ color: "rgba(255,255,255,.25)", fontSize: ".82rem" }}>
          © 2026 AI Flux · aiflux.hu · Minden jog fenntartva.
        </p>
        <div style={{ display: "flex", gap: ".75rem" }}>
          {[["LinkedIn","in"],["Instagram","ig"],["YouTube","yt"]].map(([title, s]) => (
            <a key={s} href="#" title={title} style={{ width: 34, height: 34, border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.35)", textDecoration: "none", fontSize: ".8rem", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.35)"; }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
