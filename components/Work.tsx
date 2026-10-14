"use client";

import { useState } from "react";
import { PROJECTS, SKILL_GROUPS, WORK, type Project } from "../content/data";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const NAME_BY_ID = new Map(
  SKILL_GROUPS.flatMap((g) => g.skills).map((s) => [s.id, s.name] as const),
);

const ITEMS = WORK.featured
  .map((id) => PROJECTS.find((p) => p.id === id))
  .filter((p): p is Project => Boolean(p));

/* Acordeón: en escritorio se reparte en fila y el abierto crece; en móvil se apila. */
const LIST = "mt-10 flex flex-col gap-3 lg:min-h-[640px] lg:flex-row lg:gap-4";
const ITEM =
  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "motion-reduce:transition-none lg:flex-[1_1_0%] ";
const ITEM_OPEN = "lg:flex-[4_1_0%]";

const PANEL = "flex h-full flex-col overflow-hidden rounded-3xl border ";
const PANEL_ON = "border-ink bg-card text-ink";
const PANEL_OFF = "border-ink/15 bg-card text-ink transition hover:border-ink/40";

const HEAD = "flex w-full text-left " + FOCUS;
const HEAD_ON = "flex-col gap-4 p-6 pb-0 sm:p-8 sm:pb-0";
const HEAD_OFF =
  "items-center justify-between gap-4 p-5 sm:p-6 " +
  "lg:h-full lg:flex-col lg:items-start lg:justify-between";

const CHIP =
  "label rounded-full border border-ink/30 px-3 py-1 text-[11px] text-ink-2";
const STEP = "rounded-lg border border-ink/20 bg-white px-3 py-2.5 text-center text-[13px] leading-tight";
const STEP_LAST = "rounded-lg border border-ink bg-ink px-3 py-2.5 text-center text-[13px] leading-tight text-paper";
const REPO_LINK =
  "inline-flex min-h-11 items-center rounded-full border border-ink/30 px-5 " +
  "text-sm transition hover:bg-soft focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <p className="label text-mute">{WORK.label}</p>
      <h2 className="headline mt-4 text-5xl sm:text-7xl lg:text-[5.5rem]">
        {WORK.title} <em>{WORK.accent}</em>
      </h2>

      <ul className={LIST}>
        {ITEMS.map((p, i) => {
          const open = i === active;
          const panelId = `work-${p.id}`;
          const num = String(i + 1).padStart(2, "0");
          return (
            <li key={p.id} className={ITEM + (open ? ITEM_OPEN : "")}>
              <div className={PANEL + (open ? PANEL_ON : PANEL_OFF)}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={open ? panelId : undefined}
                  onClick={() => setActive(i)}
                  className={`${HEAD} ${open ? HEAD_ON : HEAD_OFF}`}
                >
                  {open ? (
                    <>
                      <span className="label flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-1 opacity-70">
                        <span>
                          {num} · {p.kicker}
                        </span>
                        <span>{WORK.statuses[p.status]}</span>
                      </span>
                      <span className="headline block text-4xl sm:text-5xl xl:text-6xl">
                        {p.title}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="label text-mute">{num}</span>
                      <span className="font-serif text-2xl leading-none lg:rotate-180 lg:text-[28px] lg:[writing-mode:vertical-rl]">
                        {p.short ?? p.title}
                      </span>
                      <span className="label shrink-0 whitespace-nowrap text-mute lg:hidden">{WORK.open} +</span>
                    </>
                  )}
                </button>

                {open && (
                  <div
                    id={panelId}
                    className="flex flex-1 flex-col gap-6 p-6 pt-5 sm:p-8 sm:pt-5"
                  >
                    <p className="max-w-[34rem] text-[17px] text-ink-2">{p.description}</p>

                    <ul className="flex flex-col gap-1.5 text-[15px] text-ink-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span aria-hidden="true" className="text-mute">
                            —
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <ul aria-label="Tecnologías" className="flex flex-wrap gap-2">
                      {p.tech.map((id) => (
                        <li key={id} className={CHIP}>
                          {NAME_BY_ID.get(id) ?? id}
                        </li>
                      ))}
                    </ul>

                    {p.flow && (
                      <div className="mt-auto rounded-2xl border border-ink/10 bg-paper p-4 text-ink">
                        <p className="label mb-3 text-mute">{WORK.flowTitle}</p>
                        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {p.flow.map((step, n) => (
                            <li
                              key={step}
                              className={n === p.flow!.length - 1 ? STEP_LAST : STEP}
                            >
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {p.github && (
                      <div>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={REPO_LINK}
                        >
                          {WORK.repo}&nbsp;<span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
