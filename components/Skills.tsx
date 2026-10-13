"use client";

import { useState } from "react";
import { LEVELS, PROJECTS, SKILL_GROUPS, type Level } from "../content/data";
import { SKILL_ICONS } from "../content/icons";

const TODOS = "todos";

const ALL_SKILLS = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, family: group.family })),
);

const DOT: Record<Level, string> = {
  uso: "bg-ink",
  practica: "bg-mute",
  aprendiendo: "border border-ink/40",
};

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const TAB_BASE = "rounded-full border px-4 py-2 text-sm transition " + FOCUS;
const TAB_ON = "border-ink bg-ink text-paper";
const TAB_OFF = "border-ink/20 hover:border-ink";

const TILE_BASE =
  "flex aspect-square w-full flex-col justify-between rounded-lg border " +
  "p-3 text-left transition " +
  FOCUS;
const TILE_ON = "border-ink bg-ink text-paper";
const TILE_OFF = "border-ink/10 bg-card hover:border-ink/40";

const ASIDE_CLASS =
  "order-first rounded-xl border border-ink/10 bg-card p-6 " +
  "md:order-last md:sticky md:top-8 md:self-start";

export default function Skills() {
  const [filter, setFilter] = useState<string>(TODOS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible =
    filter === TODOS ? ALL_SKILLS : ALL_SKILLS.filter((s) => s.family === filter);
  const active = visible.find((s) => s.id === activeId) ?? visible[0];
  const level = LEVELS.find((l) => l.id === active.level);
  const icon = SKILL_ICONS[active.id];
  const projects = PROJECTS.filter((p) => p.tech.includes(active.id));
  const numberOf = (id: string) =>
    String(ALL_SKILLS.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-mute">Stack</p>
      <h2 className="mt-3 headline text-4xl sm:text-5xl">
        Tecnologías con las que trabajo
      </h2>
      <p className="mt-4 max-w-xl text-ink-2">
        Pasa el cursor, enfoca con el teclado o toca una casilla para ver dónde la he
        usado.
      </p>

      <div role="group" aria-label="Filtrar por familia" className="mt-8 flex flex-wrap gap-2">
        {[TODOS, ...SKILL_GROUPS.map((g) => g.family)].map((family) => (
          <button
            key={family}
            type="button"
            aria-pressed={filter === family}
            onClick={() => setFilter(family)}
            className={`${TAB_BASE} ${filter === family ? TAB_ON : TAB_OFF}`}
          >
            {family === TODOS ? "Todas" : family}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_18rem]">
        <ul className="grid grid-cols-3 content-start gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {visible.map((skill) => {
            const isActive = skill.id === active.id;
            return (
              <li key={skill.id}>
                <button
                  type="button"
                  aria-current={isActive}
                  onMouseEnter={() => setActiveId(skill.id)}
                  onFocus={() => setActiveId(skill.id)}
                  onClick={() => setActiveId(skill.id)}
                  className={`${TILE_BASE} ${isActive ? TILE_ON : TILE_OFF}`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[10px] opacity-60">
                      {numberOf(skill.id)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full ${isActive ? "bg-paper" : DOT[skill.level]}`}
                    />
                  </span>
                  <span>
                    <span className="block headline text-4xl">
                      {skill.symbol}
                    </span>
                    <span className="mt-1 block text-xs leading-tight opacity-80">
                      {skill.name}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <aside aria-live="polite" className={ASIDE_CLASS}>
          <p className="font-mono text-xs text-mute">
            {numberOf(active.id)} · {active.family}
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="headline text-7xl">{active.symbol}</p>
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
          <h3 className="mt-3 text-xl font-medium">{active.name}</h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink-2">
            <span aria-hidden="true" className={`size-2 rounded-full ${DOT[active.level]}`} />
            {level?.label}: {level?.hint}
          </p>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-mute">
            Dónde la uso
          </p>
          {projects.length > 0 ? (
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              {projects.map((project) => (
                <li key={project.id}>
                  {project.title}
                  {project.status === "planeado" ? " (planeado)" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-mute">
              Aún sin proyecto asociado en este portafolio.
            </p>
          )}
        </aside>
      </div>

      <p className="mt-10 text-xs text-mute">
        Logos de Simple Icons (CC0). Las marcas pertenecen a sus respectivos propietarios.
      </p>
    </section>
  );
}
