import Link from "next/link";

import { NewsletterForm } from "@/components/forms";
import { PROGRAMS, SHORT_COURSES } from "@/lib/content";
import { QUICK_LINKS, SITE } from "@/lib/site";
import { Brand, Btn, Eyebrow } from "@/components/ui";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/search/top?q=Centre%20for%20Gender%20Conflict%20and%20Development%20Studies",
    path: "M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.85.24-1.42 1.45-1.42h1.53V5.09c-.27-.04-1.18-.11-2.24-.11-2.22 0-3.74 1.35-3.74 3.84v2.08H8v2.9h2.5V21h3Z",
  },
  {
    label: "X",
    href: "https://x.com/search?q=cgcds%20uniport",
    path: "M17.2 3h-3.1l-3.6 4.9L6.3 3H3l6 8.2L3.2 21h3.1l3.9-5.3 4.6 5.3H18l-6.3-8.6L17.2 3Zm-1.8 1.7 1 1.4-9 12.2-1.2-1.6 9.2-12Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/search/results/all/?keywords=University%20of%20Port%20Harcourt",
    path: "M6.9 21H3.6V9.3h3.3V21Zm-1.65-13.2a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM21 21h-3.3v-5.9c0-1.5-.55-2.5-1.85-2.5-1 0-1.6.68-1.86 1.34-.1.24-.12.57-.12.9V21H10.6s.04-10.5 0-11.7h3.3v1.7c.42-.68 1.2-1.64 2.94-1.64 2.14 0 3.76 1.4 3.76 4.42V21Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/results?search_query=university+of+port+harcourt",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.4 12 10 15.2Z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative isolate overflow-hidden bg-abyss text-[#a9cde2]">
      <div
        aria-hidden="true"
        className="bg-blueprint-dark absolute inset-0 -z-10 opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 -z-10 h-[32rem] w-[32rem] rounded-full bg-uniport/18 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-gold/8 blur-[120px]"
      />

      {/* ── CTA band ── */}
      <div className="border-b border-white/10">
        <div className="shell grid gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:py-20">
          <div>
            <Eyebrow tone="light">Ready to get started on your goals?</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.03] font-semibold text-white">
              Join a Centre built on{" "}
              <span className="bg-gradient-to-r from-uniport-bright via-uniport to-gold bg-clip-text text-transparent">
                evidence, equity and inclusiveness
              </span>
              .
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[#8fb6cc]">
              2025/2026 admission is ongoing across the PGD, M.Sc. and PhD programmes — and
              eight certificate short courses run every three months for corporate
              organisations and NGOs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="/admission" size="lg">Apply Now</Btn>
            <Btn href="/contact" variant="light" size="lg" arrow={false}>
              Contact Admissions
            </Btn>
          </div>
        </div>
      </div>

      {/* ── main grid ── */}
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr] lg:gap-10">
        <div>
          <Brand tone="light" />
          <p className="mt-6 text-[0.88rem] leading-[1.85]">
            {SITE.address.full}
          </p>
          <p className="mt-4 text-[0.82rem] text-[#7ea6bd]">{SITE.address.road}</p>
          <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-[0.85rem]">
            <p>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#6f9cb5]">
                Director
              </span>
              <br />
              <span className="text-white">{SITE.director}</span>
            </p>
            <p className="pt-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#6f9cb5]">
                Centre phone
              </span>
              <br />
              <a href={SITE.phones[0].href} className="ulink text-white">
                {SITE.phones[0].value}
              </a>
            </p>
            <p className="pt-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#6f9cb5]">
                Mobile phone
              </span>
              <br />
              <a href={SITE.phones[1].href} className="ulink text-white">
                {SITE.phones[1].value}
              </a>
            </p>
            <p className="pt-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#6f9cb5]">
                Mail
              </span>
              <br />
              {SITE.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="ulink mr-3 text-white">
                  {e}
                </a>
              ))}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-uniport-bright">
            Quick links
          </h3>
          <ul className="mt-6 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-2 text-[0.87rem] transition-colors duration-300 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-3 bg-uniport/60 transition-all duration-300 group-hover:w-6 group-hover:bg-uniport-bright"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
            <a
              href={SITE.handbookUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2.5 text-[0.84rem] text-gold transition-colors hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M10 3v9m0 0 3.2-3.2M10 12 6.8 8.8M4 14.5v1.2A1.3 1.3 0 0 0 5.3 17h9.4a1.3 1.3 0 0 0 1.3-1.3v-1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download student handbook (PDF)
            </a>
            <a
              href="https://cgcds.com.ng:2096/"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2.5 text-[0.84rem] transition-colors hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3.5" y="8.5" width="13" height="8" rx="2" /><path d="M6.8 8.5V6a3.2 3.2 0 0 1 6.4 0v2.5" strokeLinecap="round" />
              </svg>
              Staff email login
            </a>
            <Link
              href="/admin"
              className="group flex items-center gap-2.5 text-[0.84rem] transition-colors hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M3 16.5V9m4.7 7.5V4.5m4.6 12v-6m4.7 6V7" strokeLinecap="round" />
              </svg>
              Centre dashboard
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-uniport-bright">
            Our programs
          </h3>
          <ul className="mt-6 space-y-3">
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/programs/${p.slug}`}
                  className="group block text-[0.86rem] leading-snug transition-colors duration-300 hover:text-white"
                >
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-uniport">
                    {p.code}
                  </span>
                  <span className="mt-0.5 block">
                    {p.code}, Gender, Conflict and Development Studies
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-uniport-bright">
            Short courses
          </h3>
          <ul className="mt-5 space-y-2">
            {SHORT_COURSES.slice(0, 5).map((c) => (
              <li key={c.code}>
                <Link
                  href="/programs/short-courses"
                  className="text-[0.82rem] leading-snug transition-colors duration-300 hover:text-white"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/programs/short-courses"
                className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gold hover:text-white"
              >
                All {SHORT_COURSES.length} courses →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-uniport-bright">
            Find us online
          </h3>
          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#9dc6dc] transition-all duration-300 hover:-translate-y-1 hover:border-uniport hover:bg-uniport/20 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <h3 className="mt-9 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-uniport-bright">
            Admission alerts
          </h3>
          <p className="mt-4 text-[0.84rem] leading-relaxed">
            Get notified when admission forms go on sale, when a short course cohort opens,
            and when the Centre publishes new research.
          </p>
          <NewsletterForm />

          <div className="mt-8 rounded-2xl border border-white/12 bg-white/5 p-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#6f9cb5]">
              Staffed hours
            </p>
            {SITE.hours.map((h) => (
              <p key={h.day} className="mt-2 flex justify-between gap-3 text-[0.82rem]">
                <span>{h.day}</span>
                <span className="text-white">{h.time}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-7 text-[0.76rem] md:flex-row">
          <p className="text-center text-[#7ea6bd] md:text-left">
            Copyright © {year} cgcds.com.ng — Centre for Gender, Conflict and Development
            Studies, University of Port Harcourt. A creation of the Senate of the University
            of Port Harcourt.
          </p>
          <p className="flex items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#6f9cb5]">
            <span className="hidden sm:inline">Powered by Squirrel Technologies Ltd</span>
            <Link href="/about/history" className="ulink hover:text-white">Our History</Link>
            <Link href="/journals" className="ulink hover:text-white">Journals</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
