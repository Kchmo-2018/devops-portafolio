import { FOOTER } from "../content/data";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1320px] px-6 sm:px-12">
      <p className="label border-t border-ink/15 py-6 text-mute">{FOOTER.text}</p>
    </footer>
  );
}
