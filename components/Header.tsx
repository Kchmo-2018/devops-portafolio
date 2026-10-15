import { NAV, PROFILE } from "../content/data";
import Logo from "./Logo";

const LINK =
  "block whitespace-nowrap rounded-full px-4 py-2.5 text-sm text-ink-2 transition " +
  "hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 pt-6 sm:px-12">
      <a
        href="#top"
        aria-label={`${PROFILE.name}, ir al inicio`}
        className="rounded-xl transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <Logo />
      </a>
      <nav
        aria-label="Principal"
        className="max-w-full overflow-x-auto rounded-full border border-ink/10 bg-white/70 p-1.5"
      >
        <ul className="flex gap-0.5">
          {NAV.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={LINK}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
