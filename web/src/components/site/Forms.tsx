"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/nav";

type Status = "idle" | "submitting" | "success" | "error";

// Submit a form to Formspree via AJAX so the user stays on the page.
async function submitToFormspree(
  action: string,
  form: HTMLFormElement
): Promise<boolean> {
  try {
    const res = await fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    return res.ok;
  } catch {
    return false;
  }
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm focus:border-velvet-500 focus:outline-none focus:ring-2 focus:ring-velvet-500/20";

/* ---------- Footer newsletter ---------- */

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    const ok = await submitToFormspree(siteConfig.newsletterAction, form);
    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="mt-4 rounded-xl bg-velvet-800 px-4 py-3 text-sm text-gold-200">
        Thanks for subscribing, you&apos;re on the list!
      </p>
    );
  }

  return (
    <div className="mt-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="w-full rounded-full border border-velvet-600 bg-velvet-800 px-4 py-2.5 text-sm text-white placeholder:text-velvet-300 focus:border-gold-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-velvet-900 transition-colors hover:bg-gold-300 disabled:opacity-70"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-crimson-300">
          Something went wrong, please try again.
        </p>
      )}
    </div>
  );
}

/* ---------- Get Involved volunteer form ---------- */

export function VolunteerForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    const ok = await submitToFormspree(siteConfig.volunteerAction, form);
    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-leaf-50 p-8 text-center ring-1 ring-leaf-200">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-600 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Thank you!
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;ve received your details and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Full name
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-ink">
            Sex
          </label>
          <select id="sex" name="sex" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-ink">
            Phone number
          </label>
          <input id="contact" name="contact" type="tel" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email address
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-ink">
          Your location (city / region)
        </label>
        <input id="location" name="location" type="text" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="additional-info" className="block text-sm font-medium text-ink">
          Tell us a bit about yourself and why you&apos;d like to volunteer
        </label>
        <textarea id="additional-info" name="additional-info" rows={4} className={fieldClass} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-crimson-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-600 disabled:opacity-70"
      >
        {status === "submitting" ? "Submitting…" : "Submit volunteer form"}
      </button>
      {status === "error" && (
        <p className="text-sm font-medium text-crimson-600">
          Something went wrong. Please try again, or email {siteConfig.email}.
        </p>
      )}
    </form>
  );
}
