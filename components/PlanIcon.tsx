import type { ReactNode } from "react";

// Csomag-ikonok (emoji helyett SVG, brand stílusban) — Pricing + WorkflowConfigurator közös
const planIcons: Record<string, ReactNode> = {
  alap:    <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 4-2.5 5 0M2 18c2.5-3 5-3 7.5 0s5 3 7.5 0 4-2.5 5 0" />,
  halado:  <path d="M13 2 3 14h8l-1 8 11-13h-8l1-7z" />,
  premium: <><path d="M12 2c3.5 2.2 5.5 6 5.5 10l-2.5 3h-6L6.5 12C6.5 8 8.5 4.2 12 2z" /><circle cx="12" cy="10" r="1.8" /><path d="M9 15l-2.2 4.5L10 18M15 15l2.2 4.5L14 18" /></>,
  extra:   <path d="M12 22c4 0 7-2.8 7-7 0-3-2-5.5-3.5-7C15 9.5 14 10 14 8c0-2.5-1-5-3.5-6 .5 3-1 4.5-2.5 6.5C6.5 10.5 5 12.5 5 15c0 4.2 3 7 7 7z" />,
};

export default function PlanIcon({ id, highlight = false, size = 46 }: { id: string; highlight?: boolean; size?: number }) {
  return (
    <div className="icon-box" style={{
      width: size, height: size, borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: highlight ? "rgba(0,229,255,.12)" : "rgba(0,229,255,.07)",
      border: `1px solid rgba(0,229,255,${highlight ? ".35" : ".18"})`,
      flexShrink: 0,
    }}>
      <svg width={size * 0.48} height={size * 0.48} viewBox="0 0 24 24" fill="none" stroke="var(--cyan)"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {planIcons[id]}
      </svg>
    </div>
  );
}
