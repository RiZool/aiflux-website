import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  setupPrice,
  monthlyPrice,
  setupIncludes,
  monthlyIncludes,
  clientProvides,
  addons,
  comparison,
  goodToKnow,
  priceNote,
} from "@/data/social-bot-details";

const BASE_URL = "https://aiflux.hu";

export const metadata: Metadata = {
  title: "Social Media Automatizáló - árak és részletek | AI Flux",
  description:
    "Mi van benne a Social Media Automatizáló havidíjában és mi nem: karbantartás, hibajavítás, token-újragenerálás, havi 8 poszt. Bővítmények tételes árral - reklámanimációk, Brand Kit, új platform bekötése.",
  alternates: { canonical: `${BASE_URL}/folyamatok/social-media-auto` },
  openGraph: {
    title: "Social Media Automatizáló - árak és részletek | AI Flux",
    description:
      "Tételes árlap: mit fedez a havidíj, mit nem, és mennyibe kerülnek a bővítmények.",
    url: `${BASE_URL}/folyamatok/social-media-auto`,
    siteName: "AI Flux",
    locale: "hu_HU",
    type: "website",
  },
};

const SECTION = { maxWidth: 1040, margin: "0 auto", padding: "0 5%" } as const;
const H2 = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
  fontWeight: 700,
  letterSpacing: "-.01em",
  margin: "0 0 1.4rem",
} as const;
const P = {
  fontSize: "1rem",
  color: "rgba(255,255,255,.78)",
  lineHeight: 1.75,
  margin: "0 0 1rem",
  maxWidth: 820,
} as const;

/* Pipa és x ikon a listákhoz */
function Tick({ ok }: { ok: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ok ? "var(--cyan)" : "rgba(255,255,255,.28)"}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: ".28rem" }}
    >
      {ok ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
    </svg>
  );
}

