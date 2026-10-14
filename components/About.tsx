import { ABOUT, PROFILE } from "../content/data";
import IdCard from "./IdCard";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12 sm:py-28">
      <div className="flex flex-wrap items-center gap-x-[72px] gap-y-14">
        <div className="flex min-w-0 flex-[1_1_440px] justify-center">
          <IdCard />
        </div>

        <div className="min-w-0 flex-[1_1_520px]">
          <p className="label text-mute">{ABOUT.label}</p>
          <h2 className="headline mt-4 text-5xl sm:text-7xl lg:text-[4.75rem]">
            {ABOUT.title} <em>{ABOUT.accent}</em>
          </h2>
          <p className="mt-8 max-w-[35rem] text-[19px] text-ink-2">{PROFILE.summary}</p>

          <div className="mt-9 max-w-[35rem] border-t border-ink/10 pt-6">
            <p className="label mb-2 text-mute">{ABOUT.quoteLabel}</p>
            <p className="font-serif text-[30px] italic leading-[1.15]">“{PROFILE.quote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
