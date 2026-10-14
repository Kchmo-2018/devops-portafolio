import { ABOUT, EDUCATION, EXPERIENCE, HERO, LANGUAGES, PROFILE } from "../content/data";
import IdCard from "./IdCard";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const BTN =
  "inline-flex min-h-[52px] items-center rounded-full border px-7 text-[15px] transition " +
  FOCUS;
const BTN_MAIN = BTN + " border-ink bg-ink text-paper hover:bg-ink-2";
const BTN_LINE = BTN + " border-ink/25 hover:border-ink hover:bg-soft";

const education = EDUCATION[0];
const current = EXPERIENCE.find((e) => e.end === null);

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-ink/10 py-4 first:border-t-0 first:pt-0">
      <dt className="label pt-1 text-mute">{term}</dt>
      <dd className="leading-snug">{children}</dd>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1320px] px-6 py-24 sm:px-12 sm:py-28">
      <div className="grid gap-x-10 gap-y-16 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] lg:items-start">
        {/* Izquierda: presentación */}
        <div className="min-w-0 lg:pt-10">
          <p className="label text-mute">{ABOUT.label}</p>
          <h2 className="headline mt-4 text-5xl sm:text-6xl xl:text-[4rem]">
            {ABOUT.title} <em>{ABOUT.accent}</em>
          </h2>
          <p className="mt-8 max-w-[34rem] text-[19px] text-ink-2">{PROFILE.summary}</p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <a href={HERO.secondary.href} className={BTN_MAIN}>
              {HERO.secondary.label}
            </a>
            {HERO.links.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_LINE}
              >
                {link.label}&nbsp;<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Centro: credencial colgada de la cinta (arranca en el borde de la sección) */}
        <div className="mt-2 flex min-w-0 justify-center lg:-mt-28">
          <IdCard />
        </div>

        {/* Derecha: ficha estática + lema */}
        <div className="min-w-0 lg:pt-10">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <p className="label mb-6 text-mute">{ABOUT.factsTitle}</p>
            <dl>
              <Row term="Ubicación">
                {PROFILE.location}
                {PROFILE.remote ? " · Remoto" : ""}
              </Row>
              <Row term="Formación">
                {education.title} · {education.org.split(" · ")[0]}
              </Row>
              {current && (
                <Row term="Actual">
                  {current.title} · {current.org}
                </Row>
              )}
              <Row term="Correo">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className={`text-sm underline underline-offset-4 [overflow-wrap:anywhere] ${FOCUS}`}
                >
                  {PROFILE.email}
                </a>
              </Row>
              <Row term="Idiomas">
                {LANGUAGES.map((l) => (
                  <span key={l.name} className="block">
                    {l.name} · {l.level}
                  </span>
                ))}
              </Row>
            </dl>
          </div>

          <figure className="mt-10 px-2">
            <blockquote className="font-serif text-[30px] italic leading-[1.15]">
              “{PROFILE.quote}”
            </blockquote>
            <figcaption className="label mt-4 text-mute">— {ABOUT.quoteBy}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
