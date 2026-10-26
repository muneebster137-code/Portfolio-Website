"use client";

import { useState } from "react";
import { services, serviceSlug } from "@/lib/site";
import { cases } from "@/lib/cases";

const WHEN = ["This month", "In one to three months", "Just exploring"];
const FEELINGS = ["Trust", "Excitement", "Calm", "Luxury", "Joy", "Curiosity", "Belonging"];

export type Brief = { text: string; service: string; timeline: string; services: string[] };

// Joins with "plus" rather than "and": several service names already contain "and".
const list = (xs: string[], last = "and") => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ${last} ${xs[xs.length - 1]}`);

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

  const toggle = (xs: string[], x: string, max = 99) => (xs.includes(x) ? xs.filter((y) => y !== x) : xs.length < max ? [...xs, x] : xs);
  const chosen = services.filter((s) => need.includes(serviceSlug(s)));
  const similar = cases
    .map((c) => ({ c, score: c.relatedServices.filter((r) => need.includes(r)).length }))
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((m) => m.c);
  const text = [
    chosen.length ? `I'm looking for ${list(chosen.map((s) => s.name.toLowerCase()), "plus")}.` : "",
    feel.length ? `When people see it, they should feel ${list(feel.map((f) => f.toLowerCase()))}.` : "",
    similar.length ? `Work of yours that's close: ${list(similar.map((c) => c.title))}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="self-start text-left text-[15px] text-void/70 underline decoration-void/25 underline-offset-4 hover:text-void hover:decoration-void">
        Not sure what to write? Build your brief in three taps
      </button>
    );
  }

  return (
    <div className="grid gap-7 border border-void/15 p-5 md:p-7">
      <div>
        <p className="label text-void/55">1 · What do you need?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <Chip key={s.code} on={need.includes(serviceSlug(s))} onClick={() => setNeed((xs) => toggle(xs, serviceSlug(s)))}>
              {s.short}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="label text-void/55">2 · When?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {WHEN.map((w) => (
            <Chip key={w} on={when === w} onClick={() => setWhen(when === w ? "" : w)}>
              {w}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <p className="label text-void/55">3 · What should people feel? (up to three)</p>
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
          <p className="label text-void/55">Your brief</p>
          <p className="mt-2 type-c text-[19px] leading-[1.4] text-void/85">{text}</p>
          {similar.length > 0 && (
            <p className="mt-3 text-[14px] text-void/60">
              See:{" "}
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
          Use this brief
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-[14px] text-void/60 hover:text-void">Close</button>
      </div>
    </div>
  );
}
