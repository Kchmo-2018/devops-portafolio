import { SKILL_GROUPS } from "../content/data";
import { SKILL_ICONS } from "../content/icons";

const NAME_BY_ID = new Map(
  SKILL_GROUPS.flatMap((g) => g.skills).map((s) => [s.id, s.name] as const),
);

const CHIP =
  "inline-flex items-center gap-2 rounded-full border border-ink/10 bg-soft " +
  "px-3.5 py-1.5 text-[13px] font-medium text-ink";

/* Chip redondeado con el logo de la tecnología. Va dentro de un <ul>. */
export default function TechChip({ id }: { id: string }) {
  const icon = SKILL_ICONS[id];
  return (
    <li className={CHIP}>
      {icon && (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0 fill-current">
          <path d={icon.path} />
        </svg>
      )}
      {NAME_BY_ID.get(id) ?? id}
    </li>
  );
}
