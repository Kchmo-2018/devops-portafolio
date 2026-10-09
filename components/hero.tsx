import { PROFILE } from "../content/data";

const LINKS = [
    { label: "GitHub", href: PROFILE.github },
    { label: "LinkedIn", href: PROFILE.linkedin},
    { label: "Este repositorio", href: PROFILE.repo},
    
]

export default function hero() { 
    return (
        <section
            id="top"
            className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-8 px-6 py-24"
        >
      <p className="font-mono text-xs uppercase tracking-widest text-mute">
        {PROFILE.location}
        {PROFILE.remote ? " · Remoto" : ""}
      </p>

      <h1 className="font-serif text-6xl leading-none sm:text-8xl">{PROFILE.name}</h1>

      <p className="font-serif text-3xl italic text-ink-2 sm:text-4xl">{PROFILE.tagline}</p>

      <p className="max-w-xl text-lg text-ink-2">{PROFILE.summary}</p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Escríbeme
        </a>
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {link.label}
          </a>
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-mute">
        {PROFILE.roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>









        </section>
    

)
}