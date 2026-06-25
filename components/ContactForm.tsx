"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", projectType: "Brand Identity", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    // Fire confetti from left and right corners
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", projectType: "Brand Identity", message: "" });
        triggerConfetti();
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit message.");
      }
    } catch (err) {
      const error = err as Error;
      setStatus("error");
      setErrorMessage(error.message || "An unexpected network error occurred.");
    }
  };

  return (
    <div className="w-full border border-line rounded-3xl p-6 md:p-8 bg-paper/60 backdrop-blur-sm shadow-sm transition-all duration-300">
      
      {status === "success" ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-display font-semibold italic text-2xl text-ink">
            Message Sent Successfully
          </h3>
          <p className="font-sans text-sm text-graphite max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. I have received your request and will reply within a day or two.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="pill-active-hover mt-6 px-6 py-2.5 bg-ink text-paper rounded-xl font-sans text-xs font-semibold uppercase tracking-wider"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Validation Alert */}
          {status === "error" && (
            <div className="flex gap-3 items-center p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs font-semibold leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-line rounded-2xl bg-paper/50 font-sans text-sm focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50 transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-line rounded-2xl bg-paper/50 font-sans text-sm focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50 transition-all"
            />
          </div>

          {/* Project Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Project Category
            </label>
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                disabled={status === "submitting"}
                className="w-full px-4 py-3 border border-line rounded-2xl bg-paper/50 font-sans text-sm appearance-none cursor-pointer focus-visible:outline-none focus-visible:border-accent disabled:opacity-50 transition-all"
              >
                <option value="Brand Identity">Brand Identity System</option>
                <option value="Social Media Management">Social Media Strategy & Mgmt</option>
                <option value="Web Design">Web Interface Design</option>
                <option value="Other">Other Engagement</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-graphite">
                {/* Custom dropdown arrow */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.273 0.268-0.704 0.268-0.978 0l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-[10px] font-sans font-bold uppercase tracking-widest text-graphite">
              Brief Details <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="Tell me about your brand challenges or deliverables..."
              className="w-full px-4 py-3 border border-line rounded-2xl bg-paper/50 font-sans text-sm focus-visible:outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50 resize-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="pill-active-hover w-full flex items-center justify-center gap-2 px-6 py-4 bg-ink text-paper rounded-2xl font-sans text-xs font-semibold uppercase tracking-wider shadow-sm border border-ink hover:bg-transparent hover:text-ink disabled:opacity-50 transition-all"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Details
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
