"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Szolgáltatások", href: "/#services" },
  { label: "Folyamatok", href: "/folyamatok" },
  { label: "Árazás", href: "/#pricing" },
  { label: "Kapcsolat", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock mobilon
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: ".75rem 5%",
        background: scrolled || menuOpen ? "rgba(0,0,0,.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(0,229,255,.08)" : "1px solid transparent",
        transition: "all .4s ease",
      }}>
        {/* Logo */}
        <a href="#hero" onClick={closeMenu} style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.png" alt="AI Flux logo"
            width={0} height={0} sizes="100vw"
            style={{ width: "auto", height: "36px" }} priority />
        </a>

        {/* Desktop nav links */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
          className="hidden-mobile">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} style={{
                color: "rgba(255,255,255,.78)", textDecoration: "none",
                fontSize: ".88rem", fontWeight: 500, letterSpacing: ".02em", transition: "color .2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.78)")}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden-mobile" style={{
          border: "1px solid var(--cyan)", color: "var(--cyan)",
          padding: ".48rem 1.25rem", borderRadius: 4,
          fontSize: ".83rem", fontWeight: 600,
          textDecoration: "none", letterSpacing: ".04em", transition: "all .25s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--cyan)"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--cyan)"; }}>
          Ajánlatot kérek
        </a>

        {/* Hamburger gomb — csak mobilon */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={menuOpen}
          className="show-mobile"
          style={{
            display: "none", // CSS override-olja mobilon
            background: "transparent", border: "none",
            cursor: "pointer", padding: ".4rem",
            flexDirection: "column", gap: "5px",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* 3 vonal → X animáció */}
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--cyan)", borderRadius: 2,
            transition: "all .3s ease",
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--cyan)", borderRadius: 2,
            transition: "all .3s ease",
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "translateX(-8px)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 2,
            background: "var(--cyan)", borderRadius: 2,
            transition: "all .3s ease",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile overlay menü */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,.97)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "0",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity .35s ease",
      }}>
        <ul style={{ listStyle: "none", textAlign: "center", padding: 0, margin: "0 0 2.5rem" }}>
          {navLinks.map(({ label, href }, i) => (
            <li key={label} style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity .4s ease ${i * 0.07}s, transform .4s ease ${i * 0.07}s`,
            }}>
              <a
                href={href}
                onClick={closeMenu}
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.6rem,6vw,2.2rem)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,.85)",
                  textDecoration: "none",
                  padding: ".65rem 2rem",
                  letterSpacing: "-.01em",
                  transition: "color .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobil CTA gomb */}
        <a
          href="#contact"
          onClick={closeMenu}
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .4s ease .35s, transform .4s ease .35s",
            background: "linear-gradient(90deg,var(--cyan),var(--blue))",
            color: "#000", fontWeight: 700,
            padding: ".9rem 2.8rem", borderRadius: 6,
            fontSize: "1rem", textDecoration: "none",
            fontFamily: "var(--font-heading)",
            letterSpacing: ".04em",
          }}
        >
          Ajánlatot kérek →
        </a>

        {/* Email link alul */}
        <a href="mailto:info@aiflux.hu" onClick={closeMenu} style={{
          marginTop: "2rem",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity .4s ease .42s",
          color: "rgba(255,255,255,.35)",
          fontSize: ".85rem", textDecoration: "none",
        }}>
          info@aiflux.hu
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
