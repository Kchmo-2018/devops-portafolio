import { PROFILE } from "../content/data";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-6 px-6">
      <p className="font-mono text-xs uppercase tracking-widest text-mute">{PROFILE.location}</p>
      <h1 className="font-serif text-7xl leading-none">{PROFILE.name}</h1>
      <p className="max-w-xl text-lg text-ink-2">{PROFILE.summary}</p>
    </main>
  );
}