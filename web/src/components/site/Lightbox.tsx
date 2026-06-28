"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LightboxCtx = { open: (src: string, alt?: string) => void };

const Ctx = createContext<LightboxCtx | null>(null);

export function useLightbox() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLightbox must be used within <LightboxProvider>");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt = "") => {
    setImg({ src, alt });
    dialogRef.current?.showModal();
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        onClick={close}
        onClose={() => setImg(null)}
        className="m-auto max-h-none max-w-none bg-transparent backdrop:bg-velvet-900/85 backdrop:backdrop-blur-sm"
      >
        {img && (
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-velvet-900 shadow-lg transition-colors hover:bg-cream"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </Ctx.Provider>
  );
}

type LightboxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
};

/** A clickable image that fills its (positioned) parent and opens the lightbox. */
export function LightboxImage({ src, alt, sizes = "33vw" }: LightboxImageProps) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open(src, alt)}
      aria-label={`Enlarge image: ${alt}`}
      className="group absolute inset-0 cursor-zoom-in"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-velvet-900/0 transition-colors duration-300 group-hover:bg-velvet-900/25">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-velvet-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
      </span>
    </button>
  );
}
