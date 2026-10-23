"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services, serviceSlug } from "@/lib/site";
import { contact } from "@/lib/profile";

type Status = "idle" | "sending" | "sent" | "error";

const field = "w-full bg-transparent border-0 border-b border-bone/25 rounded-none px-0 py-3 text-[18px] text-bone placeholder:text-fog focus:outline-none focus:border-bone transition-colors";

// Name, email, brand, service (pre-selected from the page you came from), brief and an optional timeline.
export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
    <form onSubmit={onSubmit} className="grid gap-10" noValidate={false}>
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
