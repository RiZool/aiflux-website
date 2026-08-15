"use client";
import { useRef } from "react";
import type { CaseVideo } from "@/data/case-studies";

// Saját tárhelyről (public/) kiszolgált MP4-ek lejátszója.
// - preload="metadata": induláskor CSAK a fejlécet tölti le (nem a teljes videót),
//   így az oldal akkor sem lassul be, ha több nagy fájl van a galériában.
// - Ha az egyik videó elindul, a többi automatikusan megáll.
// - Álló (9:16) és fekvő videó is működik: az arányt a width/height adja.
export default function VideoGallery({ videos }: { videos: CaseVideo[] }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseOthers = (current: number) => {
    refs.current.forEach((v, i) => {
      if (v && i !== current && !v.paused) v.pause();
    });
  };

  // Álló videóknál keskenyebb oszlop kell, különben túlnyúlik a képernyőn.
  const portrait = videos.some((v) => (v.height ?? 1920) > (v.width ?? 1080));
  const minCol = portrait ? 240 : 320;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCol}px, 1fr))`,
        gap: "1.2rem",
      }}
    >
      {videos.map((v, i) => (
        <figure key={v.src} className="glass-card" style={{ margin: 0, padding: 0, overflow: "hidden" }}>
          <video
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={v.src}
            poster={v.poster}
            controls
            playsInline
            preload="metadata"
            onPlay={() => pauseOthers(i)}
            aria-label={v.title}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: `${v.width ?? 1080} / ${v.height ?? 1920}`,
              background: "var(--bg)",
              objectFit: "contain",
            }}
          >
            A böngésződ nem támogatja a videó lejátszását.{" "}
            <a href={v.src}>Videó letöltése</a>
          </video>

          <figcaption style={{ padding: ".8rem .95rem 1rem" }}>
            <div style={{ fontSize: ".95rem", fontWeight: 700, lineHeight: 1.35, marginBottom: v.caption ? ".3rem" : 0 }}>
              {v.title}
            </div>
            {v.caption && (
              <div style={{ fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.5 }}>{v.caption}</div>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
