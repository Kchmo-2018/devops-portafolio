"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY, JOURNEY_HEADER } from "../content/data";
import TechChip from "./TechChip";

/* La línea se "dibuja" con el scroll: llega hasta un punto fijo de la pantalla (55 % de
   la altura) y cada hito se enciende cuando la línea lo alcanza. */
const READ_LINE = 0.55;

export default function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  /* null = aún sin medir (render del servidor): todo visible, sin parpadeos ni sin-JS roto. */
  const [fill, setFill] = useState<number | null>(null);
  const [reached, setReached] = useState<number>(JOURNEY.length);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const y = Math.min(Math.max(window.innerHeight * READ_LINE - rect.top, 0), rect.height);
      setFill(y);
      setReached(
        dotRefs.current.filter((d) => d && d.offsetTop + d.offsetHeight / 2 <= y).length,
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <p className="label text-mute">{JOURNEY_HEADER.label}</p>
      <h2 className="title mt-4 text-5xl sm:text-7xl lg:text-[5.5rem]">
        {JOURNEY_HEADER.title} <em className="title-accent">{JOURNEY_HEADER.accent}</em>
      </h2>
      <p className="mt-6 max-w-[40rem] text-lg text-mute">{JOURNEY_HEADER.intro}</p>

      <ol ref={listRef} className="relative mt-14">
        {/* Riel gris + tramo oscuro que crece con el scroll */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-3 w-0.5 bg-ink/12 lg:left-[219px]"
        >
          <span
            className="absolute inset-x-0 top-0 block bg-ink"
            style={{ height: fill === null ? "100%" : `${Math.max(fill - 12, 0)}px` }}
          />
        </span>

        {JOURNEY.map((item, i) => {
          const on = i < reached;
          return (
            <li
              key={item.id}
              className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 pb-14 last:pb-0 lg:grid-cols-[180px_32px_minmax(0,1fr)] lg:gap-x-6"
            >
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={
                  "relative z-10 col-start-1 row-span-2 row-start-1 mt-1 size-[18px] self-start justify-self-center rounded-full border-2 transition-colors duration-500 lg:col-start-2 lg:row-span-1 lg:mt-3 " +
                  (on ? "border-ink bg-ink" : "border-ink/25 bg-paper")
                }
              />
              <p
                className={
                  "label col-start-2 row-start-1 transition-colors duration-500 lg:col-start-1 lg:mt-4 lg:text-right " +
                  (on ? "text-ink" : "text-mute/70")
                }
              >
                {item.period}
              </p>
              <div
                className={
                  "col-start-2 row-start-2 mt-3 transition-opacity duration-500 lg:col-start-3 lg:row-start-1 lg:mt-0 " +
                  (on ? "opacity-100" : "opacity-40")
                }
              >
                <h3 className="title text-3xl sm:text-4xl">{item.title}</h3>
                <p className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-mute">
                  {item.text}
                </p>
                {item.tech && (
                  <ul aria-label="Tecnologías" className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((id) => (
                      <TechChip key={id} id={id} />
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
