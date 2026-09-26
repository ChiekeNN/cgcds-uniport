"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ══════════════════════ 1. Animated counter ══════════════════════ */

export function Counter({
  to,
  suffix = "",
  duration = 1600,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setValue(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ══════════════════ 2. Rotating word carousel ══════════════════ */

export function RotatingWords({
  words,
  interval = 2600,
}: {
  words: readonly string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid h-[1.08em] overflow-hidden align-bottom">
        <span className="sr-only">{words.join(", ")}</span>
      <span
        aria-hidden="true"
        className="flex flex-col transition-transform duration-[750ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: `translateY(-${index * 1.08}em)` }}
      >
        {words.map((w) => (
          <span
            key={w}
            className="grid h-[1.08em] shrink-0 place-items-start bg-gradient-to-r from-uniport-bright via-uniport to-gold bg-clip-text text-transparent"
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ════════════════════ 3. Scramble-decode text ═══════════════════ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+=";

export function ScrambleText({
  text,
  speed = 34,
}: {
  text: string;
  speed?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || started.current) return;
      started.current = true;
      let frame = 0;
      const total = text.length * 3 + 12;
      const id = setInterval(() => {
        frame += 1;
        const revealed = Math.floor((frame / total) * text.length * 1.35);
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < revealed) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (frame >= total) {
          setOut(text);
          clearInterval(id);
        }
      }, speed);
      io.disconnect();
    });
    io.observe(node);
    return () => io.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className="font-mono">
      {out}
    </span>
  );
}

/* ═════════════════ 4. Sticky pillar rail (scroll-spy) ═══════════ */

export type RailItem = {
  id: string;
  label: string;
  index: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
};

export function PillarRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -45% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="grid gap-12 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-16">
      {/* sticky rail */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ol className="relative space-y-1 border-l border-uniport/20">
          {items.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group relative flex items-baseline gap-3 py-3 pl-6 transition-all duration-400"
                  onClick={(e) => {
                    e.preventDefault();
                    refs.current[item.id]?.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                        ? "auto"
                        : "smooth",
                      block: "center",
                    });
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1/2 -left-[5px] h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-400 ${
                      on
                        ? "scale-125 bg-uniport shadow-[0_0_0_5px_rgba(42,157,214,0.18)]"
                        : "bg-slate-300 group-hover:bg-uniport/60"
                    }`}
                  />
                  <span
                    className={`font-mono text-[0.66rem] transition-colors ${
                      on ? "text-uniport-deep" : "text-slate-400"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span
                    className={`text-[0.98rem] font-semibold transition-colors ${
                      on ? "text-navy" : "text-slate-500 group-hover:text-navy"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      {/* scrolling panels */}
      <div className="space-y-16 lg:space-y-28">
        {items.map((item, i) => (
          <article
            key={item.id}
            id={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            className="scroll-mt-32"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-uniport">
                {item.index}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-uniport/45 to-transparent" />
            </div>
            <h3 className="mt-5 text-[clamp(1.6rem,3.6vw,2.5rem)] font-semibold leading-[1.08] text-navy">
              {item.headline}
            </h3>
            <p className="mt-5 text-[1.03rem] leading-[1.85] text-slate-600">
              {item.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={item.cta.href}
                className="sheen inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-deep"
              >
                <span className="relative z-[2]">{item.cta.label}</span>
                <svg
                  viewBox="0 0 20 20"
                  className="relative z-[2] h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" />
                </svg>
              </a>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════ 5. Equity donut (55:45) ══════════════════ */

export function EquityDonut({
  female = 55,
  male = 45,
}: {
  female?: number;
  male?: number;
}) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const R = 68;
  const C = 2 * Math.PI * R;
  const fLen = (female / 100) * C;

  return (
    <div ref={ref} className="relative grid place-items-center">
      <svg viewBox="0 0 180 180" className="h-52 w-52 -rotate-90 md:h-60 md:w-60">
        <circle cx="90" cy="90" r={R} fill="none" stroke="#0d3d5e" strokeWidth="17" />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#ffc94a"
          strokeWidth="17"
          strokeDasharray={C}
          strokeDashoffset={on ? 0 : C}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#2a9dd6"
          strokeWidth="17"
          strokeLinecap="butt"
          strokeDasharray={`${on ? fLen : 0} ${C}`}
          style={{ transition: "stroke-dasharray 1.7s cubic-bezier(0.22,1,0.36,1) 0.15s" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-4xl font-semibold text-white">
          {female}
          <span className="text-uniport">:</span>
          {male}
        </p>
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#8fb6cc]">
          Female : Male
        </p>
      </div>
    </div>
  );
}

/* ═══════════════ 6. History timeline with scroll line ══════════ */

export type TimeNode = { year: string; title: string; body: string; tag: string };

export function Timeline({ items }: { items: TimeNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      return;
    }
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.72 - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[13px] w-px bg-uniport/15 md:left-1/2 md:-translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-[13px] w-px bg-gradient-to-b from-uniport-bright via-uniport to-uniport-deep md:left-1/2 md:-translate-x-1/2"
        style={{ height: `${progress}%` }}
      />
      <ol className="space-y-12 md:space-y-16">
        {items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={item.year + item.title}
              data-reveal={right ? "right" : "left"}
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
              className="relative pl-11 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 grid h-7 w-7 place-items-center rounded-full border border-uniport/45 bg-white md:left-1/2 md:-translate-x-1/2"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-uniport" />
              </span>

              <div
                className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
              >
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-uniport-deep">
                  {item.year}
                </span>
                <h3 className="mt-2 text-[1.45rem] leading-tight font-semibold text-navy md:text-[1.7rem]">
                  {item.title}
                </h3>
                <span className="mt-3 inline-flex rounded-full border border-uniport/25 bg-uniport-mist px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-uniport-deep">
                  {item.tag}
                </span>
                <p className="mt-4 leading-[1.85] text-slate-600">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ══════════════════ 7. Gallery wall + lightbox ═════════════════ */

export type Photo = { id: number; album: string; title: string; url: string; credit: string };

export function GalleryWall({ photos }: { photos: Photo[] }) {
  const albums = useMemo(
    () => ["All", ...Array.from(new Set(photos.map((p) => p.album)))],
    [photos],
  );
  const [album, setAlbum] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (album === "All" ? photos : photos.filter((p) => p.album === album)),
    [photos, album],
  );

  const step = useCallback(
    (dir: number) => {
      setOpen((cur) => {
        if (cur === null) return cur;
        const i = shown.findIndex((p) => p.id === cur);
        const next = (i + dir + shown.length) % shown.length;
        return shown[next].id;
      });
    },
    [shown],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const current = shown.find((p) => p.id === open) ?? null;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {albums.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setAlbum(a);
              setOpen(null);
            }}
            className={`rounded-full border px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.15em] transition-all duration-300 ${
              album === a
                ? "border-uniport bg-uniport text-white shadow-[0_12px_26px_-14px_rgba(42,157,214,0.95)]"
                : "border-slate-200 bg-white text-slate-500 hover:border-uniport/60 hover:text-navy"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {shown.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(p.id)}
            data-reveal="scale"
            style={{ ["--reveal-delay" as string]: `${(i % 6) * 60}ms` }}
            className="group relative block w-full overflow-hidden rounded-2xl bg-navy text-left break-inside-avoid"
          >
            <img
              src={p.url}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/25 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
            <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-bright">
                {p.album}
              </span>
              <span className="mt-1.5 block text-[0.95rem] leading-snug font-semibold text-white">
                {p.title}
              </span>
            </span>
            <span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-white/35 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-400 group-hover:opacity-100">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M7 3H3v4M13 17h4v-4M3 3l6 6M17 17l-6-6" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[120] grid place-items-center bg-abyss/92 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-navy shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={current.url} alt={current.title} className="max-h-[72vh] w-full object-contain" />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-5">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-uniport-bright">
                  {current.album}
                </p>
                <p className="mt-1 text-white">{current.title}</p>
                <p className="mt-1 text-[0.72rem] text-[#8fb6cc]">Photo: {current.credit}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-uniport hover:bg-uniport/25"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-uniport hover:bg-uniport/25"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-uniport text-white transition-colors hover:bg-uniport-deep"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ 8. Accordion ══════════════════════════ */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="group flex w-full items-start gap-5 py-6 text-left"
            >
              <span className="mt-1 font-mono text-[0.66rem] text-uniport">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 text-[1.05rem] font-semibold transition-colors duration-300 ${
                  on ? "text-uniport-deep" : "text-navy group-hover:text-uniport-deep"
                }`}
              >
                {item.q}
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                  on
                    ? "rotate-45 border-uniport bg-uniport text-white"
                    : "border-slate-300 text-slate-500 group-hover:border-uniport group-hover:text-uniport"
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 2.5v11M2.5 8h11" strokeLinecap="round" /></svg>
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="pr-12 pb-7 pl-11 leading-[1.85] text-slate-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════ 9. Progress reading bar ════════════════════ */

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] h-[3px] bg-gradient-to-r from-uniport-bright via-uniport to-gold transition-[width] duration-150 ease-out"
      style={{ width: `${p}%` }}
    />
  );
}

/* ══════════════════ 10. Marquee ticker ═════════════════════════ */

export function Ticker({
  items,
  slow = false,
}: {
  items: readonly string[];
  slow?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="pause-on-hover relative flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 items-center ${slow ? "anim-marquee-slow" : "anim-marquee"}`}
      >
        {doubled.map((t, i) => (
          <span key={t + i} className="flex items-center whitespace-nowrap">
            <span className="px-6">{t}</span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-current opacity-55" />
          </span>
        ))}
      </div>
    </div>
  );
}
