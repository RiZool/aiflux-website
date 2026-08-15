"use client";
import { useSyncExternalStore } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";

type Props = {
  /** "icon" = kör alakú ikongomb (navbar), "pill" = feliratos kapcsoló (mobil menü) */
  variant?: "icon" | "pill";
};

/** A téma igazságforrása a <html data-theme> attribútum, nem React-state.
 *  Ezért külső store-ként olvassuk: így minden ThemeToggle szinkronban marad,
 *  és a szerver-render (mindig "dark") sem okoz hydration-eltérést. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export default function ThemeToggle({ variant = "icon" }: Props) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark");

  const isDark = theme === "dark";
  const label = isDark ? "Világos téma bekapcsolása" : "Sötét téma bekapcsolása";

  if (variant === "pill") {
    return (
      <button
        onClick={toggle}
        aria-label={label}
        title={label}
        style={{
          display: "inline-flex", alignItems: "center", gap: ".6rem",
          background: "rgba(var(--cyan-rgb),.07)",
          border: "1px solid rgba(var(--cyan-rgb),.28)",
          borderRadius: 100, padding: ".55rem 1.1rem",
          color: "var(--cyan)", cursor: "pointer",
          fontFamily: "var(--font-heading)", fontSize: ".82rem", fontWeight: 600,
          letterSpacing: ".04em",
          transition: "background .25s, border-color .25s",
        }}
      >
        <ThemeIcon dark={isDark} size={17} />
        {isDark ? "Világos téma" : "Sötét téma"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, flexShrink: 0,
        background: "rgba(var(--cyan-rgb),.06)",
        border: "1px solid rgba(var(--cyan-rgb),.22)",
        borderRadius: 8, color: "var(--cyan)", cursor: "pointer",
        padding: 0, transition: "background .25s, border-color .25s, transform .25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(var(--cyan-rgb),.14)";
        e.currentTarget.style.borderColor = "rgba(var(--cyan-rgb),.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(var(--cyan-rgb),.06)";
        e.currentTarget.style.borderColor = "rgba(var(--cyan-rgb),.22)";
      }}
    >
      <ThemeIcon dark={isDark} size={18} />
    </button>
  );
}

/** Sötét témában napot mutat (erre váltasz), világosban holdat. */
function ThemeIcon({ dark, size }: { dark: boolean; size: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={{ transition: "transform .35s var(--ease-out)", transform: dark ? "none" : "rotate(-18deg)" }}
    >
      {dark ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      ) : (
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      )}
    </svg>
  );
}
