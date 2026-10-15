"use client";

import { useRef, useState } from "react";
import { PROFILE, SKILL_GROUPS, type Level } from "../content/data";

/* Nombres de las skills de una familia con un nivel dado, para el reverso. */
const namesOf = (family: string, level: Level) =>
  (SKILL_GROUPS.find((g) => g.family === family)?.skills ?? [])
    .filter((s) => s.level === level)
    .map((s) => s.name)
    .join(", ");

const learning = SKILL_GROUPS.flatMap((g) => g.skills)
  .filter((s) => s.level === "aprendiendo")
  .map((s) => s.name)
  .join(", ");

/* Código de barras decorativo, derivado del ID para que sea siempre el mismo. */
const BARS = (() => {
  let x = 0;
  return [...`${PROFILE.card.id}-${PROFILE.initials}`].flatMap((ch) => {
    const n = ch.charCodeAt(0);
    const w1 = 1 + (n % 3);
    const w2 = 1 + ((n >> 2) % 2);
    const bars = [
      { x, w: w1 },
      { x: x + w1 + w2, w: w2 },
    ];
    x += w1 + w2 + w2 + 1;
    return bars;
  });
})();
const BARS_WIDTH = BARS.length ? BARS[BARS.length - 1].x + BARS[BARS.length - 1].w : 0;

const RIBBON_TEXT = `${PROFILE.name} · ${PROFILE.roles[0]} · `.toUpperCase().repeat(6);

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const FACE =
  "flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white " +
  "text-ink [grid-area:1/1] [backface-visibility:hidden] " +
  "shadow-[0_40px_70px_-35px_rgba(13,13,13,0.45)]";
const FACE_BACK = FACE + " [transform:rotateY(180deg)]";
const BAND = "label flex items-center justify-between bg-ink px-6 py-4 text-paper";

function Line({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2">
      <span className="label text-mute">{term}</span>
      <span className="label text-right text-ink">{children}</span>
    </div>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label text-mute">{term}</p>
      <p className="mt-0.5 text-[15px] leading-snug">{children}</p>
    </div>
  );
}

export default function IdCard() {
  /* pinned: lo fija el botón (teclado y táctil). hovered: el ratón encima (escritorio). */
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const flipped = pinned || hovered;
  const tiltRef = useRef<HTMLDivElement>(null);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  /* Inclinación 3D que sigue al ratón. Solo escribe variables CSS: no re-renderiza. */
  const tilt = (x: number, y: number) => {
    tiltRef.current?.style.setProperty("--ry", `${x}deg`);
    tiltRef.current?.style.setProperty("--rx", `${y}deg`);
  };
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      {/* Cinta + clip + credencial: todo cuelga del borde superior de la sección */}
      <div className="sway flex w-full max-w-[340px] flex-col items-center">
        <div
          aria-hidden="true"
          className="flex h-[210px] w-11 justify-center overflow-hidden bg-ink py-3"
        >
          <span className="label whitespace-nowrap text-[10px] leading-none tracking-[0.18em] text-paper/70 [writing-mode:vertical-rl]">
            {RIBBON_TEXT}
          </span>
        </div>
        <div
          aria-hidden="true"
          className="-mb-2 h-9 w-7 rounded-b-md border border-ink/20 bg-gradient-to-b from-[#e6e6e6] to-[#9c9c9c] shadow-sm"
        />

        <div
          role="button"
          tabIndex={0}
          aria-pressed={pinned}
          aria-label="Credencial de desarrollador. Pulsa para girarla."
          className={"w-[340px] max-w-full cursor-pointer [perspective:1400px] " + FOCUS}
          onClick={() => setPinned((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPinned((v) => !v);
            }
          }}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setHovered(true);
          }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || reduceMotion()) return;
            const r = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            tilt(x * 16, -y * 12);
          }}
          onPointerLeave={() => {
            setHovered(false);
            tilt(0, 0);
          }}
        >
          <div
            ref={tiltRef}
            className={
              "transition-transform duration-200 ease-out [transform-style:preserve-3d] " +
              "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_scale(var(--s,1))] " +
              "hover:[--s:1.03] motion-reduce:transition-none"
            }
          >
          <div
            className={
              "grid min-h-[480px] w-full transition-transform duration-[800ms] " +
              "ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none " +
              "[transform-style:preserve-3d] " +
              (flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]")
            }
          >
            {/* Frente */}
            <div aria-hidden={flipped} className={FACE}>
              <div className={BAND}>
                <span>Developer ID</span>
                <span className="text-[#a9a6a0]">{PROFILE.initials}</span>
              </div>

              <div className="mx-auto mt-6 flex h-[170px] w-[140px] items-center justify-center overflow-hidden rounded-2xl bg-[#2a2a2a] ring-4 ring-ink/10">
                {PROFILE.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${base}${PROFILE.photo}`}
                    alt={`Foto de ${PROFILE.name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className="font-serif text-6xl text-paper/70">
                    {PROFILE.initials}
                  </span>
                )}
              </div>

              <p className="mt-5 px-6 text-center font-serif text-[32px] leading-none text-balance">
                {PROFILE.name}
              </p>
              <p className="label mt-2 text-center text-mute">{PROFILE.role}</p>

              <div className="mt-5 px-6">
                <Line term="ID No.">{PROFILE.card.id}</Line>
                <Line term="Dept.">{PROFILE.card.dept}</Line>
                <Line term="Experiencia">{PROFILE.card.experience}</Line>
              </div>

              <div className="mt-auto flex items-end justify-between px-6 pb-5 pt-4">
                <svg
                  aria-hidden="true"
                  viewBox={`0 0 ${BARS_WIDTH} 30`}
                  className="h-8 w-28 fill-ink"
                  preserveAspectRatio="none"
                >
                  {BARS.map((b) => (
                    <rect key={b.x} x={b.x} y={0} width={b.w} height={30} />
                  ))}
                </svg>
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#b8b8b8_70%)] font-serif text-sm text-ink/60 shadow-inner"
                >
                  {PROFILE.initials}
                </span>
              </div>
            </div>

            {/* Reverso */}
            <div aria-hidden={!flipped} className={FACE_BACK}>
              <div className={BAND}>
                <span>Ficha técnica</span>
                <span aria-hidden="true" className="text-[#a9a6a0]">
                  ↻
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-4 px-6 pb-6">
                <Fact term="Backend">{namesOf("Backend", "uso")}</Fact>
                <Fact term="DevOps">{namesOf("DevOps y entrega", "uso")}</Fact>
                <Fact term="Aprendiendo">{learning}</Fact>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
