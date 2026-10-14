import { JOURNEY, JOURNEY_HEADER } from "../content/data";
import TechChip from "./TechChip";

export default function Journey() {
  return (
    <section id="experience" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <p className="label text-mute">{JOURNEY_HEADER.label}</p>
      <h2 className="title mt-4 text-5xl sm:text-7xl lg:text-[5.5rem]">
        {JOURNEY_HEADER.title} <em className="title-accent">{JOURNEY_HEADER.accent}</em>
      </h2>
      <p className="mt-6 max-w-[40rem] text-lg text-mute">{JOURNEY_HEADER.intro}</p>

      <ol className="mt-14 border-b border-ink/15">
        {JOURNEY.map((item, i) => (
          <li
            key={item.id}
            className="grid gap-3 border-t border-ink/15 py-8 sm:py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10"
          >
            <p className={`label ${i === 0 ? "text-ink" : "text-mute"}`}>{item.period}</p>
            <div>
              <h3 className="title text-3xl sm:text-4xl">{item.title}</h3>
              <p className="mt-4 max-w-[40rem] text-[17px] leading-relaxed text-mute">{item.text}</p>
              {item.tech && (
                <ul aria-label="Tecnologías" className="mt-5 flex flex-wrap gap-2">
                  {item.tech.map((id) => (
                    <TechChip key={id} id={id} />
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
