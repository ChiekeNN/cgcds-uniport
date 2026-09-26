"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { NAV, SITE } from "@/lib/site";
import { Brand } from "@/components/ui";

export type SearchEntry = {
  title: string;
  href: string;
  kind: string;
  blurb?: string;
};

const TICKER = [
  "2025/2026 Admission is ongoing",
  "PGD · M.Sc · PhD — open to all disciplines",
  "8 certificate short courses · 3 months each",
  "Admission form NGN 25,000 — Fidelity Bank 5210017988",
];

export default function Header({ index }: { index: SearchEntry[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const [q, setQ] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = palette || drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [palette, drawer]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.slice(0, 7);
    return index
      .filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.kind.toLowerCase().includes(term) ||
          (e.blurb ?? "").toLowerCase().includes(term),
      )
      .slice(0, 9);
  }, [q, index]);

  const hover = (label: string) => ({
    onMouseEnter: () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpenMenu(label);
    },
    onMouseLeave: () => {
      closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
    },
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── utility strip ── */}
      <div className="relative z-[70] hidden overflow-hidden bg-abyss text-[#8fc4de] md:block">
        <div className="shell flex h-9 items-center justify-between gap-6">
          <div className="flex min-w-0 items-center gap-5 font-mono text-[0.63rem] uppercase tracking-[0.14em]">
            <a
              href={SITE.phones[0].href}
              className="ulink flex shrink-0 items-center gap-1.5 hover:text-uniport-bright"
            >
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 3.5h3l1.5 4-2 1.4a10 10 0 0 0 4.6 4.6l1.4-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C8.4 17 3 11.6 2.5 5.1A1.5 1.5 0 0 1 4 3.5Z" strokeLinejoin="round" />
              </svg>
              {SITE.phones[0].value}
            </a>
            <a
              href={`mailto:${SITE.emails[0]}`}
              className="ulink hidden shrink-0 items-center gap-1.5 hover:text-uniport-bright lg:flex"
            >
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
                <path d="m3.5 6 6.5 4.5L16.5 6" strokeLinecap="round" />
              </svg>
              {SITE.emails[0]}
            </a>
          </div>
          <div className="hidden min-w-0 flex-1 overflow-hidden md:block">
            <div className="anim-marquee-slow flex w-max items-center">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span
                  key={t + i}
                  className="flex items-center whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#63a4c4]"
                >
                  <span className="px-5">{t}</span>
                  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-uniport" />
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPalette(true)}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#9ccde6] transition-colors hover:border-uniport hover:text-white"
          >
            Search
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[0.55rem]">⌘K</kbd>
          </button>
        </div>
      </div>

      {/* ── main bar ── */}
      <header
        className={`sticky top-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "border-b border-uniport/15 bg-white/88 shadow-[0_10px_38px_-24px_rgba(6,42,68,0.7)] backdrop-blur-xl"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled ? "h-[4.4rem]" : "h-[5.2rem]"
          }`}
        >
          <Link href="/" aria-label={`${SITE.short} — home`} className="shrink-0">
            <Brand />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="relative" {...hover(item.label)}>
                <Link
                  href={item.href}
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? openMenu === item.label : undefined}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.855rem] font-semibold transition-colors duration-300 ${
                    isActive(item.href) ? "text-uniport-deep" : "text-slate-600 hover:text-navy"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      viewBox="0 0 16 16"
                      className={`h-2.5 w-2.5 transition-transform duration-300 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-uniport transition-transform duration-400 ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                {item.children && (
                  <div
                    className={`absolute top-full left-1/2 w-[26rem] -translate-x-1/2 pt-3 transition-all duration-300 ${
                      openMenu === item.label
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-uniport/15 bg-white/97 p-2 shadow-[0_36px_70px_-32px_rgba(6,42,68,0.55)] backdrop-blur-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors duration-250 hover:bg-uniport-mist"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-uniport/45 transition-all duration-300 group-hover:rotate-0 group-hover:bg-uniport"
                          />
                          <span className="min-w-0">
                            <span className="block text-[0.875rem] font-semibold text-navy group-hover:text-uniport-deep">
                              {child.label}
                            </span>
                            {child.blurb && (
                              <span className="mt-0.5 block text-[0.75rem] text-slate-500">
                                {child.blurb}
                              </span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPalette(true)}
              aria-label="Search the site"
              className="hidden h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-uniport hover:text-uniport-deep sm:grid"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="9" r="5.5" />
                <path d="m13.5 13.5 4 4" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              href="/admission"
              className="sheen hidden rounded-full bg-uniport px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(42,157,214,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-deep sm:inline-flex"
            >
              <span className="relative z-[2]">Apply Now</span>
            </Link>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-navy transition-colors hover:border-uniport lg:hidden"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h9" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <span
          aria-hidden="true"
          className={`block h-px bg-gradient-to-r from-transparent via-uniport/55 to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      {/* ── mobile drawer ── */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden ${drawer ? "" : "pointer-events-none"}`}
        aria-hidden={!drawer}
      >
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-abyss/70 backdrop-blur-sm transition-opacity duration-400 ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 right-0 flex h-full w-[min(23rem,90vw)] flex-col bg-white shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <Brand compact />
            <button
              type="button"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-navy"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-slate-100 py-1 last:border-0">
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 text-[0.98rem] font-semibold ${
                    isActive(item.href) ? "bg-uniport-mist text-uniport-deep" : "text-navy"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-2 ml-4 space-y-0.5 border-l border-uniport/20 pl-4">
                    {item.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block py-1.5 text-[0.85rem] text-slate-500 transition-colors hover:text-uniport-deep"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="space-y-3 border-t border-slate-100 p-5">
            <Link
              href="/admission"
              className="block rounded-full bg-uniport py-3 text-center text-[0.9rem] font-semibold text-white"
            >
              Apply Now
            </Link>
            <a
              href={SITE.phones[0].href}
              className="block text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate-500"
            >
              {SITE.phones[0].value}
            </a>
          </div>
        </div>
      </div>

      {/* ── command palette ── */}
      {palette && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          className="fixed inset-0 z-[130] flex items-start justify-center bg-abyss/80 p-4 pt-[12vh] backdrop-blur-md"
          onClick={() => setPalette(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-uniport/25 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5 shrink-0 text-uniport" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="9" r="5.5" /><path d="m13.5 13.5 4 4" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search programs, news, tuition, journals…"
                className="w-full bg-transparent text-[0.98rem] text-navy outline-none placeholder:text-slate-400"
              />
              <kbd className="shrink-0 rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-400">
                ESC
              </kbd>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-10 text-center text-slate-500">
                  No matches for “{q}”. Try “PGD”, “tuition”, “conference” or “director”.
                </li>
              )}
              {results.map((r) => (
                <li key={r.href + r.title}>
                  <Link
                    href={r.href}
                    onClick={() => setPalette(false)}
                    className="group flex items-start gap-3.5 rounded-xl px-4 py-3 transition-colors hover:bg-uniport-mist"
                  >
                    <span className="mt-0.5 rounded-full border border-uniport/25 bg-white px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-uniport-deep">
                      {r.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.92rem] font-semibold text-navy group-hover:text-uniport-deep">
                        {r.title}
                      </span>
                      {r.blurb && (
                        <span className="mt-0.5 block truncate text-[0.76rem] text-slate-500">
                          {r.blurb}
                        </span>
                      )}
                    </span>
                    <svg viewBox="0 0 20 20" className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-uniport" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
