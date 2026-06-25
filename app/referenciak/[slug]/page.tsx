import type { Metadata } from "next";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { caseStudies, getCaseStudy } from "@/data/case-studies";

const BASE_URL = "https://aiflux.hu";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Esettanulmány nem található | AI Flux" };
  const url = `${BASE_URL}/referenciak/${cs.slug}`;
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: cs.metaTitle,
      description: cs.metaDescription,
      url,
      siteName: "AI Flux",
      locale: "hu_HU",
      type: "article",
      ...(cs.heroImage ? { images: [{ url: cs.heroImage.src, alt: cs.heroImage.alt }] } : {}),
    },
  };
}

const SECTION = { maxWidth: 1040, margin: "0 auto", padding: "0 5%" } as const;
const H2 = {
  fontSize: "clamp(1.4rem, 3.2vw, 1.9rem)",
  fontWeight: 700,
  letterSpacing: "-.01em",
  margin: "0 0 1.1rem",
} as const;
const P = { fontSize: "1.02rem", color: "rgba(255,255,255,.82)", lineHeight: 1.75, margin: "0 0 1rem", maxWidth: 860 } as const;

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const url = `${BASE_URL}/referenciak/${cs.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.metaDescription,
    inLanguage: "hu-HU",
    datePublished: cs.published,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "AI Flux", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "AI Flux",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    about: cs.client,
    ...(cs.heroImage ? { image: `${BASE_URL}${cs.heroImage.src}` } : {}),
  };

  const publishedHu = new Date(cs.published).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article style={{ paddingTop: "72px", position: "relative", overflow: "hidden" }}>
        {/* Háttér rács */}
        <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0, height: 520, zIndex: 0 }} />

        {/* ── Hero ───────────────────────────────────────────── */}
        <header style={{ position: "relative", zIndex: 1, ...SECTION, paddingTop: "3.5rem", paddingBottom: "2.5rem" }}>
          <Link
            href="/referenciak"
            className="arrow-link"
            style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--muted)", fontSize: ".85rem", textDecoration: "none", marginBottom: "1.6rem" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Összes referencia
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", alignItems: "center", marginBottom: "1.1rem" }}>
            <span style={{ fontSize: ".74rem", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,229,255,.08)", border: "1px solid var(--glass-border)", borderRadius: 6, padding: ".26rem .65rem" }}>
              {cs.industry}
            </span>
            <span style={{ fontSize: ".85rem", color: "var(--muted)" }}>{cs.client}</span>
          </div>

          <h1 className="font-heading" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-.02em", margin: "0 0 1rem" }}>
            {cs.title}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.65, margin: "0 0 1.4rem", maxWidth: 820 }}>{cs.excerpt}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem", alignItems: "center" }}>
            {cs.tags.map((t) => (
              <span key={t} style={{ fontSize: ".74rem", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 5, padding: ".24rem .6rem" }}>
                {t}
              </span>
            ))}
            <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", marginLeft: ".3rem" }}>{publishedHu}</span>
          </div>

          {cs.heroImage && (
            <div className="glass-card" style={{ marginTop: "2.2rem", padding: 0, overflow: "hidden" }}>
              <ZoomableImage src={cs.heroImage.src} alt={cs.heroImage.alt} width={cs.heroImage.width ?? 1600} height={cs.heroImage.height ?? 1000} priority sizes="(max-width: 1040px) 100vw, 1040px" />
            </div>
          )}
        </header>

        {/* ── A kihívás ──────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
          <h2 className="font-heading" style={H2}>A kihívás</h2>
          {cs.challenge.map((p, i) => (
            <p key={i} style={P}>{p}</p>
          ))}
        </section>

        {/* ── A megoldás ─────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
          <h2 className="font-heading" style={{ ...H2 }}>
            A <span className="gradient-text">megoldás</span>
          </h2>
          {cs.solution.map((p, i) => (
            <p key={i} style={P}>{p}</p>
          ))}
        </section>

        {/* ── Hogyan működik ─────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
          <h2 className="font-heading" style={H2}>Hogyan működik?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: ".4rem" }}>
            {cs.howItWorks.map((step, i) => (
              <div key={i} className="glass-card" style={{ display: "flex", gap: "1rem", padding: "1.25rem 1.4rem", alignItems: "flex-start" }}>
                <div className="font-heading stat-num" style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1, minWidth: 32 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, margin: "0 0 .35rem" }}>{step.title}</h3>
                  <p style={{ fontSize: ".94rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Eredmények ─────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
          <h2 className="font-heading" style={H2}>Az eredmény</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", margin: "0 0 1.6rem" }}>
            {cs.metrics.map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: "1.4rem 1.2rem", textAlign: "center" }}>
                <div className="font-heading stat-num" style={{ fontSize: "2.1rem", fontWeight: 700, lineHeight: 1, marginBottom: ".5rem" }}>
                  {m.value}
                </div>
                <div style={{ fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
          {cs.resultsBody.map((p, i) => (
            <p key={i} style={P}>{p}</p>
          ))}
        </section>

        {/* ── Videó (opcionális) ─────────────────────────────── */}
        {cs.video && (
          <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
            <h2 className="font-heading" style={H2}>Bemutató</h2>
            <div className="glass-card" style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
              <iframe
                src={cs.video.url}
                title={cs.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </section>
        )}

        {/* ── Galéria (opcionális) ───────────────────────────── */}
        {cs.gallery && cs.gallery.length > 0 && (
          <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "2.5rem" }}>
            <h2 className="font-heading" style={H2}>Képek a rendszerről</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {cs.gallery.map((img, i) => (
                <figure key={i} className="glass-card" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
                  <ZoomableImage src={img.src} alt={img.alt} width={img.width ?? 800} height={img.height ?? 600} sizes="(max-width: 760px) 100vw, 500px" />
                  {img.caption && (
                    <figcaption style={{ fontSize: ".8rem", color: "var(--muted)", padding: ".7rem .9rem" }}>{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Tech stack ─────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "3rem" }}>
          <h2 className="font-heading" style={{ ...H2, fontSize: "1.2rem" }}>Felhasznált technológiák</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
            {cs.techStack.map((t) => (
              <span key={t} style={{ fontSize: ".84rem", color: "rgba(255,255,255,.8)", background: "var(--glass)", border: "1px solid var(--glass-border)", borderRadius: 6, padding: ".35rem .8rem" }}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1, ...SECTION, paddingBottom: "5rem" }}>
          <div className="glass-card" style={{ padding: "2.4rem 2rem", textAlign: "center" }}>
            <h2 className="font-heading" style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", fontWeight: 700, margin: "0 0 .8rem", letterSpacing: "-.01em" }}>
              Hasonló megoldást szeretnél?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.6, margin: "0 auto 1.6rem", maxWidth: 520 }}>
              Mondd el, milyen folyamatot szeretnél automatizálni - egy ingyenes, 30 perces konzultáción végigvesszük.
            </p>
            <Link
              href="/foglalas"
              className="btn-shine btn-glow"
              style={{ display: "inline-block", background: "linear-gradient(90deg,var(--cyan),var(--blue))", color: "#000", fontWeight: 700, padding: ".9rem 2.2rem", borderRadius: 6, fontSize: "1rem", textDecoration: "none", letterSpacing: ".03em" }}
            >
              Ingyenes konzultációt kérek →
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
