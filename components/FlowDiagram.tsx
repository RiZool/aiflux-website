import { Fragment } from "react";

// Folyamatábra esettanulmány-oldalakhoz: forrás → központ → felhasználás.
// Szerver-komponens (nincs benne interakció), a reszponzív tördelést a
// globals.css `.flow-grid` szabályai intézik.

export type FlowStage = {
  label: string;      // "01 · KÉSZÍTÉS"
  title: string;      // fő cím a kártyán
  chips?: string[];   // kis címkék (eszközök, célrendszerek)
  desc?: string;      // egy mondat magyarázat
};

const Arrow = () => (
  <div className="flow-arrow" aria-hidden="true">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  </div>
);

export default function FlowDiagram({ stages, loop }: { stages: FlowStage[]; loop?: string }) {
  return (
    <div>
      <div className="flow-grid">
        {stages.map((s, i) => (
          <Fragment key={s.title}>
            {i > 0 && <Arrow />}
            <div className="glass-card" style={{ padding: "1.3rem 1.25rem" }}>
              <div className="flow-step-label" style={{ marginBottom: ".55rem" }}>{s.label}</div>
              <div className="font-heading" style={{ fontSize: "1.02rem", fontWeight: 700, lineHeight: 1.3, marginBottom: s.desc || s.chips ? ".6rem" : 0 }}>
                {s.title}
              </div>
              {s.desc && (
                <p style={{ fontSize: ".86rem", color: "var(--muted)", lineHeight: 1.55, margin: "0 0 .7rem" }}>{s.desc}</p>
              )}
              {s.chips && (
                <div>
                  {s.chips.map((c) => (
                    <span key={c} className="flow-chip">{c}</span>
                  ))}
                </div>
              )}
            </div>
          </Fragment>
        ))}
      </div>

      {loop && (
        <div className="flow-loop">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>{loop}</span>
        </div>
      )}
    </div>
  );
}
