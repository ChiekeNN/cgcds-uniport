"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ═════════════════════════ News explorer ═══════════════════════ */

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverUrl: string | null;
  author: string;
  publishedAt: string;
  commentCount: number;
  featured: boolean;
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function NewsExplorer({ items }: { items: NewsItem[] }) {
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category))).sort()],
    [items],
  );
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((i) => {
      const okCat = cat === "All" || i.category === cat;
      const okQ =
        !term ||
        i.title.toLowerCase().includes(term) ||
        i.excerpt.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term);
      return okCat && okQ;
    });
  }, [items, cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 font-mono text-[0.63rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                cat === c
                  ? "border-uniport bg-uniport text-white shadow-[0_12px_26px_-14px_rgba(42,157,214,1)]"
                  : "border-slate-200 bg-white text-slate-500 hover:border-uniport/60 hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-64">
            <svg viewBox="0 0 20 20" className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="9" r="5.5" /><path d="m13.5 13.5 4 4" strokeLinecap="round" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter headlines…"
              aria-label="Filter news"
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-[0.85rem] text-navy outline-none transition-all duration-300 focus:border-uniport focus:ring-4 focus:ring-uniport/12"
            />
          </div>
          <div className="flex overflow-hidden rounded-full border border-slate-200">
            {(["grid", "list"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setView(m)}
                aria-label={`${m} view`}
                aria-pressed={view === m}
                className={`grid h-9 w-9 place-items-center transition-colors duration-300 ${
                  view === m ? "bg-navy text-white" : "bg-white text-slate-400 hover:text-navy"
                }`}
              >
                {m === "grid" ? (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.4"/></svg>
                ) : (
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><rect x="1" y="2" width="14" height="2.4" rx="1.2"/><rect x="1" y="6.8" width="14" height="2.4" rx="1.2"/><rect x="1" y="11.6" width="14" height="2.4" rx="1.2"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
        {shown.length} {shown.length === 1 ? "story" : "stories"}
        {cat !== "All" && ` in ${cat}`}
        {q && ` matching “${q}”`}
      </p>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-mist p-14 text-center">
          <p className="text-navy">Nothing matches that combination.</p>
          <button
            type="button"
            onClick={() => {
              setCat("All");
              setQ("");
            }}
            className="mt-4 rounded-full border border-uniport px-5 py-2 text-[0.82rem] font-semibold text-uniport-deep transition-colors hover:bg-uniport hover:text-white"
          >
            Reset filters
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((a, i) => (
            <Link
              key={a.slug}
              href={`/news/${a.slug}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
              className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-navy">
                {a.coverUrl && (
                  <img
                    src={a.coverUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.15em] text-uniport-deep backdrop-blur">
                  {a.category}
                </span>
              </span>
              <span className="flex flex-1 flex-col p-6">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-400">
                  {fmtDate(a.publishedAt)}
                </span>
                <h3 className="mt-3 text-[1.15rem] leading-snug font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                  {a.title}
                </h3>
                <span className="mt-3 line-clamp-3 flex-1 text-[0.87rem] leading-relaxed text-slate-500">
                  {a.excerpt}
                </span>
                <span className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-400">
                    {a.commentCount} {a.commentCount === 1 ? "comment" : "comments"}
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-uniport-deep">
                    Read
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {shown.map((a, i) => (
            <li key={a.slug} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 8) * 45}ms` }}>
              <Link href={`/news/${a.slug}`} className="group grid gap-4 py-6 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:items-center md:gap-8">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-slate-400">
                  {fmtDate(a.publishedAt)}
                </span>
                <span className="min-w-0">
                  <span className="mb-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.16em] text-uniport-deep">
                    {a.category}
                  </span>
                  <span className="block text-[1.08rem] leading-snug font-semibold text-navy transition-colors group-hover:text-uniport-deep">
                    {a.title}
                  </span>
                  <span className="mt-1.5 block text-[0.85rem] text-slate-500 line-clamp-1">
                    {a.excerpt}
                  </span>
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all duration-400 group-hover:border-uniport group-hover:bg-uniport group-hover:text-white">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ═══════════════════════ Staff directory ═══════════════════════ */

export type StaffItem = {
  id: number;
  name: string;
  role: string;
  title: string;
  group: string;
  email: string | null;
  phone: string | null;
  bio: string;
  expertise: string[];
  tenure: string | null;
};

function initials(name: string) {
  const clean = name.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.)\s*/i, "");
  return clean
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function StaffDirectory({ people }: { people: StaffItem[] }) {
  const groups = useMemo(
    () => ["All", ...Array.from(new Set(people.map((p) => p.group)))],
    [people],
  );
  const [group, setGroup] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(people[0]?.id ?? null);

  const shown = people.filter((p) => {
    const term = q.trim().toLowerCase();
    return (
      (group === "All" || p.group === group) &&
      (!term ||
        p.name.toLowerCase().includes(term) ||
        p.role.toLowerCase().includes(term) ||
        p.expertise.join(" ").toLowerCase().includes(term))
    );
  });

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                group === g
                  ? "border-navy bg-navy text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-uniport hover:text-navy"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, role or expertise…"
          aria-label="Search staff"
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[0.85rem] text-navy outline-none transition-all duration-300 focus:border-uniport focus:ring-4 focus:ring-uniport/12 md:w-72"
        />
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {shown.map((p, i) => {
          const on = open === p.id;
          return (
            <article
              key={p.id}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
              className={`card-hover overflow-hidden rounded-3xl border bg-white ${
                on ? "border-uniport/45 shadow-[var(--shadow-glow)]" : "border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(on ? null : p.id)}
                aria-expanded={on}
                className="flex w-full items-start gap-4 p-6 text-left"
              >
                <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-uniport-deep to-uniport font-display text-[1.15rem] font-semibold text-white">
                  {initials(p.name)}
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -bottom-6 h-12 w-12 rounded-full bg-gold/30 blur-[6px]"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.05rem] leading-tight font-semibold text-navy">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[0.82rem] font-medium text-uniport-deep">
                    {p.role}
                  </span>
                  <span className="mt-1.5 block text-[0.76rem] text-slate-500">{p.title}</span>
                  {p.tenure && (
                    <span className="mt-2 inline-block rounded-full bg-mist px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate-500">
                      {p.tenure}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                    on ? "rotate-180 border-uniport bg-uniport text-white" : "border-slate-250 text-slate-400"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 px-6 pt-5 pb-6">
                    <p className="text-[0.87rem] leading-[1.8] text-slate-600">{p.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.expertise.map((x) => (
                        <span
                          key={x}
                          className="rounded-full border border-uniport/25 bg-uniport-mist px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.13em] text-uniport-deep"
                        >
                          {x}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-[0.78rem]">
                      {p.email && (
                        <a href={`mailto:${p.email}`} className="ulink text-slate-500 hover:text-uniport-deep">
                          {p.email}
                        </a>
                      )}
                      {p.phone && (
                        <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="ulink text-slate-500 hover:text-uniport-deep">
                          {p.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-mist p-12 text-center text-slate-500">
          No staff match “{q}”. Write to info@cgcds.com.ng and the Centre will route your
          enquiry to the right office.
        </p>
      )}
    </div>
  );
}

/* ═════════════════════ Tuition calculator ══════════════════════ */

const FEE_ROWS = [
  { code: "PGD", name: "Post Graduate Diploma", form: 25000, acceptance: 50000, session: 350000, years: 1 },
  { code: "M.Sc.", name: "Master of Science", form: 25000, acceptance: 50000, session: 400000, years: 1 },
  { code: "PhD", name: "Doctorate Degree", form: 25000, acceptance: 50000, session: 500000, years: 3 },
];

const naira = (n: number) =>
  `NGN ${n.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

export function TuitionCalculator() {
  const [code, setCode] = useState("PGD");
  const [years, setYears] = useState(1);
  const [instalments, setInstalments] = useState(1);

  const row = FEE_ROWS.find((r) => r.code === code) ?? FEE_ROWS[0];
  const total = row.form + row.acceptance + row.session * years;
  const perInstalment = Math.ceil(total / instalments);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/6 backdrop-blur-xl">
      <div className="border-b border-white/10 px-6 py-5 md:px-8">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-uniport-bright">
          Fee estimator
        </p>
        <h3 className="mt-2 text-[1.35rem] font-semibold text-white">
          Work out your total before you apply
        </h3>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <div>
          <span className="mb-3 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#93bcd2]">
            Programme
          </span>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {FEE_ROWS.map((r) => (
              <button
                key={r.code}
                type="button"
                onClick={() => {
                  setCode(r.code);
                  setYears(r.code === "PhD" ? 3 : 1);
                }}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                  code === r.code
                    ? "border-uniport-bright bg-uniport/22"
                    : "border-white/12 bg-white/4 hover:border-uniport/55 hover:bg-white/8"
                }`}
              >
                <span className="block font-display text-[1.15rem] font-semibold text-white">
                  {r.code}
                </span>
                <span className="mt-0.5 block text-[0.72rem] text-[#9dc6dc]">{r.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#93bcd2]" htmlFor="calc-years">
              Sessions of study
              <span className="text-white">{years}</span>
            </label>
            <input
              id="calc-years"
              type="range"
              min={1}
              max={code === "PGD" ? 2 : code === "M.Sc." ? 4 : 6}
              value={Math.min(years, code === "PGD" ? 2 : code === "M.Sc." ? 4 : 6)}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[#2a9dd6]"
            />
            <p className="mt-2 text-[0.72rem] text-[#7ea6bd]">
              {code === "PGD"
                ? "PGD: 12 months minimum, 24 months maximum."
                : code === "M.Sc."
                  ? "Full-time 1–2 years · part-time 2–4 years."
                  : "Full-time 6–10 semesters · part-time 8–12 semesters."}
            </p>
          </div>
          <div>
            <label className="mb-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#93bcd2]" htmlFor="calc-inst">
              Instalments
              <span className="text-white">{instalments}</span>
            </label>
            <input
              id="calc-inst"
              type="range"
              min={1}
              max={3}
              value={instalments}
              onChange={(e) => setInstalments(Number(e.target.value))}
              className="w-full accent-[#ffc94a]"
            />
            <p className="mt-2 text-[0.72rem] text-[#7ea6bd]">
              Instalment payment is allowed (terms &amp; conditions apply).
            </p>
          </div>
        </div>

        <dl className="divide-y divide-white/10 rounded-2xl border border-white/12 bg-abyss/35">
          {[
            ["Admission form (non-refundable)", row.form],
            ["Acceptance fee", row.acceptance],
            [`School fees × ${years} session${years > 1 ? "s" : ""}`, row.session * years],
          ].map(([label, amount]) => (
            <div key={String(label)} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <dt className="text-[0.83rem] text-[#a9cde2]">{label as string}</dt>
              <dd className="font-mono text-[0.85rem] text-white">{naira(amount as number)}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 bg-uniport/14 px-5 py-4">
            <dt className="text-[0.85rem] font-semibold text-white">Total payable</dt>
            <dd className="font-display text-[1.5rem] font-semibold text-uniport-bright">
              {naira(total)}
            </dd>
          </div>
          {instalments > 1 && (
            <div className="flex items-center justify-between gap-4 px-5 py-3.5">
              <dt className="text-[0.83rem] text-[#a9cde2]">
                Per instalment ({instalments} ×)
              </dt>
              <dd className="font-mono text-[0.85rem] text-gold">{naira(perInstalment)}</dd>
            </div>
          )}
        </dl>

        <Link
          href="/admission"
          className="sheen block rounded-full bg-uniport py-3.5 text-center text-[0.88rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-bright"
        >
          <span className="relative z-[2]">Start application · pay {naira(row.form)} first</span>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════ Journal browser ═══════════════════════ */

export type JournalItem = {
  slug: string;
  title: string;
  volume: string;
  issue: string;
  year: number;
  theme: string;
  editors: string;
  summary: string;
  status: string;
  papers: { title: string; authors: string; pages: string }[];
};

export function JournalBrowser({ issues }: { issues: JournalItem[] }) {
  const [open, setOpen] = useState<string | null>(issues[0]?.slug ?? null);
  const [year, setYear] = useState<"All" | number>("All");
  const years = useMemo(
    () => Array.from(new Set(issues.map((i) => i.year))).sort((a, b) => b - a),
    [issues],
  );
  const shown = year === "All" ? issues : issues.filter((i) => i.year === year);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setYear("All")}
          className={`rounded-full border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-all duration-300 ${
            year === "All"
              ? "border-uniport bg-uniport text-white"
              : "border-slate-200 text-slate-500 hover:border-uniport/60 hover:text-navy"
          }`}
        >
          All years
        </button>
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setYear(y)}
            className={`rounded-full border px-4 py-2 font-mono text-[0.62rem] tracking-[0.14em] transition-all duration-300 ${
              year === y
                ? "border-uniport bg-uniport text-white"
                : "border-slate-200 text-slate-500 hover:border-uniport/60 hover:text-navy"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {shown.map((j) => {
          const on = open === j.slug;
          return (
            <article
              key={j.slug}
              data-reveal
              className={`overflow-hidden rounded-3xl border transition-all duration-400 ${
                on ? "border-uniport/45 bg-white shadow-[var(--shadow-glow)]" : "border-slate-200 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(on ? null : j.slug)}
                aria-expanded={on}
                className="grid w-full gap-4 p-6 text-left md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-7 md:p-7"
              >
                <span className="grid h-20 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-navy to-uniport-deep text-center">
                  <span className="font-display text-[1.5rem] leading-none font-semibold text-white">
                    {j.volume}
                  </span>
                  <span className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-uniport-bright">
                    Vol · {j.issue}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-uniport-deep">
                      {j.year}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] ${
                        j.status === "Forthcoming"
                          ? "bg-[#fff6e0] text-[#8a6410]"
                          : "bg-[#eafaf2] text-[#146c49]"
                      }`}
                    >
                      {j.status}
                    </span>
                  </span>
                  <span className="mt-2 block text-[1.08rem] leading-snug font-semibold text-navy">
                    {j.theme}
                  </span>
                  <span className="mt-1.5 block text-[0.83rem] text-slate-500 line-clamp-2">
                    {j.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                    on ? "rotate-180 border-uniport bg-uniport text-white" : "border-slate-200 text-slate-400"
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="m3.5 6 4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 bg-mist px-6 py-6 md:px-8">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-400">
                      Contents · {j.papers.length} {j.papers.length === 1 ? "paper" : "papers"} · {j.editors}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {j.papers.map((p) => (
                        <li
                          key={p.title}
                          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-uniport/45"
                        >
                          <span className="mt-0.5 font-mono text-[0.66rem] text-uniport">
                            pp. {p.pages}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.92rem] leading-snug font-semibold text-navy">
                              {p.title}
                            </span>
                            <span className="mt-1 block text-[0.78rem] text-slate-500">
                              {p.authors}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-[0.78rem] leading-relaxed text-slate-500">
                      Full texts are administered by the Centre's Research &amp; Publications
                      unit. Request a copy or submit a paper by writing to{" "}
                      <a href="mailto:info@cgcds.com.ng" className="ulink font-semibold text-uniport-deep">
                        info@cgcds.com.ng
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
