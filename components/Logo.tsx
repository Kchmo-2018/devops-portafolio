import { PROFILE } from "../content/data";

/* Monograma KM: mismas formas que app/icon.svg (el favicon), dibujadas con trazos
   para no depender de ninguna fuente. El nombre accesible sale de PROFILE. */
export default function Logo({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label={PROFILE.name} className={className}>
      <rect width="32" height="32" rx="8" fill="var(--color-ink)" />
      <clipPath id="km-clip">
        <rect x="0" y="9" width="32" height="14" />
      </clipPath>
      <g
        clipPath="url(#km-clip)"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2.6"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M7.6 8v16M14 8 8 16.2M10.6 13l3.6 11" />
        <path d="M17 23V9.6l3.6 8 3.6-8V23" />
      </g>
      <circle cx="27.6" cy="22.2" r="1.4" fill="var(--color-mute)" />
    </svg>
  );
}
