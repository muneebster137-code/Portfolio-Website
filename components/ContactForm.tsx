"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { identity, services, serviceSlug } from "@/lib/site";
import { contact } from "@/lib/profile";

type Status = "idle" | "sending" | "sent" | "error";

// Briefs go straight to the inbox through FormSubmit (no server needed). The first submission sends
// FormSubmit's one-time activation email to this address; the form delivers once that link is clicked.
const FORMSUBMIT = "https://formsubmit.co/ajax/muneebster137@gmail.com";

const field = "w-full bg-transparent border-0 border-b border-bone/25 rounded-none px-0 py-3 text-[18px] text-bone placeholder:text-fog focus:outline-none focus:border-bone transition-colors";

// Name, email, brand, service (pre-selected from the page you came from), brief and an optional timeline.
export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
      setStatus("sent");
    } catch {
      setError(`Couldn't send that. Email ${identity.email} instead.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-10">
        <p className="type-x text-[32px] md:text-[44px] leading-[1.05]">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid md:grid-cols-2 gap-10">
        <label className="block">
          <span className="label text-fog">Name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label text-fog">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@brand.com" />
        </label>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <label className="block">
          <span className="label text-fog">Brand or company</span>
          <input name="brand" autoComplete="organization" className={field} placeholder="Brand name" />
        </label>
        <label className="block">
          <span className="label text-fog">Service</span>
          <select name="service" defaultValue={preset} className={`${field} appearance-none cursor-pointer`}>
            <option value="" className="bg-void">Choose a service</option>
            {services.map((s) => (
              <option key={s.code} value={serviceSlug(s)} className="bg-void">{s.name}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="label text-fog">Short brief</span>
        <textarea name="brief" required rows={4} className={`${field} resize-none`} placeholder="What should people feel, remember and do?" />
      </label>
      <label className="block md:max-w-[50%]">
        <span className="label text-fog">Timeline (optional)</span>
        <input name="timeline" className={field} placeholder="When do you need it?" />
      </label>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={status === "sending"} className="inline-flex h-16 items-center gap-3 rounded-full bg-signal px-9 text-lg font-medium text-void hover:bg-bone transition-colors disabled:opacity-60">
          {status === "sending" ? "Sending" : "Start a project"}
        </button>
        {status === "error" && <p role="alert" className="text-[15px] text-signal">{error}</p>}
      </div>
    </form>
  );
}
