"use client";

import { useState } from "react";
import { LEVELS, PROJECTS, SKILL_GROUPS, type Level } from "../content/data";
import { SKILL_ICONS } from "../content/icons";

type Filter = "todos" | Level;

const CHIPS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todo" },
  { id: "uso", label: "En uso" },
  { id: "practica", label: "Practicando" },
  { id: "aprendiendo", label: "Aprendiendo" },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, family: group.family })),
);

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const CHIP_BASE =
  "label min-h-11 rounded-full border border-ink px-5 transition " + FOCUS;
const CHIP_ON = "bg-ink text-paper";
const CHIP_OFF = "bg-transparent text-ink hover:bg-soft";

/* Una casilla por nivel: borde grueso = lo uso, borde suave = lo practico, punteada = aprendiendo. */
const TILE_BASE =
  "flex aspect-[1/1.05] w-full flex-col justify-between rounded-2xl border " +
  "px-4 py-3.5 text-left transition duration-300 hover:-translate-y-1 " +
  "disabled:pointer-events-none disabled:opacity-20 " +
  FOCUS;
const TILE_BY_LEVEL: Record<Level, string> = {
  uso: "border-2 border-ink bg-card text-ink",
  practica: "border-ink/25 bg-card text-ink",
  aprendiendo: "border-dashed border-[#a9a6a0] bg-transparent text-mute",
};
const TILE_ACTIVE = "outline-2 outline-offset-4 outline-ink";

const PANEL_CLASS =
  "order-first grid gap-8 rounded-2xl border border-ink/10 bg-card p-6 " +
  "md:order-last md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-12 md:p-8";

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [activeId, setActiveId] = useState<string | null>(null);

  const matches = ALL_SKILLS.filter((s) => filter === "todos" || s.level === filter);
  const active = matches.find((s) => s.id === activeId) ?? matches[0];
  const level = LEVELS.find((l) => l.id === active.level);
  const icon = SKILL_ICONS[active.id];
  const projects = PROJECTS.filter((p) => p.tech.includes(active.id));
  const numberOf = (id: string) =>
    String(ALL_SKILLS.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <section id="skills" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <p className="label text-mute">02 · Stack</p>
      <h2 className="title mt-4 text-5xl sm:text-7xl lg:text-[5.5rem]">
        La tabla periódica <em className="title-accent">DevOps.</em>
      </h2>

      <div
        role="group"
        aria-label="Filtrar por nivel"
        className="mt-9 flex flex-wrap items-center gap-2.5"
      >
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            aria-pressed={filter === chip.id}
            onClick={() => setFilter(chip.id)}
            className={`${CHIP_BASE} ${filter === chip.id ? CHIP_ON : CHIP_OFF}`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-8">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {ALL_SKILLS.map((skill) => {
          const isMatch = filter === "todos" || skill.level === filter;
          const isActive = isMatch && skill.id === active.id;
          return (
            <li key={skill.id}>
              <button
                type="button"
                disabled={!isMatch}
                aria-current={isActive}
                onMouseEnter={() => setActiveId(skill.id)}
                onFocus={() => setActiveId(skill.id)}
                onClick={() => setActiveId(skill.id)}
                className={`${TILE_BASE} ${TILE_BY_LEVEL[skill.level]} ${isActive ? TILE_ACTIVE : ""}`}
              >
                <span className="label text-[11px] leading-snug opacity-80">
                  {numberOf(skill.id)} · {skill.family}
                </span>
                <span>
                  <span className="block font-serif text-5xl leading-none">
                    {skill.symbol}
                  </span>
                  <span className="mt-1 block text-[15px] leading-tight">{skill.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <aside aria-live="polite" className={PANEL_CLASS}>
        <div className="flex items-end gap-5">
          <p className="font-serif text-8xl leading-none">{active.symbol}</p>
          {icon && (
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={icon.title}
              className="size-16 shrink-0 fill-current text-ink"
            >
              <path d={icon.path} />
            </svg>
          )}
        </div>

        <div>
          <p className="label text-mute">
            {numberOf(active.id)} · {active.family}
          </p>
          <h3 className="title mt-2 text-4xl">{active.name}</h3>
          <p className="mt-3 text-ink-2">
            <strong className="font-medium text-ink">{level?.label}.</strong> {level?.hint}
          </p>
        </div>

        <div>
          <p className="label text-mute">Dónde la uso</p>
          {projects.length > 0 ? (
            <ul className="mt-2 flex flex-col gap-1">
              {projects.map((project) => (
                <li key={project.id}>
                  {project.title}
                  {project.status === "planeado" ? " (planeado)" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-mute">Aún sin proyecto asociado en este portafolio.</p>
          )}
        </div>
      </aside>
      </div>

      <p className="mt-10 text-xs text-mute">
        Logos de Simple Icons (CC0). Las marcas pertenecen a sus respectivos propietarios.
      </p>
    </section>
  );
}
