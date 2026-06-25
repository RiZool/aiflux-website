"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
};

// Kattintásra teljes képernyős nagyítás (lightbox).
// Az overlayt PORTÁLLAL a <body>-ba rendereljük, hogy kilépjen a kártya
// `overflow:hidden` / `transform` kontextusából (különben levágódna/villogna).
export default function ZoomableImage({ src, alt, width, height, sizes, priority }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // Scroll lock + scrollbar-szélesség kompenzáció (hogy ne ugráljon a háttér)
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [open]);

  const overlay = (
    <div
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(0,0,0,.93)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3vh 3vw",
        cursor: "zoom-out",
      }}
    >
      <button
        aria-label="Bezárás"
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          top: 16,
          right: 20,
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,.2)",
          background: "rgba(0,0,0,.4)",
          color: "#fff",
          fontSize: 22,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ×
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "94vw",
          maxHeight: "92vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: 8,
          boxShadow: "0 24px 90px rgba(0,0,0,.6)",
          cursor: "default",
        }}
      />
    </div>
  );

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        onClick={() => setOpen(true)}
        style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in" }}
      />
      {open && createPortal(overlay, document.body)}
    </>
  );
}
