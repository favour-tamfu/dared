"use client";

import { useState } from "react";

/*
  Social share buttons (Facebook, X/Twitter, WhatsApp, copy link), ported from
  the legacy site, restyled to the Toghu palette. Shares the current page URL
  with the event title.
*/

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-full bg-sand-100 text-velvet-700 ring-1 ring-sand-300 transition-all hover:-translate-y-0.5 hover:bg-velvet-600 hover:text-white";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () =>
    typeof window !== "undefined" ? window.location.href : "https://idared.org";

  const openShare = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=480");

  const t = () => encodeURIComponent(title);
  const u = () => encodeURIComponent(currentUrl());

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        Share
      </span>

      <button
        type="button"
        aria-label="Share on Facebook"
        title="Share on Facebook"
        onClick={() =>
          openShare(`https://www.facebook.com/sharer/sharer.php?u=${u()}`)
        }
        className={iconBtn}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M14 9h3l.5-3H14V4.3c0-.8.3-1.3 1.5-1.3H17V.3C16.6.2 15.5 0 14.4 0 11.9 0 10.3 1.5 10.3 4v2H7.5v3h2.8v9H14V9z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Share on X"
        title="Share on X"
        onClick={() =>
          openShare(`https://twitter.com/intent/tweet?text=${t()}&url=${u()}`)
        }
        className={iconBtn}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2H21.5l-7.1 8.114L22.75 22h-6.59l-5.16-6.74L5.1 22H1.84l7.6-8.68L1.25 2h6.76l4.66 6.16L18.244 2zm-1.16 18h1.82L7.01 3.9H5.06l12.02 16.1z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        onClick={() =>
          openShare(`https://api.whatsapp.com/send?text=${t()}%20${u()}`)
        }
        className={iconBtn}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-5.6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.7-.6 2.8.7 2.3 2.4 4 4.7 4.7 1.1.3 2.1.1 2.8-.6.2-.2.3-.5.3-.6 0-.2 0-.3-.1-.4z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Copy link"
        title={copied ? "Link copied!" : "Copy link"}
        onClick={copy}
        className={iconBtn}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12l5 5L20 7" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
          </svg>
        )}
      </button>
    </div>
  );
}