function List({ items, ok = true }: { items: string[]; ok?: boolean }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: ".72rem" }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: "flex", gap: ".7rem", alignItems: "flex-start" }}>
          <Tick ok={ok} />
          <span style={{ fontSize: ".95rem", lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SocialBotDetailsPage() {
  return (
    <main>
      <Navbar />

      {/* ══ FEJLÉC ══ */}
      <section style={{ background: "var(--bg2)", padding: "8rem 0 3.5rem" }}>
        <div style={SECTION}>
          <Link
            href="/folyamatok"
            style={{
              display: "inline-block",
              fontSize: ".8rem",
              fontWeight: 600,
              color: "var(--cyan)",
              textDecoration: "none",
              marginBottom: "1.4rem",
            }}
          >
            ← Vissza a termékekhez
          </Link>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.9rem, 4.4vw, 2.9rem)",
              fontWeight: 700,
              letterSpacing: "-.02em",
              lineHeight: 1.15,
              margin: "0 0 1.1rem",
            }}
          >
            Social Media Automatizáló
            <br />
            <span
              style={{
                background: "linear-gradient(90deg,var(--cyan),var(--blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              árak és részletek
            </span>
          </h1>

          <p style={{ ...P, marginBottom: "2rem" }}>
            Itt tételesen leírjuk, mit fedez a havidíj, mit nem, és mennyibe kerül minden bővítmény.
            Nincs csillag a szerződésben - ha valami külön pénz, az itt szerepel.
          </p>

          {/* Ár-csipek */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem" }}>
            {[
              { label: "Egyszeri beüzemelés", value: setupPrice },
              { label: "Havidíj", value: monthlyPrice },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  borderRadius: 14,
                  padding: "1rem 1.4rem",
                  background: "linear-gradient(145deg, rgba(0,229,255,.09), rgba(0,102,255,.05))",
                  border: "1px solid rgba(0,229,255,.28)",
                }}
              >
                <div
                  style={{
                    fontSize: ".7rem",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.45)",
                    marginBottom: ".35rem",
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 700, color: "var(--cyan)" }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: ".8rem", color: "rgba(255,255,255,.4)", margin: "1rem 0 0" }}>{priceNote}</p>
        </div>
      </section>

      {/* ══ MI VAN AZ ÁRBAN ══ */}
      <section style={{ background: "var(--bg)", padding: "4rem 0" }}>
        <div style={SECTION}>
          <h2 style={H2}>Mi van az árban</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {[
              { title: "Az egyszeri díjban", price: setupPrice, items: setupIncludes },
              { title: "A havidíjban", price: monthlyPrice, items: monthlyIncludes },
            ].map((col) => (
              <div
                key={col.title}
                style={{
                  borderRadius: 16,
                  padding: "1.6rem",
                  background: "rgba(255,255,255,.025)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div style={{ marginBottom: "1.3rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      margin: "0 0 .3rem",
                    }}
                  >
                    {col.title}
                  </h3>
                  <span style={{ fontSize: ".92rem", fontWeight: 700, color: "var(--cyan)" }}>{col.price}</span>
                </div>
                <List items={col.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AMIT TŐLED KÉRÜNK ══ */}
      <section style={{ background: "var(--bg2)", padding: "4rem 0" }}>
        <div style={SECTION}>
          <h2 style={H2}>Amit tőled kérünk</h2>
          <p style={P}>
            A rendszer a te valós termékeidből és fotóidból dolgozik - ezért néhány dolgot tőled kell megkapnunk.
            Ha valamelyik nincs meg, azt is meg tudjuk csinálni, a bővítményeknél megtalálod az árát.
          </p>
          <div
            style={{
              borderRadius: 16,
              padding: "1.6rem",
              background: "rgba(255,255,255,.025)",
              border: "1px solid rgba(255,255,255,.08)",
              marginTop: "1.4rem",
            }}
          >
            <List items={clientProvides} />
          </div>
        </div>
      </section>

      {/* ══ BŐVÍTMÉNYEK ══ */}
      <section style={{ background: "var(--bg)", padding: "4rem 0" }}>
        <div style={SECTION}>
          <h2 style={H2}>Bővítmények - ami nincs az alapdíjban</h2>
          <p style={{ ...P, marginBottom: "1.8rem" }}>
            Ezek mind opcionálisak. Az alaprendszer nélkülük is teljes értékű: posztol, ütemez és statisztikát ad.
          </p>

          <div style={{ display: "grid", gap: ".8rem" }}>
            {addons.map((a) => (
              <div
                key={a.label}
                style={{
                  borderRadius: 14,
                  padding: "1.2rem 1.4rem",
                  background: a.highlight
                    ? "linear-gradient(145deg, rgba(0,229,255,.08), rgba(0,102,255,.04))"
                    : "rgba(255,255,255,.025)",
                  border: a.highlight ? "1px solid rgba(0,229,255,.3)" : "1px solid rgba(255,255,255,.07)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      margin: "0 0 .35rem",
                    }}
                  >
                    {a.label}
                  </h3>
                  {a.desc && (
                    <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
                  )}
                  {a.includes && (
                    <ul
                      style={{
                        listStyle: "none",
                        margin: ".9rem 0 0",
                        padding: 0,
                        display: "grid",
                        gap: ".5rem",
                      }}
                    >
                      {a.includes.map((t, k) => (
                        <li key={k} style={{ display: "flex", gap: ".55rem", alignItems: "flex-start" }}>
                          <Tick ok />
                          <span style={{ fontSize: ".85rem", lineHeight: 1.55, color: "rgba(255,255,255,.74)" }}>{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {a.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PIACI ÖSSZEHASONLÍTÁS ══ */}
      <section style={{ background: "var(--bg2)", padding: "4rem 0" }}>
        <div style={SECTION}>
          <h2 style={H2}>Mennyi ez a piacon?</h2>
          <p style={{ ...P, marginBottom: "1.8rem" }}>
            Magyar ügynökségek és videóstúdiók 2026-os nyilvános árai alapján. Nem azért vagyunk olcsóbbak,
            mert kevesebbet adunk - hanem mert nem forgatócsoporttal és kézi utómunkával dolgozunk.
          </p>

          <div style={{ display: "grid", gap: ".8rem" }}>
            {comparison.map((c) => (
              <div
                key={c.what}
                style={{
                  borderRadius: 14,
                  padding: "1.2rem 1.4rem",
                  background: "rgba(255,255,255,.025)",
                  border: "1px solid rgba(255,255,255,.07)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: ".8rem 1.6rem",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: ".97rem", fontWeight: 600, flex: "1 1 220px" }}>{c.what}</span>
                  <span style={{ fontSize: ".9rem", color: "rgba(255,255,255,.45)", textDecoration: "line-through" }}>
                    {c.market}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      color: "var(--cyan)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.ours}
                  </span>
                </div>
                {c.note && (
                  <p
                    style={{
                      fontSize: ".85rem",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                      margin: ".9rem 0 0",
                      paddingTop: ".9rem",
                      borderTop: "1px solid rgba(255,255,255,.06)",
                    }}
                  >
                    {c.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ JÓ TUDNI ══ */}
      <section style={{ background: "var(--bg)", padding: "4rem 0" }}>
        <div style={SECTION}>
          <h2 style={H2}>Jó tudni</h2>
          <div
            style={{
              borderRadius: 16,
              padding: "1.6rem",
              background: "rgba(255,255,255,.025)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: ".9rem" }}>
              {goodToKnow.map((t, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: ".93rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,.78)",
                    paddingLeft: "1rem",
                    borderLeft: "2px solid rgba(0,229,255,.3)",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ REFERENCIA + CTA ══ */}
      <section style={{ background: "var(--bg2)", padding: "4rem 0 5.5rem" }}>
        <div style={{ ...SECTION, textAlign: "center" }}>
          <h2 style={{ ...H2, marginBottom: "1rem" }}>Nézd meg működés közben</h2>
          <p style={{ ...P, margin: "0 auto 2rem" }}>
            A SomaFix Magyarországnál mindhárom szint éles: az automata posztolás, a kabalafigura és a
            reklámanimációk is. Az esettanulmányokban a kész anyagok is megnézhetők.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem", justifyContent: "center", marginBottom: "2.5rem" }}>
            {[
              { href: "/referenciak/somafix-social-media-automatizalas", label: "Social automatizálás" },
              { href: "/referenciak/somafix-soma-kabalafigura", label: "SOMA kabalafigura" },
              { href: "/referenciak/somafix-soma-reklamanimaciok", label: "Reklámanimációk" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                style={{
                  fontSize: ".88rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,.82)",
                  textDecoration: "none",
                  padding: ".6rem 1.1rem",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                {r.label} →
              </Link>
            ))}
          </div>

          <Link
            href="/foglalas"
            className="btn-shine btn-glow"
            style={{
              display: "inline-block",
              padding: "1rem 2.2rem",
              borderRadius: 100,
              background: "linear-gradient(135deg, var(--cyan), var(--blue))",
              color: "#000",
              fontWeight: 700,
              fontSize: ".95rem",
              textDecoration: "none",
            }}
          >
            Kérek egy ingyenes konzultációt
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
