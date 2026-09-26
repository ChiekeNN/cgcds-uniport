import Link from "next/link";

import { Counter, EquityDonut, Accordion } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, SectionHeading } from "@/components/ui";
import {
  ABOUT_IMAGE,
  FAQS,
  HEADLINE_STATS,
  MANDATE,
  OUTCOME_STATS,
  PROGRAMS,
  SHORT_COURSE_FACTS,
  SHORT_COURSES,
} from "@/lib/content";
import { SITE } from "@/lib/site";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/* ══════════════════════ Who we are — sticky two-column ═════════ */

export function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div aria-hidden="true" className="bg-dots absolute top-0 right-0 h-72 w-72 opacity-40" />
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-20">
        {/* sticky visual column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <div
              data-reveal="scale"
              className="relative overflow-hidden rounded-[2rem] bg-navy shadow-[var(--shadow-lift)]"
            >
              <img
                src={ABOUT_IMAGE}
                alt="Graduates of the University of Port Harcourt celebrating in academic dress"
                loading="lazy"
                decoding="async"
                className="anim-kenburns h-[26rem] w-full object-cover md:h-[32rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-uniport-bright">
                  Abuja Campus · Choba
                </p>
                <p className="mt-2 max-w-sm font-display text-[1.4rem] leading-tight font-semibold text-white">
                  Beside the Faculty of Law, along the East–West Road
                </p>
              </div>
            </div>

            {/* floating seal */}
            <div className="anim-float absolute -top-8 -right-4 hidden h-32 w-32 md:block lg:-right-10">
              <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
                <defs>
                  <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <circle cx="60" cy="60" r="52" fill="#ffffff" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#2a9dd6" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="34" fill="#062a44" />
                <g className="anim-spin-slow" style={{ transformOrigin: "60px 60px" }}>
                  <text className="fill-[#0a3a5c] font-mono" fontSize="9.4" letterSpacing="2.4">
                    <textPath href="#seal-path" startOffset="0%">
                      A CREATION OF THE SENATE · UNIVERSITY OF PORT HARCOURT ·
                    </textPath>
                  </text>
                </g>
                <text
                  x="60"
                  y="57"
                  textAnchor="middle"
                  className="fill-white font-display"
                  fontSize="19"
                  fontWeight="600"
                >
                  220+
                </text>
                <text
                  x="60"
                  y="72"
                  textAnchor="middle"
                  className="fill-[#8fb6cc] font-mono"
                  fontSize="6.6"
                  letterSpacing="1.2"
                >
                  STUDENTS
                </text>
              </svg>
            </div>

            {/* floating fact card */}
            <div
              data-reveal="right"
              className="absolute -bottom-8 -left-3 max-w-[15rem] rounded-2xl border border-uniport/20 bg-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur md:-left-10"
            >
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                Seamless culture
              </p>
              <p className="mt-2 font-display text-[2.1rem] leading-none font-semibold text-navy">
                <Counter to={220} suffix="+" />
              </p>
              <p className="mt-2 text-[0.78rem] leading-snug text-slate-500">
                Students sharing one seamless culture across the Centre
              </p>
            </div>
          </div>
        </div>

        {/* scrolling text column */}
        <div className="pt-4 lg:pt-14">
          <Eyebrow>Who we are</Eyebrow>
          <h2
            data-reveal="mask"
            className="mt-5 text-[clamp(1.95rem,4.6vw,3.35rem)] leading-[1.02] font-semibold text-navy"
          >
            A place of intense energy,{" "}
            <span className="italic font-light text-uniport-deep">creativity</span> &amp;
            inclusiveness
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
            className="mt-7 text-[1.12rem] leading-[1.8] text-slate-600"
          >
            CGCDS Uniport fosters learning, creativity and inclusiveness in both the male and
            female gender, towards a better society.
          </p>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "140ms" }}
            className="mt-5 leading-[1.85] text-slate-600"
          >
            The Centre welcomes the whole University — and the whole country. Our three
            postgraduate programmes are open to all disciplines: sciences, social sciences,
            management, engineering and humanities, to mention a few. The multidisciplinary
            nature of our staff and team of experts lets us carry out our responsibilities in
            compliance with global best practice and professional standards.
          </p>

          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
            className="mt-9 grid gap-4 sm:grid-cols-3"
          >
            {[
              { k: "Research", v: "Evidence-based policy" },
              { k: "Teaching", v: "PGD · M.Sc · PhD" },
              { k: "Community", v: "Service & advocacy" },
            ].map((x) => (
              <div
                key={x.k}
                className="group rounded-2xl border border-slate-200 bg-mist p-5 transition-all duration-400 hover:-translate-y-1 hover:border-uniport/45 hover:bg-white"
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                  {x.k}
                </p>
                <p className="mt-2 text-[0.95rem] font-semibold text-navy">{x.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/about">About the Centre</Btn>
            <Btn href="/contact" variant="outline" arrow={false}>
              Contact us
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ Mandate ═══════════════════════════ */

export function MandateBento() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-uniport/40 to-transparent"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="The core mandate"
          title="Research, teaching and community service — stemmed on research"
          lead="The Centre's mandate provides evidence without creating ambiguity in the minds of the organisations we serve as to what the Centre stands for."
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {MANDATE.map((m, i) => {
            const wide = i === 0;
            return (
              <article
                key={m.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className={`card-hover group relative overflow-hidden rounded-3xl border p-8 md:p-10 ${
                  wide
                    ? "lg:col-span-6 border-transparent bg-navy text-white"
                    : "border-slate-200 bg-white"
                } ${i > 0 ? "lg:col-span-3" : ""}`}
              >
                {wide && (
                  <>
                    <div
                      aria-hidden="true"
                      className="bg-blueprint-dark absolute inset-0 opacity-50"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-uniport/28 blur-[70px] transition-all duration-700 group-hover:bg-uniport/45"
                    />
                  </>
                )}
                <div className="relative">
                  <span
                    className={`font-display text-[3.4rem] leading-none font-semibold ${
                      wide ? "text-white/18" : "text-uniport/22"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className={`mt-3 text-[1.5rem] font-semibold ${
                      wide ? "text-white" : "text-navy"
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`mt-4 text-[0.95rem] leading-[1.85] ${
                      wide ? "text-[#bcd8e8]" : "text-slate-600"
                    }`}
                  >
                    {m.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {m.points.map((p) => (
                      <li
                        key={p}
                        className={`rounded-full border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] ${
                          wide
                            ? "border-white/20 bg-white/8 text-[#cfe6f2]"
                            : "border-uniport/25 bg-uniport-mist text-uniport-deep"
                        }`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}

          {/* quote tile */}
          <article
            data-reveal
            style={{ ["--reveal-delay" as string]: "270ms" }}
            className="relative overflow-hidden rounded-3xl border border-gold/40 bg-[#fffaf0] p-8 lg:col-span-6 md:p-10"
          >
            <CornerTicks />
            <svg viewBox="0 0 40 32" className="h-8 w-8 text-gold" fill="currentColor" aria-hidden="true">
              <path d="M0 32V17.6C0 7.9 5.1 1.6 15.2 0l1.8 4.6C11.2 6 8.3 9.4 8.3 14h6.3v18H0Zm23 0V17.6C23 7.9 28.1 1.6 38.2 0L40 4.6C34.2 6 31.3 9.4 31.3 14h6.3v18H23Z" />
            </svg>
            <p className="mt-5 font-display text-[1.4rem] leading-[1.45] font-medium text-navy italic md:text-[1.65rem]">
              This Centre is wired to make relevant contributions in the area of gender,
              conflict and development — addressing challenges that arise in our society due
              to power relations between the genders.
            </p>
            <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">
              Our History · Senate of the University of Port Harcourt
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ Programs ══════════════════════════ */

export function ProgramsRow() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our programmes"
            title={
              <>
                Three quality postgraduate programmes,{" "}
                <span className="text-uniport-deep italic font-light">open to all disciplines</span>
              </>
            }
            lead="Sciences, social sciences, management, engineering and humanities, to mention a few."
          />
          <Btn href="/programs" variant="outline" className="shrink-0">
            See all programmes
          </Btn>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              className={`card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white ${
                i === 1 ? "lg:-mt-8" : ""
              }`}
            >
              <span className="relative block aspect-[16/11] overflow-hidden bg-navy">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span
                  className="absolute inset-0 opacity-70 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-55"
                  style={{
                    background: `linear-gradient(150deg, ${p.accent}dd, #062a44f2)`,
                  }}
                />
                <span className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="flex items-start justify-between">
                    <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {p.duration.fullTime.split("·")[0].trim()}
                    </span>
                    <span className="font-display text-[3rem] leading-none font-semibold text-white/25">
                      0{i + 1}
                    </span>
                  </span>
                  <span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/75">
                      {p.code}
                    </span>
                    <span className="mt-1 block font-display text-[1.85rem] leading-[1.05] font-semibold text-white">
                      {p.name}
                    </span>
                  </span>
                </span>
              </span>

              <span className="flex flex-1 flex-col p-7">
                <span className="block text-[0.95rem] leading-snug font-semibold text-navy">
                  {p.fullName}
                </span>
                <span className="mt-3 block flex-1 text-[0.86rem] leading-relaxed text-slate-500">
                  {p.summary}
                </span>

                <span className="mt-5 border-l-2 border-gold/70 pl-4">
                  <span className="block text-[0.85rem] leading-snug text-slate-600 italic">
                    “{p.quote.text}”
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.58rem] uppercase tracking-[0.15em] text-slate-400">
                    — {p.quote.cite}
                  </span>
                </span>

                <span className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="font-mono text-[0.72rem] text-slate-500">
                    {naira(p.fee.session)}
                    <span className="text-slate-400"> / session</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-uniport-deep">
                    Details
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p
          data-reveal
          className="mt-12 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate-400"
        >
          Tuition fees are accommodating and affordable · instalment payment allowed (t&amp;c)
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════ Stats band ═════════════════════════ */

export function StatsBand() {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy py-20 text-white md:py-28">
      <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 -z-10 opacity-55" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-uniport/22 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="shell relative">
        <SectionHeading
          tone="light"
          eyebrow="The numbers say it all"
          title="A Centre measured in outcomes, not intentions"
          lead="Every figure below is published by the Centre — from cohort size to what happens to our graduates after they leave Choba."
        />

        {/* headline figures */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
          {HEADLINE_STATS.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className="group bg-navy p-6 transition-colors duration-500 hover:bg-navy-mid md:p-7"
            >
              <p className="font-display text-[2.15rem] leading-none font-semibold text-uniport-bright transition-colors duration-400 group-hover:text-gold md:text-[2.5rem]">
                {s.numeric ? <Counter to={s.numeric} suffix={s.suffix ?? ""} /> : s.value}
              </p>
              <p className="mt-3 text-[0.82rem] leading-snug font-semibold text-white">
                {s.label}
              </p>
              {s.note && (
                <p className="mt-1.5 text-[0.7rem] leading-snug text-[#8fb6cc]">{s.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* outcomes + donut */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-center">
          <div
            data-reveal="scale"
            className="flex flex-col items-center rounded-3xl border border-white/12 bg-white/6 p-8 backdrop-blur-md"
          >
            <EquityDonut />
            <p className="mt-6 max-w-[15rem] text-center text-[0.83rem] leading-relaxed text-[#a9cde2]">
              Our cohorts are deliberately balanced — the Centre practises the equity it
              teaches.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {OUTCOME_STATS.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="card-hover group rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur-md hover:border-uniport/50"
              >
                <p className="font-display text-[2.3rem] leading-none font-semibold text-white">
                  {s.numeric ? <Counter to={s.numeric} suffix={s.suffix ?? ""} /> : s.value}
                </p>
                <p className="mt-3 text-[0.87rem] leading-snug font-medium text-[#c2dcea]">
                  {s.label}
                </p>
                {s.note && (
                  <p className="mt-1.5 text-[0.72rem] text-[#7ea6bd]">{s.note}</p>
                )}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-uniport-bright to-transparent transition-transform duration-600 group-hover:scale-x-100"
                />
              </div>
            ))}
            <div
              data-reveal
              className="flex flex-col justify-center rounded-2xl border border-gold/35 bg-gold/10 p-6"
            >
              <Chip tone="gold">Graduate outcomes</Chip>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-white">
                100% of our students graduate in one year — inspite of strike or industrial
                action.
              </p>
              <Link
                href="/programs"
                className="ulink mt-4 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-gold"
              >
                Explore the programmes
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Short courses ═══════════════════════ */

export function ShortCoursesRow() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="We also offer short courses"
            title={
              <>
                Eight certificate courses,{" "}
                <span className="text-uniport-deep italic font-light">three months each</span>
              </>
            }
            lead="A University of Port Harcourt Certificate is given at the end of each course. Our short courses are ideal for corporate organisations and NGOs."
          />
          <Btn href="/programs/short-courses" className="shrink-0">
            Click here to apply
          </Btn>
        </div>

        <div className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {SHORT_COURSES.map((c, i) => (
            <Link
              key={c.code}
              href="/programs/short-courses"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
              className="card-hover group relative flex min-h-[13.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-uniport/10 blur-2xl transition-all duration-600 group-hover:bg-uniport/30"
              />
              <span className="relative flex items-start justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-uniport">
                  {c.code}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-400 transition-all duration-400 group-hover:border-uniport group-hover:bg-uniport group-hover:text-white">
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5.5 3.5 10 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className="relative mt-6">
                <span className="block text-[1.02rem] leading-snug font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                  {c.title}
                </span>
                <span className="mt-2.5 block text-[0.79rem] leading-relaxed text-slate-500">
                  {c.blurb}
                </span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {c.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-mist px-2 py-0.5 font-mono text-[0.53rem] uppercase tracking-[0.12em] text-slate-500 transition-colors duration-300 group-hover:bg-uniport-mist group-hover:text-uniport-deep"
                    >
                      {f}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-3.5 rounded-3xl border border-uniport/20 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {SHORT_COURSE_FACTS.map((f, i) => (
            <div
              key={f.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              className={i > 0 ? "lg:border-l lg:border-slate-100 lg:pl-7" : ""}
            >
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                {f.label}
              </p>
              <p className="mt-2 text-[0.98rem] leading-snug font-semibold text-navy">
                {f.value}
              </p>
              <p className="mt-1 text-[0.76rem] text-slate-500">{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ Tuition teaser ══════════════════════ */

export function TuitionTeaser() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Tuition"
            title="Affordable fees, world-class standard"
            lead="Tuition fees breakdown for PGD, M.Sc. and PhD — with the admission form and acceptance fee shown separately so you know exactly what is payable, and when."
          />
          <ul className="mt-8 space-y-3">
            {[
              "Admission form fee of NGN 25,000 is non-refundable.",
              "Instalment payment is allowed (terms & conditions apply).",
              "Short-course tuition splits into three small instalments — private students only.",
            ].map((t, i) => (
              <li
                key={t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-slate-600"
              >
                <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-uniport/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-uniport" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href="/tuition">See full breakdown</Btn>
            <Btn href="/admission" variant="outline" arrow={false}>
              Admission form payment
            </Btn>
          </div>
        </div>

        <div
          data-reveal="scale"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center justify-between border-b border-slate-100 bg-mist px-6 py-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-slate-500">
              Programme fees · NGN
            </p>
            <Chip>2025 / 2026</Chip>
          </div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-6 py-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-400">
                  Program
                </th>
                <th scope="col" className="px-4 py-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-400">
                  Form
                </th>
                <th scope="col" className="px-4 py-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-400">
                  Acceptance
                </th>
                <th scope="col" className="px-6 py-4 text-right font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-400">
                  School fees / session
                </th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map((p) => (
                <tr
                  key={p.slug}
                  className="group border-b border-slate-100 transition-colors duration-300 last:border-0 hover:bg-uniport-mist/60"
                >
                  <th scope="row" className="px-6 py-5">
                    <Link
                      href={`/programs/${p.slug}`}
                      className="text-[1rem] font-semibold text-navy transition-colors group-hover:text-uniport-deep"
                    >
                      {p.code}
                    </Link>
                  </th>
                  <td className="px-4 py-5 font-mono text-[0.85rem] text-slate-600">
                    {naira(p.fee.form)}
                  </td>
                  <td className="px-4 py-5 font-mono text-[0.85rem] text-slate-600">
                    {naira(p.fee.acceptance)}
                  </td>
                  <td className="px-6 py-5 text-right font-display text-[1.2rem] font-semibold text-navy">
                    {naira(p.fee.session)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center justify-between gap-4 bg-navy px-6 py-5">
            <p className="text-[0.82rem] text-[#a9cde2]">
              Pay to{" "}
              <span className="font-mono text-white">{SITE.bank.accountNumber}</span> ·{" "}
              {SITE.bank.name}
            </p>
            <Link
              href="/tuition"
              className="ulink text-[0.8rem] font-semibold text-uniport-bright hover:text-white"
            >
              Estimate your total →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════════ FAQ ═════════════════════════════ */

export function FaqBand() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title="Everything applicants ask the Centre"
            lead="Admissions, tuition, eligibility and study modes — answered directly from the Centre's published requirements."
          />
          <div className="mt-8 rounded-3xl border border-uniport/22 bg-white p-7">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
              Still deciding?
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">
              If you have any questions regarding our programs, admission, tuition, professors
              or quality of staff — or have requests or suggestions to make — feel free to give
              us a call or write to the Centre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/contact" size="sm">Contact us</Btn>
              <Btn href={SITE.phones[0].href} size="sm" variant="outline" arrow={false}>
                {SITE.phones[0].value}
              </Btn>
            </div>
          </div>
        </div>
        <div data-reveal>
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
