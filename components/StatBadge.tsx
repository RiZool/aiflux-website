type Props = {
  value: string; // pl. "15"
  unit: string; // pl. "óra"
  label: string; // pl. "havi megtakarítás"
  size?: number; // átmérő px-ben
};

// Kör alakú, AIFlux-stílusú eredmény-jelvény az esettanulmány kártyákon.
// Rugalmas: minden esettanulmány saját value/unit/label-t adhat meg
// (pl. SomaFix: 15 / óra / havi megtakarítás — chatbot: 0-24 / elérhető / mindig stb.)
export default function StatBadge({ value, unit, label, size = 98 }: Props) {
  return (
    <div
      aria-label={`${label}: ${value} ${unit}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: size * 0.1,
        background:
          "radial-gradient(circle at 50% 30%, rgba(0,229,255,.16), rgba(0,102,255,.04) 72%)",
        border: "1px solid var(--glass-border)",
        boxShadow:
          "inset 0 0 22px rgba(0,229,255,.13), 0 0 18px rgba(0,229,255,.08)",
      }}
    >
      <span
        style={{
          fontSize: size * 0.083,
          letterSpacing: ".05em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,.58)",
          lineHeight: 1.15,
        }}
      >
        {label}
      </span>
      <span
        className="font-heading stat-num"
        style={{ fontSize: size * 0.3, fontWeight: 700, lineHeight: 1.05, margin: `${size * 0.03}px 0` }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: size * 0.088,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--cyan)",
        }}
      >
        {unit}
      </span>
    </div>
  );
}
