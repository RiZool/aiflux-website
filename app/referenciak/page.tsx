import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatBadge from "@/components/StatBadge";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Referenciák | AI Flux - esettanulmányok valós AI-projektekről",
  description:
    "Valós AI-projektek a gyakorlatban: milyen problémával kerestek meg, hogyan oldottuk meg, és mennyi időt spórolt vele az ügyfél. Chatbot, social media automatizálás és további megoldások.",
  alternates: { canonical: "https://aiflux.hu/referenciak" },
  openGraph: {
    title: "Referenciák | AI Flux",
    description:
      "Valós AI-projektek a gyakorlatban: problémától a megoldásig, mérhető eredménnyel.",
    url: "https://aiflux.hu/referenciak",
    siteName: "AI Flux",
    locale: "hu_HU",
    type: "website",
  },
};

export default function ReferenciakPage() {
  return (
    <main>
      <Navbar />

      <div style={{ paddingTop: "72px", position: "relative", overflow: "hidden" }}>
        {/* Háttér rács */}
        <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

        {/* ── Fejléc ─────────────────────────────────────────── */}
        <header
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 980,
            margin: "0 auto",
            padding: "5rem 5% 3rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: ".78rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              border: "1px solid var(--glass-border)",
              borderRadius: 999,
              padding: ".35rem 1rem",
              marginBottom: "1.4rem",
            }}
          >
            Referenciák
          </span>
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 1.1rem",
              letterSpacing: "-.02em",
            }}
          >
            Valós AI-projektek, <span className="gradient-text">valódi eredménnyel</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--muted)", maxWidth: 680, margin: "0 auto", lineHeight: 1.65 }}>
            Minden esettanulmány ugyanazt a kérdést járja körül: milyen problémával kerestek meg,
            hogyan oldottuk meg, és mennyi időt-energiát spórolt vele az ügyfél.
          </p>
        </header>

        {/* ── Kártyák ────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1080,
            margin: "0 auto",
            padding: "1rem 5% 6rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.6rem",
          }}
        >
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/referenciak/${cs.slug}`}
              className="glass-card spotlight-card"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.7rem 1.6rem 1.5rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span
                  style={{
                    fontSize: ".72rem",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--cyan)",
                    background: "rgba(0,229,255,.08)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: 6,
                    padding: ".25rem .6rem",
                  }}
                >
                  {cs.industry}
                </span>
                {cs.badge && <StatBadge value={cs.badge.value} unit={cs.badge.unit} label={cs.badge.label} />}
              </div>

              <div style={{ fontSize: ".82rem", color: "var(--muted)", marginBottom: ".5rem" }}>{cs.client}</div>

              <h2
                className="font-heading"
                style={{ fontSize: "1.18rem", fontWeight: 700, lineHeight: 1.3, margin: "0 0 .7rem", letterSpacing: "-.01em" }}
              >
                {cs.title}
              </h2>

              <p style={{ fontSize: ".92rem", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1.2rem", flex: 1 }}>
                {cs.excerpt}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1.1rem" }}>
                {cs.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: ".72rem",
                      color: "rgba(255,255,255,.7)",
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: 5,
                      padding: ".22rem .55rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span
                className="arrow-link"
                style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--cyan)", fontSize: ".9rem", fontWeight: 600 }}
              >
                Esettanulmány megtekintése
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </section>
      </div>

      <Footer />
    </main>
  );
}
