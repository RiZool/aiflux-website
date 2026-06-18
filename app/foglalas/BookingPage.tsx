"use client";
import { useState, useEffect } from "react";

type Slot = { start: string; end: string; label: string };

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  business: string;
  automationGoal: string;
  hasWebsite: string;
  budget: string;
  notes: string;
  gdpr: boolean;
};

const BUDGET_OPTIONS = [
  "Még nem tudom",
  "100 000 – 300 000 Ft",
  "300 000 – 600 000 Ft",
  "600 000 Ft felett",
];

const DAYS_SHOWN = 14;

function getWeekdays(): { iso: string; label: string; short: string }[] {
  const result = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let count = 0;
  let offset = 1;
  while (count < DAYS_SHOWN) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    offset++;
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const label = d.toLocaleDateString("hu-HU", { month: "short", day: "numeric" });
    const short = d.toLocaleDateString("hu-HU", { weekday: "short" });
    result.push({ iso, label, short });
    count++;
  }
  return result;
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  padding: "0.65rem 0.9rem",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box" as const,
  fontFamily: "var(--font-inter), Inter, sans-serif",
  colorScheme: "dark" as const,
};

const labelStyle = {
  display: "block",
  fontSize: "0.82rem",
  color: "rgba(255,255,255,0.55)",
  marginBottom: "0.35rem",
  fontWeight: 500,
};

