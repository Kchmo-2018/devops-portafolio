import { HERO } from "../content/data";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const BTN =
  "inline-flex min-h-[52px] items-center rounded-full border border-ink px-7 " +
  "text-[15px] transition " +
  FOCUS;
const BTN_MAIN = "bg-ink text-paper hover:bg-ink-2";

const GHOST_SIZE = "text-[clamp(3.25rem,16.5vw,13.2rem)]";
const ACCENT_SIZE = "text-[clamp(3rem,15.6vw,12.5rem)]";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-6 py-10 sm:px-12">
        <p className="label flex items-center gap-2.5 text-mute">
        </p>

        <p className="label mt-3 text-ink">{HERO.profile}</p>

        <h1 className="mt-5 leading-[0.86]">
          <span
            className={`ghost block font-medium uppercase tracking-[-0.04em] ${GHOST_SIZE}`}
          >
            {HERO.ghost}
          </span>
          <span
            className={`-mt-2 block font-serif italic tracking-[-0.03em] ${ACCENT_SIZE}`}
          >
            {HERO.accent}
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <p className="max-w-[35rem] text-xl text-ink-2">{HERO.lead}</p>
          <div className="flex flex-wrap gap-3">
            <a href={HERO.secondary.href} className={`${BTN} ${BTN_MAIN}`}>
              {HERO.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
