"use client";

import { useState } from "react";
import { serviceSlug } from "@/lib/site";
import { useContent, useLang, useUI } from "@/components/i18n";
import { fill } from "@/lib/ui";


export type Brief = { text: string; service: string; timeline: string; services: string[] };

// Joins a list with the language's "and"; service names get "plus", since several already contain "and".
const list = (xs: string[], last: string) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ${last} ${xs[xs.length - 1]}`);

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`h-10 rounded-full px-4 text-[15px] ring-1 transition-colors ${on ? "bg-void text-bone ring-void" : "ring-void/20 text-void/80 hover:ring-void/60"}`}
    >
      {children}
    </button>
  );
}

// For visitors who don't know where to start: three quick choices become a written brief, with the
// case studies closest to it. "Use this brief" fills in the form below.
export function BriefBuilder({ onUse }: { onUse: (b: Brief) => void }) {
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState<string[]>([]);
  const [when, setWhen] = useState("");
  const [feel, setFeel] = useState<string[]>([]);
  const { services, cases } = useContent();
  const t = useUI().builder;
  const WHEN = t.whenOptions;
  // Turkish needs its own lowercase rules (İ → i, I → ı).
  const lang = useLang();
  const lower = (s: string) => s.toLocaleLowerCase(lang === "tr" ? "tr" : "en");
  // A sentence can begin with the list (in Turkish it does), so its first letter is capitalised after filling.
  const cap = (s: string) => s.charAt(0).toLocaleUpperCase(lang === "tr" ? "tr" : "en") + s.slice(1);
  const FEELINGS = t.feelings;

  const toggle = (xs: string[], x: string, max = 99) => (xs.includes(x) ? xs.filter((y) => y !== x) : xs.length < max ? [...xs, x] : xs);
  const chosen = services.filter((s) => need.includes(serviceSlug(s)));
  const similar = cases
    .map((c) => ({ c, score: c.relatedServices.filter((r) => need.includes(r)).length }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => m.c);
  const text = [
    chosen.length ? cap(fill(t.looking, { list: list(chosen.map((s) => lower(s.name)), t.plus) })) : "",
    feel.length ? cap(fill(t.feelLine, { list: list(feel.map(lower), t.and) })) : "",
    similar.length ? cap(fill(t.close2, { list: list(similar.map((c) => c.title), t.and) })) : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="self-start text-left text-[15px] text-void/70 underline decoration-void/25 underline-offset-4 hover:text-void hover:decoration-void">
        {t.open}
      </button>
    );
  }

  return (
    <div className="grid gap-7 border border-void/15 p-5 md:p-7">
      <div>
        <p className="label text-void/55">{t.need}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <Chip key={s.code} on={need.includes(serviceSlug(s))} onClick={() => setNeed((xs) => toggle(xs, serviceSlug(s)))}>
              {s.short}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="label text-void/55">{t.when}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {WHEN.map((w) => (
            <Chip key={w} on={when === w} onClick={() => setWhen(when === w ? "" : w)}>
              {w}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="label text-void/55">{t.feel}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {FEELINGS.map((f) => (
            <Chip key={f} on={feel.includes(f)} onClick={() => setFeel((xs) => toggle(xs, f, 3))}>
              {f}
            </Chip>
          ))}
        </div>
      </div>

      {text && (
        <div className="border-t border-void/15 pt-5">
          <p className="label text-void/55">{t.yourBrief}</p>
          <p className="mt-2 type-c text-[19px] leading-[1.4] text-void/85">{text}</p>
          {similar.length > 0 && (
            <p className="mt-3 text-[14px] text-void/60">
              {t.see}{" "}
              {similar.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && ", "}
                  <a href={`/case-studies/${c.slug}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-void">{c.title}</a>
                </span>
              ))}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={!text}
          data-track="brief_builder_used"
          onClick={() => {
            onUse({ text, service: need[0] ?? "", timeline: when, services: need });
            setOpen(false);
          }}
          className="inline-flex h-12 items-center rounded-full bg-void px-6 text-[15px] font-medium text-bone disabled:opacity-40 transition-opacity"
        >
          {t.use}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-[14px] text-void/60 hover:text-void">{t.close}</button>
      </div>
    </div>
  );
}
