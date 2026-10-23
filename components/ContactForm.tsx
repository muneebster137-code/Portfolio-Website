"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { gsap } from "gsap";
import { identity, services, serviceSlug } from "@/lib/site";
import { contact } from "@/lib/profile";

type Status = "idle" | "sending" | "flying" | "sent" | "error";

// Briefs go straight to the inbox through FormSubmit (no server needed). The first submission sends
// FormSubmit's one-time activation email to this address; the form delivers once that link is clicked.
const FORMSUBMIT = "https://formsubmit.co/ajax/muneebster137@gmail.com";

const field = "w-full bg-transparent border-0 border-b border-void/20 rounded-none px-0 py-3 text-[18px] text-void placeholder:text-void/35 focus:outline-none focus:border-void transition-colors";
const label = "label text-void/55";

// The sheet's outline as six points, from a flat page to a folded point to a paper plane.
const SHAPES = {
  page: "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)",
  folded: "polygon(0% 0%, 55% 0%, 100% 50%, 55% 100%, 0% 100%, 0% 50%)",
  plane: "polygon(0% 12%, 55% 34%, 100% 50%, 55% 66%, 0% 88%, 18% 50%)",
};

// The brief is written on a sheet of A4. Sent, the sheet folds into a paper plane and flies off.
// Name, email, brand, service (pre-selected from the page you came from), brief and an optional timeline.
export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const sheet = useRef<HTMLDivElement>(null);

  const flyAway = () => {
    const el = sheet.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setStatus("sent");
    setStatus("flying");
    const r = el.getBoundingClientRect();
    gsap
      .timeline({ onComplete: () => setStatus("sent") })
      .to(el.querySelector("form"), { autoAlpha: 0, duration: 0.3 })
      .to(el, { clipPath: SHAPES.folded, scaleY: 0.55, duration: 0.45, ease: "power2.inOut" })
      .to(el, { clipPath: SHAPES.plane, scaleX: 0.42, scaleY: 0.2, duration: 0.45, ease: "power2.inOut" })
      .to(el, {
        keyframes: [
          { x: 30, y: 30, rotation: 6, duration: 0.35, ease: "power1.out" },
          { x: window.innerWidth - r.left, y: -r.top - r.height, rotation: -18, scale: 0.05, duration: 1.1, ease: "power2.in" },
        ],
      });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (form._honey) return; // filled only by bots
    const service = services.find((s) => serviceSlug(s) === form.service)?.name ?? "Not chosen";
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(FORMSUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New project brief from ${form.name}${form.brand ? ` (${form.brand})` : ""}`,
          _template: "table",
          _replyto: form.email,
          Name: form.name,
          email: form.email,
          "Brand or company": form.brand || "Not given",
          Service: service,
          Brief: form.brief,
          Timeline: form.timeline || "Not given",
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || String(body.success) !== "true") throw new Error();
      flyAway();
    } catch {
      setError(`Couldn't send that. Email ${identity.email} instead.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-10">
        <p className="label text-fog">Sent</p>
        <p className="type-x mt-4 text-[32px] md:text-[44px] leading-[1.05]">{contact.success}</p>
      </div>
    );
  }

  return (
    // The shadow sits on a wrapper: the sheet's own outline is clipped, and a drop shadow follows it.
    <div className="[filter:drop-shadow(0_28px_36px_rgba(0,0,0,0.55))]">
      <div ref={sheet} className="relative bg-[#F2EFE7] text-void p-6 md:p-12 origin-center will-change-transform" style={{ clipPath: SHAPES.page }}>
        <form onSubmit={onSubmit} className="grid gap-10">
          <div className="flex justify-between label text-void/45" aria-hidden="true">
            <span>A sheet of A4</span>
            <span>Your brief</span>
          </div>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid md:grid-cols-2 gap-10">
            <label className="block">
              <span className={label}>Name</span>
              <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
            </label>
            <label className="block">
              <span className={label}>Email</span>
              <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@brand.com" />
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <label className="block">
              <span className={label}>Brand or company</span>
              <input name="brand" autoComplete="organization" className={field} placeholder="Brand name" />
            </label>
            <label className="block">
              <span className={label}>Service</span>
              <select name="service" defaultValue={preset} className={`${field} appearance-none cursor-pointer`}>
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.code} value={serviceSlug(s)}>{s.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className={label}>Short brief</span>
            <textarea name="brief" required rows={4} className={`${field} resize-none`} placeholder="What should people feel, remember and do?" />
          </label>
          <label className="block md:max-w-[50%]">
            <span className={label}>Timeline (optional)</span>
            <input name="timeline" className={field} placeholder="When do you need it?" />
          </label>
          <div className="flex flex-wrap items-center gap-6">
            <button type="submit" disabled={status === "sending" || status === "flying"} className="inline-flex h-16 items-center gap-3 rounded-full bg-signal px-9 text-lg font-medium text-void hover:bg-void hover:text-bone transition-colors disabled:opacity-60">
              {status === "sending" ? "Sending" : "Start a project"}
            </button>
            {status === "error" && <p role="alert" className="text-[15px] text-[#C2360F]">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
