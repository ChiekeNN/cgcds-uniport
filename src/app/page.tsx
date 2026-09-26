import Link from "next/link";

import {
  FaqBand,
  MandateBento,
  ProgramsRow,
  ShortCoursesRow,
  StatsBand,
  TuitionTeaser,
  WhoWeAre,
} from "@/components/home/Sections";
import {
  Counter,
  PillarRail,
  RotatingWords,
  ScrambleText,
  Ticker,
} from "@/components/motion";
import { NewsExplorer, type NewsItem } from "@/components/interactive";
import { NewsImage } from "@/components/NewsImage";
import { Btn, Chip, Eyebrow, SectionHeading } from "@/components/ui";
import {
  DIRECTOR_PHOTO_ALT,
  DIRECTOR_PORTRAIT,
  HEADLINE_STATS,
  HERO_IMAGE,
  PILLARS,
  PROGRAMS,
  ROTATING_WORDS,
} from "@/lib/content";
import { getArticles, getEvents } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const TICKER_ITEMS = [
  "2025/2026 Post Graduate Admission is ongoing",
  "PGD · M.Sc · PhD in Gender, Conflict and Development Studies",
  "8 certificate short courses · 3 months each",
  "Admission form NGN 25,000 · Fidelity Bank 5210017988",
  "100% graduate in one year — inspite of industrial action",
  "6:1 student to faculty ratio",
];

