"use client";

import { useState } from "react";
import { LANGUAGES, PROFILE, SKILL_GROUPS, type Level } from "../content/data";

/* Nombres de las skills de una familia con un nivel dado, para la ficha técnica. */
const namesOf = (family: string, level: Level) =>
  (SKILL_GROUPS.find((g) => g.family === family)?.skills ?? [])
    .filter((s) => s.level === level)
    .map((s) => s.name)
    .join(", ");

const learning = SKILL_GROUPS.flatMap((g) => g.skills)
  .filter((s) => s.level === "aprendiendo")
  .map((s) => s.name)
  .join(", ");

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const PHOTO_BOX =
  "my-6 flex h-[210px] items-center justify-center overflow-hidden rounded-[14px] bg-[#2a2a2a]";
/* Las dos caras ocupan la misma celda de la cuadrícula: la tarjeta crece con la más alta. */
const FACE =
  "flex flex-col rounded-3xl p-7 [grid-area:1/1] [backface-visibility:hidden]";
const FACE_FRONT = FACE + " bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(13,13,13,0.5)]";
const FACE_BACK =
  FACE +
  " border border-ink/10 bg-white text-ink [transform:rotateY(180deg)] " +
  "shadow-[0_40px_80px_-40px_rgba(13,13,13,0.3)]";
const FLIP_BTN =
  "label min-h-11 rounded-full border border-ink px-5.5 transition hover:bg-soft " + FOCUS;

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label text-mute">{term}</p>
      <p className="mt-0.5 text-[15px] leading-snug">{children}</p>
    </div>
  );
}

export default function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-5">
      {/* Cordón del que cuelga la tarjeta */}
      <div aria-hidden="true" className="h-[70px] w-px bg-ink/50" />

      <div className="-mt-5 w-[340px] max-w-full [perspective:1400px]">
        <div
          className={
            "grid min-h-[500px] w-full transition-transform duration-[800ms] " +
            "ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none " +
            "[transform-style:preserve-3d] " +
            (flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]")
          }
        >
          {/* Frente */}
          <div aria-hidden={flipped} className={FACE_FRONT}>
            <p className="label text-[#a9a6a0]">ID · {PROFILE.card.dept}</p>
            <div className={PHOTO_BOX}>
              {PROFILE.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${base}${PROFILE.photo}`}
                  alt={`Foto de ${PROFILE.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span aria-hidden="true" className="font-serif text-7xl text-paper/70">
                  {PROFILE.initials}
                </span>
              )}
            </div>
            <p className="font-serif text-[40px] leading-none text-balance">{PROFILE.name}</p>
            <p className="label mt-2.5 text-[#a9a6a0]">{PROFILE.role}</p>
            <p className="label mt-auto flex justify-between">
              <span>ID No. {PROFILE.card.id}</span>
              <span aria-hidden="true">Girar ↻</span>
            </p>
          </div>

          {/* Reverso */}
          <div aria-hidden={!flipped} className={FACE_BACK}>
            <p className="label text-mute">Ficha técnica</p>
            <div className="mt-5 flex flex-col gap-3.5">
              <Row term="Dept.">{PROFILE.card.dept}</Row>
              <Row term="Base">
                {PROFILE.location}
                {PROFILE.remote ? " · Remoto" : ""}
              </Row>
              <Row term="Idiomas">
                {LANGUAGES.map((l) => l.name).join(" · ")}
              </Row>
              <Row term="Backend">{namesOf("Backend", "uso")}</Row>
              <Row term="DevOps">{namesOf("DevOps y entrega", "uso")}</Row>
              <Row term="Aprendiendo">{learning}</Row>
            </div>
            <p aria-hidden="true" className="label mt-auto text-right text-mute">
              Girar ↻
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((v) => !v)}
        className={FLIP_BTN}
      >
        Girar tarjeta
      </button>
    </div>
  );
}
