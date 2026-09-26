"use client";

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   NewsImage — the cover photo layer for news cards.

   Fixes three things the plain <img> tags used to get wrong:
   1. The frame (parent) always owns the shape: the photo is
      absolutely filled into it, so crops stay consistent and no
      navy gaps or stretched pixels can appear at any breakpoint.
   2. While the photo downloads a shimmering skeleton holds the
      frame, and if the remote photo is missing/unavailable a
      branded placeholder shows instead of an empty navy block.
   3. Crop anchoring is per-photo: the Director's portrait keeps a
      face-first anchor, everything else crops from the centre.
   ═══════════════════════════════════════════════════════════════ */

export type NewsImageProps = {
  src: string | null | undefined;
  alt: string;
  /** CSS object-position; defaults to face-first for the Director's portrait. */
  position?: string;
  /** Caption shown on the branded placeholder when no photo can be displayed. */
  fallbackLabel?: string;
  priority?: boolean;
  /** Extra classes for the <img> itself (hover zoom, transition timing…). */
  imgClassName?: string;
};

/** The Director's official portrait is the only photo cropped face-first. */
const FACE_FIRST = /prof-owapriba-abu(?!-cover)/;

export function NewsImage({
  src,
  alt,
  position,
  fallbackLabel,
  priority = false,
  imgClassName = "",
}: NewsImageProps) {
  const [state, setState] = useState<"loading" | "ready" | "error">(
    src ? "loading" : "error",
  );
  const ref = useRef<HTMLImageElement | null>(null);

  // A cached image can finish loading before hydration attaches onLoad.
  useEffect(() => {
    const el = ref.current;
    if (el?.complete) {
      setState(el.naturalWidth > 0 ? "ready" : "error");
    }
  }, []);

  if (!src || state === "error") {
    return (
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy-mid via-navy to-abyss"
      >
        <span className="bg-blueprint-dark absolute inset-0 opacity-70" />
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="font-display text-[2.6rem] leading-none font-semibold text-white/15">
            CGCDS
          </span>
          <span className="h-px w-10 bg-gold/70" />
          {fallbackLabel ? (
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/60">
              {fallbackLabel}
            </span>
          ) : null}
        </span>
      </span>
    );
  }

  return (
    <>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setState("ready")}
        onError={() => setState("error")}
        style={{ objectPosition: position ?? (FACE_FIRST.test(src) ? "50% 12%" : "50% 50%") }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
      {state === "loading" ? (
        <span aria-hidden="true" className="skeleton absolute inset-0" />
      ) : null}
    </>
  );
}