export default function BookingPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", company: "",
    business: "", automationGoal: "", hasWebsite: "",
    budget: BUDGET_OPTIONS[0], notes: "", gdpr: false,
  });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ meetLink: string; dateLabel: string } | null>(null);
  const [error, setError] = useState("");
  const [slotsError, setSlotsError] = useState("");
  const [focusedField, setFocusedField] = useState<string>("");

  const weekdays = getWeekdays();

  useEffect(() => {
    if (!selectedDate) return;
    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);
    setSlotsError("");
    fetch(`/api/booking/slots?date=${selectedDate}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok || data.error) {
          setSlotsError(data.error ?? "Naptár lekérés sikertelen.");
        } else {
          setSlots(data.slots ?? []);
        }
      })
      .catch(() => setSlotsError("Hálózati hiba a naptár lekérésénél."))
      .finally(() => setSlotsLoading(false));
  }, [selectedDate]);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) { setError("Kérjük válassz időpontot!"); return; }
    if (!form.gdpr) { setError("Az adatkezelési nyilatkozat elfogadása kötelező."); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hasWebsite: form.hasWebsite === "igen",
          slot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Hiba történt."); return; }
      setSuccess({ meetLink: data.meetLink, dateLabel: data.dateLabel });
    } catch {
      setError("Hálózati hiba. Próbáld újra, vagy írj: info@aiflux.hu");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", padding: "4rem 1.5rem" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,102,255,0.15))",
          border: "1px solid rgba(0,229,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          fontSize: 32,
        }}>✓</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", marginBottom: "0.75rem" }}>
          Foglalás megerősítve!
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem" }}>
          Visszaigazolót küldtünk e-mailben. Találkozunk itt:
        </p>
        <div style={{
          background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.22)",
          borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "2rem",
        }}>
          <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>
            {success.dateLabel}
          </p>
          {success.meetLink && (
            <a href={success.meetLink} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--cyan)", fontSize: "0.88rem", marginTop: "0.5rem", display: "block" }}>
              Google Meet megnyitása →
            </a>
          )}
        </div>
        <a href="/" style={{
          display: "inline-block", padding: "0.7rem 1.6rem",
          background: "linear-gradient(135deg, var(--cyan), var(--blue))",
          color: "#000", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.9rem",
        }}>
          Vissza a főoldalra
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2.5rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}
        className="booking-grid"
      >
        {/* ── Bal oldal: Form ── */}
        <div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.25rem",
            marginBottom: "1.5rem", color: "rgba(255,255,255,0.9)",
          }}>
            Pár rövid kérdés előre
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Név */}
            <div>
              <label style={labelStyle}>Neved *</label>
              <input required style={{ ...inputStyle, borderColor: focusedField === "name" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                value={form.name} onChange={e => setField("name", e.target.value)}
                onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField("")}
                placeholder="Kovács János" />
            </div>

            {/* Email + Telefon */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div>
                <label style={labelStyle}>E-mail *</label>
                <input required type="email" style={{ ...inputStyle, borderColor: focusedField === "email" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                  value={form.email} onChange={e => setField("email", e.target.value)}
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField("")}
                  placeholder="email@ceg.hu" />
              </div>
              <div>
                <label style={labelStyle}>Telefonszám</label>
                <input type="tel" style={{ ...inputStyle, borderColor: focusedField === "phone" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                  value={form.phone} onChange={e => setField("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField("")}
                  placeholder="+36 20 123 4567" />
              </div>
            </div>

            {/* Cég */}
            <div>
              <label style={labelStyle}>Cég neve</label>
              <input style={{ ...inputStyle, borderColor: focusedField === "company" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                value={form.company} onChange={e => setField("company", e.target.value)}
                onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField("")}
                placeholder="Kovács Kft." />
            </div>

            {/* Mivel foglalkoznak */}
            <div>
              <label style={labelStyle}>Mivel foglalkozik a vállalkozásod?</label>
              <textarea rows={2} style={{ ...inputStyle, resize: "vertical", borderColor: focusedField === "business" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                value={form.business} onChange={e => setField("business", e.target.value)}
                onFocus={() => setFocusedField("business")} onBlur={() => setFocusedField("")}
                placeholder="Pl. kiskereskedelmi bolt, online tanácsadás, vendéglátás..." />
            </div>

            {/* Mit automatizálna */}
            <div>
              <label style={labelStyle}>Mit szeretnél automatizálni / mi a fő probléma? *</label>
              <textarea required rows={3} style={{ ...inputStyle, resize: "vertical", borderColor: focusedField === "automationGoal" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                value={form.automationGoal} onChange={e => setField("automationGoal", e.target.value)}
                onFocus={() => setFocusedField("automationGoal")} onBlur={() => setFocusedField("")}
                placeholder="Pl. ügyfélszolgálat chatbot, időpontfoglalás, hírlevél automatizálás..." />
            </div>

            {/* Van weboldal + Büdzsé */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <div>
                <label style={labelStyle}>Van már weboldalad?</label>
                <select style={{ ...inputStyle, cursor: "pointer", background: "#fff", color: "#000" }}
                  value={form.hasWebsite} onChange={e => setField("hasWebsite", e.target.value)}>
                  <option value="">Válassz...</option>
                  <option value="igen">Igen</option>
                  <option value="nem">Nem</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Hozzávetőleges büdzsé</label>
                <select style={{ ...inputStyle, cursor: "pointer", background: "#fff", color: "#000" }}
                  value={form.budget} onChange={e => setField("budget", e.target.value)}>
                  {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Egyéb információ */}
            <div>
              <label style={labelStyle}>Egyéb információ</label>
              <textarea rows={2} style={{ ...inputStyle, resize: "vertical", borderColor: focusedField === "notes" ? "rgba(0,229,255,0.45)" : "rgba(255,255,255,0.12)" }}
                value={form.notes} onChange={e => setField("notes", e.target.value)}
                onFocus={() => setFocusedField("notes")} onBlur={() => setFocusedField("")}
                placeholder="Bármi, amit fontosnak tartasz előre tudatni..." />
            </div>
          </div>
        </div>

        {/* ── Jobb oldal: Időpont picker ── */}
        <div>
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "1.25rem",
            marginBottom: "1.5rem", color: "rgba(255,255,255,0.9)",
          }}>
            Válassz időpontot
          </h2>

          {/* Dátum lista */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {weekdays.map(d => (
              <button key={d.iso} type="button"
                onClick={() => setSelectedDate(d.iso)}
                style={{
                  padding: "0.5rem 0.85rem", borderRadius: 8, cursor: "pointer",
                  border: "1px solid",
                  borderColor: selectedDate === d.iso ? "var(--cyan)" : "rgba(255,255,255,0.15)",
                  background: selectedDate === d.iso ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.04)",
                  color: selectedDate === d.iso ? "var(--cyan)" : "rgba(255,255,255,0.7)",
                  fontSize: "0.82rem", fontWeight: selectedDate === d.iso ? 600 : 400,
                  transition: "all .2s",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}>
                <span style={{ display: "block", fontSize: "0.72rem", opacity: 0.7 }}>{d.short}</span>
                {d.label}
              </button>
            ))}
          </div>

          {/* Időpontok */}
          {!selectedDate && (
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>
              Válassz egy dátumot a szabad időpontok megtekintéséhez.
            </p>
          )}

          {slotsLoading && (
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>Szabad időpontok betöltése...</p>
          )}

          {!slotsLoading && slotsError && (
            <p style={{ color: "#ff6b6b", fontSize: "0.84rem" }}>{slotsError}</p>
          )}

          {!slotsLoading && !slotsError && selectedDate && slots.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>
              Ezen a napon nincs szabad időpont. Válassz másik napot!
            </p>
          )}

          {!slotsLoading && slots.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {slots.map(slot => (
                <button key={slot.start} type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: "0.6rem 1.1rem", borderRadius: 8, cursor: "pointer",
                    border: "1px solid",
                    borderColor: selectedSlot?.start === slot.start ? "var(--cyan)" : "rgba(255,255,255,0.15)",
                    background: selectedSlot?.start === slot.start
                      ? "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,102,255,0.15))"
                      : "rgba(255,255,255,0.04)",
                    color: selectedSlot?.start === slot.start ? "var(--cyan)" : "rgba(255,255,255,0.8)",
                    fontSize: "1rem", fontWeight: 600,
                    transition: "all .2s",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}>
                  {slot.label}
                </button>
              ))}
            </div>
          )}

          {/* Kiválasztott időpont összefoglaló */}
          {selectedSlot && (
            <div style={{
              marginTop: "1.5rem",
              background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.22)",
              borderRadius: 8, padding: "0.85rem 1rem",
            }}>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(255,255,255,0.6)" }}>Kiválasztott időpont:</p>
              <p style={{ margin: "0.25rem 0 0", fontWeight: 700, color: "#fff" }}>
                {new Date(selectedSlot.start).toLocaleString("hu-HU", {
                  timeZone: "Europe/Budapest", month: "long", day: "numeric",
                  weekday: "long", hour: "2-digit", minute: "2-digit",
                })}
              </p>
            </div>
          )}

          {/* GDPR + Küldés */}
          <div style={{ marginTop: "2rem" }}>
            <label style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", cursor: "pointer" }}>
              <input type="checkbox" checked={form.gdpr} onChange={e => setField("gdpr", e.target.checked)}
                style={{ marginTop: 3, accentColor: "var(--cyan)", width: 16, height: 16, flexShrink: 0 }} />
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                Elfogadom az{" "}
                <a href="/adatkezeles" style={{ color: "var(--cyan)" }}>adatkezelési tájékoztatót</a>.
                Hozzájárulok, hogy az AI Flux a megadott adataimat a konzultáció megszervezése céljából kezelje.
              </span>
            </label>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "0.84rem", marginTop: "0.75rem" }}>{error}</p>
            )}

            <button type="submit" disabled={submitting || !selectedSlot}
              className="btn-shine btn-glow"
              style={{
                marginTop: "1.25rem", width: "100%",
                padding: "0.85rem 1.5rem",
                background: submitting || !selectedSlot
                  ? "rgba(0,229,255,0.15)"
                  : "linear-gradient(135deg, var(--cyan), var(--blue))",
                color: submitting || !selectedSlot ? "rgba(0,229,255,0.5)" : "#000",
                border: "none", borderRadius: 10, cursor: submitting || !selectedSlot ? "default" : "pointer",
                fontWeight: 700, fontSize: "1rem",
                fontFamily: "var(--font-heading), var(--font-inter), sans-serif",
                transition: "all .25s",
              }}>
              {submitting ? "Foglalás folyamatban..." : "Időpontot foglalok →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
