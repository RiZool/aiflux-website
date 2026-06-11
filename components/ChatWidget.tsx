"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Mennyibe kerül egy weboldal?",
  "Mit tud az AI chatbot?",
  "Hogyan zajlik az együttműködés?",
];

const FALLBACK_MSG =
  "Hoppá, valami hiba történt. Próbáld újra, vagy írj nekünk: info@aiflux.hu";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // A /folyamatok oldalon a sticky összesítő sáv fölé emeljük a buborékot
  const bottomOffset = pathname === "/folyamatok" ? "6.5rem" : "1.5rem";

  // Auto-scroll az új üzenetekhez
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  // Esc bezárja a panelt
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const history: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const errMsg = (data as { error?: string } | null)?.error ?? FALLBACK_MSG;
        setMessages([...history, { role: "assistant", content: errMsg }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const current = acc;
        setMessages([...history, { role: "assistant", content: current }]);
      }
      if (!acc) {
        setMessages([...history, { role: "assistant", content: FALLBACK_MSG }]);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: FALLBACK_MSG }]);
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* ── Lebegő buborék gomb ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Chat bezárása" : "Chat megnyitása — kérdezz az AI Flux szolgáltatásairól — Fluxy asszisztens"}
        aria-expanded={open}
        style={{
          position: "fixed", bottom: bottomOffset, right: "1.5rem", zIndex: 1100,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--cyan), var(--blue))",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,229,255,.35), 0 2px 8px rgba(0,0,0,.4)",
          transition: "transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, bottom .3s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,229,255,.5), 0 2px 8px rgba(0,0,0,.4)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,229,255,.35), 0 2px 8px rgba(0,0,0,.4)"; }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#000" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6h18a1 1 0 011 1v10a1 1 0 01-1 1H6l-4 3V7a1 1 0 011-1z" />
            <circle cx="9" cy="12" r="1.2" fill="#000" stroke="none" />
            <circle cx="13" cy="12" r="1.2" fill="#000" stroke="none" />
            <circle cx="17" cy="12" r="1.2" fill="#000" stroke="none" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        role="dialog"
        aria-label="Fluxy — AI asszisztens chat"
        style={{
          position: "fixed", zIndex: 1090,
          bottom: `calc(${bottomOffset} + 68px)`, right: "1.5rem",
          width: "min(380px, calc(100vw - 2rem))",
          height: "min(560px, calc(100dvh - 140px))",
          display: "flex", flexDirection: "column",
          background: "rgba(5,8,22,.97)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0,229,255,.22)",
          borderRadius: 16,
          boxShadow: "0 24px 80px rgba(0,0,0,.6), 0 0 40px rgba(0,229,255,.08)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s cubic-bezier(.22,1,.36,1), transform .3s cubic-bezier(.22,1,.36,1), bottom .3s ease",
        }}
      >
        {/* Fejléc */}
        <div style={{
          display: "flex", alignItems: "center", gap: ".7rem",
          padding: ".9rem 1.1rem",
          borderBottom: "1px solid rgba(0,229,255,.12)",
          background: "linear-gradient(90deg, rgba(0,229,255,.08), rgba(0,102,255,.05))",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <img src="/logo_F.png" alt="Fluxy" width={28} height={28} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: ".95rem", color: "#fff" }}>
              Fluxy
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".35rem", fontSize: ".7rem", color: "rgba(255,255,255,.45)" }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} />
              AI asszisztens · azonnal válaszol
            </div>
          </div>
        </div>

        {/* Üzenetek */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: ".65rem" }}>
          {/* Üdvözlő üzenet */}
          <div style={bubbleStyle("assistant")}>
            Szia! 👋 Fluxy vagyok, az AI Flux asszisztense. Kérdezz bátran a szolgáltatásainkról, árainkról vagy arról, hogyan tud az AI segíteni a vállalkozásodnak!
          </div>

          {/* Javasolt kérdések — csak amíg nincs beszélgetés */}
          {messages.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", marginTop: ".25rem" }}>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{
                  textAlign: "left", padding: ".55rem .85rem",
                  background: "rgba(0,229,255,.05)", border: "1px solid rgba(0,229,255,.18)",
                  borderRadius: 10, color: "var(--cyan)", fontSize: ".82rem", fontWeight: 500,
                  cursor: "pointer", transition: "background .2s, border-color .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,.12)"; e.currentTarget.style.borderColor = "rgba(0,229,255,.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,229,255,.05)"; e.currentTarget.style.borderColor = "rgba(0,229,255,.18)"; }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} style={bubbleStyle(m.role)}>
              {m.content || (
                <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: "1em" }}>
                  <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Beviteli sor */}
        <form
          onSubmit={e => { e.preventDefault(); send(input); }}
          style={{ display: "flex", gap: ".5rem", padding: ".75rem", borderTop: "1px solid rgba(255,255,255,.07)" }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Írd ide a kérdésed…"
            maxLength={2000}
            aria-label="Üzenet a Fluxy asszisztensnek"
            style={{
              flex: 1, minWidth: 0,
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 10, padding: ".6rem .85rem",
              color: "#fff", fontSize: ".88rem", outline: "none",
              transition: "border-color .2s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(0,229,255,.45)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,.12)")}
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label="Küldés"
            style={{
              width: 42, height: 42, borderRadius: 10, border: "none", flexShrink: 0,
              background: streaming || !input.trim()
                ? "rgba(0,229,255,.15)"
                : "linear-gradient(135deg, var(--cyan), var(--blue))",
              color: streaming || !input.trim() ? "rgba(0,229,255,.5)" : "#000",
              cursor: streaming || !input.trim() ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .25s",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>

        {/* Lábjegyzet */}
        <div style={{ padding: "0 .9rem .6rem", fontSize: ".65rem", color: "rgba(255,255,255,.28)", textAlign: "center" }}>
          Az AI asszisztens hibázhat — fontos kérdésben írj:{" "}
          <a href="mailto:info@aiflux.hu" style={{ color: "rgba(0,229,255,.55)", textDecoration: "none" }}>info@aiflux.hu</a>
        </div>
      </div>

      <style>{`
        @keyframes chat-dot {
          0%, 80%, 100% { opacity: .25; transform: translateY(0); }
          40%            { opacity: 1;  transform: translateY(-3px); }
        }
      `}</style>
    </>
  );
}

function bubbleStyle(role: "user" | "assistant"): CSSProperties {
  const isUser = role === "user";
  return {
    alignSelf: isUser ? "flex-end" : "flex-start",
    maxWidth: "85%",
    padding: ".6rem .85rem",
    borderRadius: isUser ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
    background: isUser
      ? "linear-gradient(135deg, rgba(0,229,255,.18), rgba(0,102,255,.15))"
      : "rgba(255,255,255,.05)",
    border: isUser ? "1px solid rgba(0,229,255,.25)" : "1px solid rgba(255,255,255,.08)",
    color: "rgba(255,255,255,.88)",
    fontSize: ".86rem",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };
}

function Dot({ delay }: { delay: number }) {
  return (
    <span style={{
      width: 5, height: 5, borderRadius: "50%",
      background: "var(--cyan)", display: "inline-block",
      animation: `chat-dot 1.2s ease-in-out ${delay}s infinite`,
    }} />
  );
}
