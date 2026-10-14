"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, ACHIEVEMENTS_HEADER } from "../content/data";

const DURATION = 1400;

/* Cuenta de 0 al valor cuando la tarjeta entra en pantalla. Sin JS o con
   "reducir movimiento" muestra el valor final directamente. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    /* Se reinicia en el siguiente frame (antes de pintar) para no mostrar el valor final. */
    const reset = requestAnimationFrame(() => setN(0));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setN(Math.round(value * (1 - Math.pow(1 - t, 3)))); // easeOutCubic
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(reset);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{n}</span>;
}

const CARD =
  "flex min-h-[340px] flex-col gap-3 rounded-3xl p-7 transition-transform duration-500 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 motion-reduce:transition-none sm:p-8";
const CARD_LIGHT = "border border-ink/10 bg-card text-ink";
const CARD_DARK = "bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(13,13,13,0.5)] lg:-mt-4";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <p className="label text-mute">{ACHIEVEMENTS_HEADER.label}</p>
      <h2 className="title mt-4 text-5xl sm:text-7xl lg:text-[5.5rem]">
        {ACHIEVEMENTS_HEADER.title} <em className="title-accent">{ACHIEVEMENTS_HEADER.accent}</em>
      </h2>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-start">
        {ACHIEVEMENTS.map((a) => (
          <li
            key={a.id}
            className={`${CARD} ${a.featured ? CARD_DARK : CARD_LIGHT} ${a.id === "adr" ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <p className={`label ${a.featured ? "text-paper/60" : "text-mute"}`}>{a.kicker}</p>
            <p className="relative mt-3 flex items-baseline gap-1 font-serif leading-none">
              {a.prefix && (
                <span className="absolute -top-5 left-0.5 font-sans text-sm text-mute">{a.prefix}</span>
              )}
              <span className="text-[6rem] tracking-tight">
                <CountUp value={a.value} />
              </span>
              {a.suffix && <span className="text-4xl">{a.suffix.trim()}</span>}
            </p>
            <p className="text-lg font-medium leading-snug">{a.label}</p>
            <p className={`text-sm ${a.featured ? "text-paper/60" : "text-mute"}`}>{a.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
