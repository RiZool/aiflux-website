// WaveDivider.tsx
export default function WaveDivider({ from, to, path, height }: { from: string; to: string; path: string; height: number }) {
  return (
    <div style={{ background: from, display: "block", overflow: "hidden", lineHeight: 0, marginTop: -2 }}>
      <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="none" style={{ display: "block", width: "100%", height }} xmlns="http://www.w3.org/2000/svg">
        {/* style-ként adjuk a fill-t, mert a `to` lehet CSS-változó (téma-token) */}
        <path d={path} style={{ fill: to }} />
      </svg>
    </div>
  );
}
