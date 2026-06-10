"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * LogoAnimated — PNG logo + alkalmi SVG "rajzolódó F" animáció overlay
 * Az animáció CSAK akkor fut ha:
 *  - prefers-reduced-motion: no-preference
 *  - hardwareConcurrency >= 4
 *  - nem mobilon (innerWidth > 768)
 */
export default function LogoAnimated({ height = 38 }: { height?: number }) {
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Egyetlen effect: feltétel-ellenőrzés + időzített animáció-ciklus.
  // A setState csak timer callbackből hívódik, így nincs kaszkád render.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const weakCPU = (navigator.hardwareConcurrency ?? 4) < 4;
    const isMobile = window.innerWidth < 768;
    if (reducedMotion || weakCPU || isMobile) return;

    // Animáció (1.8s) → véletlenszerű szünet (8-16 mp) → újra
    const run = () => {
      setAnimating(true);
      timerRef.current = setTimeout(() => {
        setAnimating(false);
        timerRef.current = setTimeout(run, 8000 + Math.random() * 8000);
      }, 1800);
    };

    // Első animáció 3 mp után
    timerRef.current = setTimeout(run, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {/* Alap PNG logó */}
      <Image
        src="/logo.png"
        alt="AI Flux logo"
        width={140}
        height={40}
        priority
        style={{ objectFit: "contain", height, width: "auto" }}
      />

      {/* SVG overlay — csak az F betű területe felett, bal oldalon */}
      <svg
        viewBox="0 0 36 40"
        fill="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          // A PNG logóban az F kb. a teljes magasság × 35% szélességet foglalja
          height: height * 1.05,
          width: height * 1.05 * (36 / 40),
          pointerEvents: "none",
          opacity: animating ? 1 : 0,
          transition: "opacity .3s ease",
        }}
      >
        <defs>
          <linearGradient id="f-anim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
        </defs>

        {/* Külső szárny */}
        <path
          d="M4 36 C4 36 7 21 19 15 C11 18 8 30 22 27 C14 29 12 38 24 35"
          stroke="url(#f-anim-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 120,
            strokeDashoffset: animating ? 0 : 120,
            transition: animating
              ? "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        />

        {/* Belső szárny */}
        <path
          d="M11 30 C11 30 14 15 26 9 C18 12 15 24 29 21 C21 23 19 32 31 29"
          stroke="url(#f-anim-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity=".7"
          style={{
            strokeDasharray: 90,
            strokeDashoffset: animating ? 0 : 90,
            transition: animating
              ? "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) .15s"
              : "none",
          }}
        />
      </svg>
    </div>
  );
}
