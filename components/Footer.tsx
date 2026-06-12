"use client";
import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    title: "LinkedIn",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 7.2a3 3 0 0 0-2.1-2.13C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.4.52A3 3 0 0 0 .5 7.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      aria-label="Lábléc"
      style={{ background: "#000", borderTop: "1px solid rgba(0,229,255,.08)", padding: "3.5rem 6% 2rem", position: "relative", zIndex: 1 }}>

      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <Link href="/#hero" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "1rem" }}>
            <Image src="/logo.png" alt="AI Flux logo"
                width={0} height={0} sizes="100vw"
                style={{ width: "auto", height: "32px" }} />
          </Link>
          <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.8, maxWidth: 280 }}>
            Magyar AI-natív fejlesztő ügynökség. Intelligens weboldalak, automatizált folyamatok és chatbot rendszerek - a jövő eszközei, ma.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".12em", color: "var(--cyan)", marginBottom: "1.2rem", textTransform: "uppercase" }}>
            Navigáció
          </h3>
          <ul style={{ listStyle: "none" }}>
            {[["Szolgáltatások","/#services"],["Folyamatunk","/#process"],["Miért mi?","/#stats"],["Kapcsolat","/#contact"]].map(([l,h]) => (
              <li key={l} style={{ marginBottom: ".55rem" }}>
                <Link href={h} style={{ color: "var(--muted)", textDecoration: "none", fontSize: ".88rem", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                  {l}
                </Link>
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
          {socials.map(({ title, href, icon }) => (
            <a key={title} href={href} title={title} aria-label={title}
              style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.4)", textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,255,.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.4)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
