"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, PROFILE } from "../content/data";

/* Fila oscura con el correo: el enlace abre el cliente de correo y el botón lo copia. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`; // sin permiso de portapapeles
    }
  };

  return (
    <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[2rem] bg-ink px-6 py-3 text-paper sm:rounded-full">
      <a
        href={`mailto:${PROFILE.email}`}
        className="text-[15px] [overflow-wrap:anywhere] sm:text-[17px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
      >
        {PROFILE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="label shrink-0 rounded-full border border-paper/30 px-3 py-1.5 transition hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
        <span aria-live="polite">{copied ? CONTACT.copied : CONTACT.copy}</span>
      </button>
    </div>
  );
}