export default async function HomePage() {
  const [articles, events] = await Promise.all([getArticles(), getEvents()]);

  const newsItems: NewsItem[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    coverUrl: a.coverUrl,
    author: a.author,
    publishedAt: a.publishedAt.toISOString(),
    commentCount: a.commentCount,
    featured: a.featured,
  }));

  const lead = newsItems[0];
  const upcoming = events
    .filter((e) => new Date(e.startsAt).getTime() > Date.now() - 86400000 * 400)
    .slice(0, 4);

  return (
    <>
      {/* ═════════════════════════ HERO ═════════════════════════ */}
      <section className="grain relative isolate flex min-h-[92svh] items-end overflow-hidden bg-abyss pt-28 pb-14 text-white md:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <img
            src={HERO_IMAGE}
            alt=""
            className="anim-kenburns h-full w-full object-cover opacity-[0.32]"
            loading="eager"
            decoding="async"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_15%_0%,rgba(3,21,31,0.55)_0%,rgba(3,21,31,0.92)_55%,#03151f_100%)]"
        />
        <div
          aria-hidden="true"
          className="bg-blueprint-dark absolute inset-0 -z-10 opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-uniport/22 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-10rem] bottom-[-14rem] -z-10 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-[150px]"
        />

        {/* rotating equity ring */}
        <div
          aria-hidden="true"
          className="anim-float absolute top-1/2 right-[6%] -z-10 hidden h-[24rem] w-[24rem] -translate-y-1/2 xl:block"
        >
          <svg viewBox="0 0 400 400" className="h-full w-full opacity-70">
            <defs>
              <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#37b4ee" />
                <stop offset="100%" stopColor="#062a44" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="176" fill="none" stroke="url(#hero-ring)" strokeWidth="1.2" opacity="0.5" />
            <circle cx="200" cy="200" r="146" fill="none" stroke="#2a9dd6" strokeWidth="1" strokeDasharray="4 10" opacity="0.55" className="anim-spin-slow" style={{ transformOrigin: "200px 200px" }} />
            <circle cx="200" cy="200" r="116" fill="none" stroke="#ffc94a" strokeWidth="1.4" strokeDasharray="410 730" strokeLinecap="round" opacity="0.8" />
            <circle cx="200" cy="200" r="86" fill="rgba(42,157,214,0.10)" stroke="#2a9dd6" strokeWidth="1" opacity="0.7" />
            <text x="200" y="192" textAnchor="middle" className="fill-white font-display" fontSize="42" fontWeight="600">55:45</text>
            <text x="200" y="218" textAnchor="middle" className="fill-[#8fb6cc] font-mono" fontSize="11" letterSpacing="3">FEMALE : MALE</text>
          </svg>
        </div>

        <div className="shell relative w-full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-end">
            <div>
              <div
                data-reveal
                className="flex flex-wrap items-center gap-3"
              >
                <span className="relative flex items-center gap-2 rounded-full border border-gold/45 bg-gold/12 px-4 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="anim-ring absolute inline-flex h-full w-full rounded-full bg-gold" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                    2025/2026 admission is ongoing
                  </span>
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#8fb6cc]">
                  <ScrambleText text="UNIVERSITY OF PORT HARCOURT" />
                </span>
              </div>

              <h1 className="mt-7 font-display text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.94] font-semibold">
                <span data-reveal="mask" className="block">
                  Welcome to
                </span>
                <span
                  data-reveal="mask"
                  style={{ ["--reveal-delay" as string]: "140ms" }}
                  className="mt-1 block bg-gradient-to-br from-white via-[#cfe9f8] to-uniport-bright bg-clip-text text-transparent"
                >
                  CGCDS Uniport
                </span>
              </h1>

              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "220ms" }}
                className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[clamp(1.25rem,3vw,2rem)] leading-tight font-light text-[#bcd8e8]"
              >
                <span className="text-white/60">Advancing</span>
                <RotatingWords words={ROTATING_WORDS} />
              </p>

              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "300ms" }}
                className="mt-7 max-w-2xl text-[1.03rem] leading-[1.85] text-[#a9cde2]"
              >
                Welcome to the Centre for Gender, Conflict and Development Studies, University
                of Port Harcourt — a place of intense energy, creativity and inclusiveness,
                fostering learning in both the male and female gender towards a better society.
              </p>

              <div
                data-reveal
                style={{ ["--reveal-delay" as string]: "380ms" }}
                className="mt-10 flex flex-wrap items-center gap-3.5"
              >
                <Btn href="/admission" size="lg">Apply Now</Btn>
                <Btn href="/programs" variant="light" size="lg" arrow={false}>
                  See our programmes
                </Btn>
                <a
                  href={SITE.handbookUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ulink ml-1 text-[0.84rem] font-semibold text-gold hover:text-white"
                >
                  Download student handbook ↓
                </a>
              </div>

              {/* mini stat strip */}
              <dl
                data-reveal
                style={{ ["--reveal-delay" as string]: "450ms" }}
                className="mt-12 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/10 sm:grid-cols-4"
              >
                {HEADLINE_STATS.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-abyss/70 px-5 py-4 backdrop-blur-md">
                    <dt className="font-display text-[1.6rem] leading-none font-semibold text-uniport-bright">
                      {s.numeric ? <Counter to={s.numeric} suffix={s.suffix ?? ""} /> : s.value}
                    </dt>
                    <dd className="mt-2 text-[0.72rem] leading-snug text-[#9dc6dc]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* floating admission card */}
            <aside
              data-reveal="right"
              style={{ ["--reveal-delay" as string]: "260ms" }}
              className="relative overflow-hidden rounded-3xl border border-white/14 bg-white/7 p-7 backdrop-blur-xl"
            >
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-uniport/30 blur-[60px]"
              />
              <div className="relative">
                <Chip tone="ghost">Admission at a glance</Chip>
                <ul className="mt-6 space-y-4">
                  {(
                    [
                      {
                        k: "Director",
                        v: SITE.director,
                        href: "/about/staff",
                        photo: DIRECTOR_PORTRAIT,
                        photoAlt: DIRECTOR_PHOTO_ALT,
                      },
                      {
                        k: "Programmes",
                        v: "PGD · M.Sc. · PhD",
                        href: "/programs",
                      },
                      {
                        k: "Admission form",
                        v: "NGN 25,000 (non-refundable)",
                        href: "/admission",
                      },
                      {
                        k: "Short courses",
                        v: "8 certificates · 3 months",
                        href: "/programs/short-courses",
                      },
                    ] as {
                      k: string;
                      v: string;
                      href: string;
                      photo?: string;
                      photoAlt?: string;
                    }[]
                  ).map((row) => (
                    <li key={row.k}>
                      <Link
                        href={row.href}
                        className="group block border-b border-white/10 pb-3.5 transition-colors duration-300 hover:border-uniport-bright/60"
                      >
                        <span className="block font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#7ea6bd]">
                          {row.k}
                        </span>
                        <span className="mt-1.5 flex items-center justify-between gap-3">
                          <span className="flex min-w-0 items-center gap-3">
                            {row.photo && (
                              <img
                                src={row.photo}
                                alt={row.photoAlt ?? ""}
                                width={236}
                                height={400}
                                className="h-11 w-9 shrink-0 rounded-lg object-cover object-[50%_8%] ring-1 ring-white/20"
                              />
                            )}
                            <span className="text-[0.92rem] font-medium text-white">
                              {row.v}
                            </span>
                          </span>
                          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-uniport-bright opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-2xl bg-abyss/45 p-4">
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#7ea6bd]">
                    Centre location
                  </p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-[#cfe6f2]">
                    {SITE.address.building}, {SITE.address.campus}, {SITE.address.city}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ulink mt-3 inline-block text-[0.78rem] font-semibold text-uniport-bright"
                  >
                    Open in maps →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TICKER BAND ═══════════════════ */}
      <div className="relative overflow-hidden bg-uniport py-3.5 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-uniport-deep via-uniport to-uniport-bright"
        />
        <div className="relative">
          <Ticker items={TICKER_ITEMS} slow />
        </div>
      </div>

      <WhoWeAre />

      {/* ═══════════════ PHILOSOPHY / VISION / MISSION ═══════════════ */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="What we stand for"
            title="Philosophy, vision, mission and the reason we exist"
            lead="Four statements published by the Centre — read them together and the whole mandate becomes clear."
          />
          <div className="mt-14">
            <PillarRail items={PILLARS} />
          </div>
        </div>
      </section>

      <MandateBento />
      <ProgramsRow />
      <StatsBand />
      <ShortCoursesRow />

      {/* ═══════════════════════ NEWS ═══════════════════════ */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="CGCDS Uniport news"
              title="Upcoming and recent happenings at the Centre"
              lead="Public lectures, international conferences, leadership changes, advocacy commemorations and admission notices."
            />
            <Btn href="/news" variant="outline" className="shrink-0">
              All news
            </Btn>
          </div>

          {lead && (
            <Link
              href={`/news/${lead.slug}`}
              data-reveal="scale"
              className="card-hover group mt-12 grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-navy lg:aspect-auto lg:min-h-[24rem]">
                <NewsImage
                  src={lead.coverUrl}
                  alt=""
                  priority
                  fallbackLabel={lead.category}
                  imgClassName="transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                />
                <span className="absolute inset-0 bg-gradient-to-tr from-navy/70 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="rounded-full bg-gold px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-navy">
                    Featured
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-uniport-deep backdrop-blur">
                    {lead.category}
                  </span>
                </span>
              </span>
              <span className="flex flex-col justify-center p-8 md:p-11">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">
                  {new Date(lead.publishedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {lead.author}
                </span>
                <h3 className="mt-4 text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.12] font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                  {lead.title}
                </h3>
                <span className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">
                  {lead.excerpt}
                </span>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-uniport-deep">
                  Read the full story
                  <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </Link>
          )}

          <div className="mt-12">
            <NewsExplorer items={newsItems.slice(0, 6)} />
          </div>
        </div>
      </section>

      {/* ═══════════════════ EVENTS DIARY ═══════════════════ */}
      <section id="events" className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-45" />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -left-24 h-[26rem] w-[26rem] rounded-full bg-uniport/20 blur-[130px]"
        />
        <div className="shell relative">
          <SectionHeading
            tone="light"
            eyebrow="Diary"
            title="Lectures, conferences and advocacy the Centre convenes"
            lead="Recurring observances the Centre marks each year, plus the flagship international conference on the World Gender and Environmental Development Day."
          />

          <ol className="mt-14 grid gap-4 md:grid-cols-2">
            {upcoming.map((e, i) => {
              const d = new Date(e.startsAt);
              return (
                <li
                  key={e.slug}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
                  className="card-hover group relative overflow-hidden rounded-3xl border border-white/12 bg-white/6 p-7 backdrop-blur-md hover:border-uniport/55"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-14 -right-14 h-36 w-36 rounded-full bg-uniport/20 blur-2xl transition-all duration-600 group-hover:bg-uniport-bright/35"
                  />
                  <div className="relative flex items-start gap-6">
                    <div className="shrink-0 rounded-2xl border border-white/15 bg-abyss/50 px-4 py-3 text-center">
                      <p className="font-display text-[1.85rem] leading-none font-semibold text-uniport-bright">
                        {d.toLocaleDateString("en-GB", { day: "2-digit" })}
                      </p>
                      <p className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#9dc6dc]">
                        {d.toLocaleDateString("en-GB", { month: "short" })} {d.getFullYear()}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-uniport/22 px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-uniport-bright">
                          {e.category}
                        </span>
                        <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#7ea6bd]">
                          {e.cadence}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[1.15rem] leading-snug font-semibold">
                        {e.title}
                      </h3>
                      <p className="mt-2.5 text-[0.85rem] leading-relaxed text-[#a9cde2]">
                        {e.description}
                      </p>
                      <p className="mt-4 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gold">
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M10 10.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
                          <path d="M10 18s6.2-5.1 6.2-9.4A6.2 6.2 0 0 0 3.8 8.6C3.8 12.9 10 18 10 18Z" strokeLinejoin="round" />
                        </svg>
                        {e.venue}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-white/12 bg-white/5 p-7">
            <div>
              <Eyebrow tone="light">Programmes represented at every event</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {PROGRAMS.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="rounded-full border border-white/20 px-4 py-2 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-uniport-bright hover:bg-uniport/25"
                  >
                    {p.code} · {p.name}
                  </Link>
                ))}
              </div>
            </div>
            <Btn href="/news" variant="light" arrow={false}>
              News archive
            </Btn>
          </div>
        </div>
      </section>

      <TuitionTeaser />
      <FaqBand />
    </>
  );
}
