"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: ".75rem 5%",
      background: scrolled ? "rgba(0,0,0,.90)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,229,255,.08)" : "1px solid transparent",
      transition: "all .4s ease",
    }}>
      <a href="#hero" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
        <Image src="/logo.png" alt="AI Flux logo" width={140} height={40}
          style={{ objectFit: "contain", height: 38, width: "auto" }} priority />
      </a>

      <ul className="hidden-mobile"
        style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {[["Szolgáltatások","#services"],["Folyamatunk","#process"],["Miért mi?","#stats"],["Kapcsolat","#contact"]].map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{ color: "rgba(255,255,255,.78)", textDecoration: "none", fontSize: ".88rem", fontWeight: 500, letterSpacing: ".02em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.78)")}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{ border: "1px solid var(--cyan)", color: "var(--cyan)", padding: ".48rem 1.25rem", borderRadius: 4, fontSize: ".83rem", fontWeight: 600, textDecoration: "none", letterSpacing: ".04em", transition: "all .25s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--cyan)"; e.currentTarget.style.color = "#000"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--cyan)"; }}>
        Ajánlatot kérek
      </a>
    </nav>
  );
}
