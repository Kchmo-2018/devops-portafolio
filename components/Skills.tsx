"use client";

import { useState } from "react";
import { LEVELS, PROJECTS, SKILL_GROUPS, type Level } from "../content/data";
import { SKILL_ICONS } from "../content/icons";
import TechChip from "./TechChip";

type Filter = "todos" | Level;

const CHIPS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todo" },
  { id: "uso", label: "En uso" },
  { id: "practica", label: "Practicando" },
  { id: "aprendiendo", label: "Aprendiendo" },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, family: group.family, tag: group.short ?? group.family })),
);

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const CHIP_BASE =
  "label min-h-11 rounded-full border border-ink px-5 transition " + FOCUS;
const CHIP_ON = "bg-ink text-paper";
const CHIP_OFF = "bg-transparent text-ink hover:bg-soft";

/* Una casilla por nivel: borde grueso = lo uso, borde suave = lo practico, punteada = aprendiendo. */
const TILE_BASE =
  "flex h-full min-h-[128px] w-full flex-col justify-between rounded-[14px] border " +
  "px-2.5 py-3 text-left sm:px-3 transition duration-300 hover:-translate-y-[5px] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-[0.18] " +
  FOCUS;
const TILE_BY_LEVEL: Record<Level, string> = {
  uso: "border-2 border-ink bg-card text-ink",
  practica: "border-ink/25 bg-card text-ink",
  aprendiendo: "border-dashed border-[#a9a6a0] bg-transparent text-mute",
};
const TILE_ACTIVE = "-translate-y-[5px] bg-soft";

/* Máximo de herramientas relacionadas visibles en el panel (el resto se cuenta). */
const MAX_RELATED = 4;

/* Ficha lateral: en pantallas grandes queda fija a la derecha mientras se recorre la tabla. */
const PANEL_CLASS =
  "order-first flex flex-col rounded-[22px] border border-ink/10 bg-card p-5 " +
  "lg:sticky lg:top-24 lg:order-last";

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [activeId, setActiveId] = useState<string | null>(null);

  const matches = ALL_SKILLS.filter((s) => filter === "todos" || s.level === filter);
  const active = matches.find((s) => s.id === activeId) ?? matches[0];
  const level = LEVELS.find((l) => l.id === active.level);
  const icon = SKILL_ICONS[active.id];
  const projects = PROJECTS.filter((p) => p.tech.includes(active.id));
  const related = [...new Set(projects.flatMap((p) => p.tech))].filter((id) => id !== active.id);
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

      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
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
                <span className="label text-[10px] opacity-70">{numberOf(skill.id)}</span>
                <span>
                  <span className="block font-serif text-4xl leading-none">{skill.symbol}</span>
                  <span className="mt-1 block [overflow-wrap:anywhere] text-[12px] leading-tight sm:text-[13px] lg:text-[12px] xl:text-[13px]">{skill.name}</span>
                  <span className="label mt-1.5 block text-[8px] opacity-60">{skill.tag}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <aside aria-live="polite" className={PANEL_CLASS}>
        <div className="label flex items-center justify-between text-mute">
          <span>No. {numberOf(active.id)}</span>
          <span>{active.symbol.toUpperCase()}</span>
        </div>

        <div
          className="mt-4 grid aspect-[2/1] place-items-center rounded-2xl sm:aspect-[5/2] lg:aspect-[4/3]"
          style={{
            background: icon
              ? `radial-gradient(circle at 50% 55%, #${icon.hex}2e 0%, rgba(244,242,238,0.6) 72%)`
              : "radial-gradient(circle at 50% 55%, #e1ddd4 0%, rgba(244,242,238,0.6) 72%)",
          }}
        >
          {icon ? (
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={icon.title}
              className="size-24 lg:size-28"
              fill={`#${icon.hex}`}
            >
              <path d={icon.path} />
            </svg>
          ) : (
            <p aria-hidden="true" className="font-serif text-8xl leading-none text-ink">
              {active.symbol}
            </p>
          )}
        </div>

        <h3 className="title mt-5 text-4xl">{active.name}</h3>
        <p className="mt-1 text-[15px] text-mute">{active.family}</p>

        <hr className="my-4 border-ink/10" />

        <p className="text-sm text-mute">
          <strong className="font-medium text-ink">{level?.label}.</strong> {level?.hint}
        </p>

        <div className="mt-4">
          <p className="label text-mute">Dónde la uso</p>
          {projects.length > 0 ? (
            <ul className="mt-2 flex flex-col gap-0.5 text-[15px]">
              {projects.map((project) => (
                <li key={project.id}>
                  {project.title}
                  {project.status === "planeado" ? " (planeado)" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-mute">Aún sin proyecto asociado en este portafolio.</p>
          )}
          {related.length > 0 && (
            <>
              <p className="label mt-4 text-mute">Se usa junto a</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {related.slice(0, MAX_RELATED).map((id) => (
                  <TechChip key={id} id={id} />
                ))}
                {related.length > MAX_RELATED && (
                  <li className="label self-center text-mute">+{related.length - MAX_RELATED}</li>
                )}
              </ul>
            </>
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
