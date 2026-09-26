import Link from "next/link";

import { Btn, Eyebrow } from "@/components/ui";
import { NAV, SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[78svh] items-center overflow-hidden bg-abyss py-24 text-white">
      <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-uniport/22 blur-[140px]"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
        <div>
          <Eyebrow tone="light">Error 404</Eyebrow>
          <p className="mt-6 font-display text-[clamp(5rem,18vw,11rem)] leading-[0.82] font-semibold text-white/12">
            404
          </p>
          <h1 className="mt-6 max-w-xl text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.05] font-semibold">
            That page isn't in the Centre's archive
          </h1>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.85] text-[#a9cde2]">
            The link may be from an older version of cgcds.com.ng. Everything the Centre
            publishes — programmes, tuition, journals, news and admissions — is reachable from
            the menu below.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href="/" size="lg">Back to home</Btn>
            <Btn href="/admission" variant="light" size="lg" arrow={false}>
              Apply now
            </Btn>
          </div>
        </div>

        <div className="rounded-3xl border border-white/14 bg-white/7 p-8 backdrop-blur-xl">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-uniport-bright">
            Jump to
          </p>
          <ul className="mt-5 space-y-1">
            {NAV.flatMap((item) => [
              { label: item.label, href: item.href },
              ...(item.children ?? []),
            ])
              .filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i)
              .map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-[0.92rem] text-[#c2dcea] transition-colors duration-300 hover:bg-white/10 hover:text-white"
                  >
                    {l.label}
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-uniport opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-7 border-t border-white/12 pt-6 text-[0.82rem] text-[#a9cde2]">
            <p>Still stuck? Call {SITE.phones[0].value}</p>
            <a href={`mailto:${SITE.emails[0]}`} className="ulink mt-1.5 inline-block font-semibold text-gold">
              {SITE.emails[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
