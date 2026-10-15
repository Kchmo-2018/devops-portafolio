import { CONTACT, PROFILE } from "../content/data";
import CopyEmail from "./CopyEmail";

const ROW =
  "flex min-h-16 items-center justify-between gap-4 rounded-full border border-ink px-6 " +
  "transition hover:bg-ink hover:text-paper focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-ink";

const LINKS = [
  { label: "GitHub", hint: "Kchmo-2018", href: PROFILE.github },
  { label: "LinkedIn", hint: "Mi perfil", href: PROFILE.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="label text-mute">{CONTACT.label}</p>
          <h2 className="title mt-4 text-6xl sm:text-8xl lg:text-[6.5rem]">
            {CONTACT.title}
            <em className="title-accent">{CONTACT.accent}</em>
          </h2>
          <p className="mt-7 max-w-[30rem] text-[19px] text-ink-2">{CONTACT.lead}</p>

          <div className="mt-8 border-t border-ink/15 pt-6">
            <p className="label mb-3 text-mute">{CONTACT.nextTitle}</p>
            <ul className="flex flex-col gap-2 text-[15px]">
              {CONTACT.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <CopyEmail />
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={ROW}>
              <span className="text-[17px]">{l.label}</span>
              <span className="label">{l.hint} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
