import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingPage from "./BookingPage";

export const metadata: Metadata = {
  title: "Ingyenes konzultáció foglalása | AI Flux",
  description:
    "Foglalj ingyenes 30 perces konzultációt! Meséld el mire van szükséged, mi megmutatjuk hogyan tud az AI segíteni a vállalkozásodnak.",
};

export default function FoglalasPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />

      {/* Hero sáv */}
      <div style={{
        paddingTop: "72px",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
        borderBottom: "1px solid rgba(0,229,255,0.1)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: 20, padding: "0.35rem 0.9rem", marginBottom: "1.25rem",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} className="pulse-dot" />
            <span style={{ fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 600, letterSpacing: "0.04em" }}>
              INGYENES · 30 PERC · KÖTELEZETTSÉG NÉLKÜL
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 700, margin: "0 0 1rem",
            lineHeight: 1.2,
          }}>
            Foglalj <span className="gradient-text">ingyenes konzultációt</span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.6)", maxWidth: 560,
            margin: "0 auto", fontSize: "1rem", lineHeight: 1.7,
          }}>
            Töltsd ki az alábbi kérdőívet és válassz egy szabad időpontot.
            A konzultáción Google Meet-en találkozunk — semmilyen szoftver letöltése nem szükséges.
          </p>
        </div>
      </div>

      {/* Form szekció */}
      <div style={{
        background: "var(--bg2)",
        padding: "3.5rem 1.5rem 5rem",
      }}>
        <BookingPage />
      </div>

      <Footer />
    </main>
  );
}
