"use client";
import { useEffect, useRef } from "react";

const technologies = [
  { name: "OpenAI", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.101v-5.678a.79.79 0 0 0-.402-.672zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>` },
  { name: "Make", letter: "M" },
  { name: "n8n", letter: "n8n" },
  { name: "Next.js", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>` },
  { name: "Vercel", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>` },
  { name: "Claude AI", letter: "C" },
  { name: "Gemini", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c.51 0 1.016.034 1.512.1C12.018 6.937 9.5 10.91 9.5 12c0 1.09 2.518 5.063 4.012 9.9A10.016 10.016 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm1.988.1A10.016 10.016 0 0 1 22 12c0 5.523-4.477 10-10 10-.51 0-1.016-.034-1.512-.1C12.982 17.063 15.5 13.09 15.5 12c0-1.09-2.518-5.063-4.012-9.9z"/></svg>` },
  { name: "MailerLite", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>` },
  { name: "Tailwind", svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>` },
  { name: "Supabase", letter: "SB" },
];

export default function TechLogos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Általunk használt technológiák"
      style={{ background: "var(--bg2)", padding: "3rem 6%", borderTop: "1px solid rgba(0,229,255,.06)", borderBottom: "1px solid rgba(0,229,255,.06)" }}
    >
      <div className="reveal" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>
          Általunk használt technológiák
        </p>
      </div>

      {/* Scrolling logo strip */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--bg2), transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--bg2), transparent)", zIndex: 2, pointerEvents: "none" }} />

        {/* Track wrapper — a belső div pontosan 2× széles, animáció -50%-ig megy */}
        <div style={{ display: "flex", width: "max-content" }}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              style={{
                display: "flex",
                gap: "0",
                animation: "scroll-logos 28s linear infinite",
              }}
            >
              {technologies.map((tech, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: ".6rem",
                  color: "rgba(255,255,255,.32)",
                  fontSize: ".88rem", fontWeight: 600,
                  letterSpacing: ".04em",
                  whiteSpace: "nowrap",
                  transition: "color .25s",
                  cursor: "default",
                  padding: ".5rem 2.5rem",
                  borderRight: "1px solid rgba(255,255,255,.06)",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.32)")}
                >
                  {tech.svg ? (
                    <span
                      style={{ width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                      dangerouslySetInnerHTML={{ __html: tech.svg }}
                    />
                  ) : (
                    <span style={{
                      width: 22, height: 22, borderRadius: 5,
                      background: "rgba(0,229,255,.08)",
                      border: "1px solid rgba(0,229,255,.18)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: ".6rem", fontWeight: 700, color: "var(--cyan)",
                      flexShrink: 0,
                    }}>
                      {tech.letter}
                    </span>
                  )}
                  {tech.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-logos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        /* Pause on hover */
        div:hover > div > div[aria-hidden] ,
        div:hover > div > div:not([aria-hidden]) {
          animation-play-state: running;
        }
      `}</style>
    </section>
  );
}
