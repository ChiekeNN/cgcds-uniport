import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Accordion, Counter } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { FAQS, PROGRAMS, SHORT_COURSES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

type Params = { slug: string };

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return { title: "Programme not found" };
  return {
    title: `${program.code} — ${program.name}`,
    description: `${program.fullName}. ${program.summary}`,
  };
}

export default async function ProgramPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  const index = PROGRAMS.indexOf(program);
  const next = PROGRAMS[(index + 1) % PROGRAMS.length];
  const prev = PROGRAMS[(index - 1 + PROGRAMS.length) % PROGRAMS.length];
  const total = program.fee.form + program.fee.acceptance + program.fee.session;

  return (
    <>
      <PageHero
        eyebrow={`${program.code} Program`}
        title={program.fullName}
        lead={program.summary}
        trail={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: `${program.code} Program` },
        ]}
        image={program.image}
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            School fees / session
          </span>
          <p className="mt-2 font-display text-[2.2rem] leading-none font-semibold">
            {naira(program.fee.session)}
          </p>
          <p className="mt-2.5 text-[0.78rem] text-[#a9cde2]">
            + {naira(program.fee.form)} form · {naira(program.fee.acceptance)} acceptance
          </p>
          <Link
            href="/tuition"
            className="ulink mt-3 inline-block text-[0.78rem] font-semibold text-gold"
          >
            Full fee breakdown →
          </Link>
        </div>
      </PageHero>

      {/* epigraph */}
      <section className="relative overflow-hidden bg-paper py-14">
        <div className="shell">
          <figure
            data-reveal="mask"
            className="relative mx-auto max-w-4xl rounded-[2rem] border border-gold/35 bg-[#fffaf0] px-8 py-12 text-center md:px-16"
          >
            <CornerTicks />
            <svg viewBox="0 0 40 32" className="mx-auto h-9 w-9 text-gold" fill="currentColor" aria-hidden="true">
              <path d="M0 32V17.6C0 7.9 5.1 1.6 15.2 0l1.8 4.6C11.2 6 8.3 9.4 8.3 14h6.3v18H0Zm23 0V17.6C23 7.9 28.1 1.6 38.2 0L40 4.6C34.2 6 31.3 9.4 31.3 14h6.3v18H23Z" />
            </svg>
            <blockquote className="mt-6 font-display text-[clamp(1.4rem,3.4vw,2.25rem)] leading-[1.32] font-medium text-navy italic">
              {program.quote.text}
            </blockquote>
            <figcaption className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">
              — {program.quote.cite}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* admission requirements */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{program.code}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.08] font-semibold text-navy">
              Qualification for admission
            </h2>
            <p className="mt-5 text-[0.97rem] leading-[1.85] text-slate-600">
              The requirements below are published by the Centre for the{" "}
              {program.fullName}. Read them alongside the duration and the requirements for
              graduation before you pay for the admission form.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                Duration of programme
              </p>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-[0.76rem] font-semibold text-slate-500">Full time</dt>
                  <dd className="mt-1 text-[0.95rem] font-medium text-navy">
                    {program.duration.fullTime}
                  </dd>
                </div>
                {program.duration.partTime !== "Not offered" && (
                  <div className="border-t border-slate-100 pt-4">
                    <dt className="text-[0.76rem] font-semibold text-slate-500">Part time</dt>
                    <dd className="mt-1 text-[0.95rem] font-medium text-navy">
                      {program.duration.partTime}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/admission">Apply for {program.code}</Btn>
              <Btn href="/contact" variant="outline" arrow={false}>
                Ask admissions
              </Btn>
            </div>
          </div>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-mist px-7 py-4">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                  I · Qualification for admission
                </span>
              </div>
              <ol className="divide-y divide-slate-100">
                {program.admission.map((a, i) => (
                  <li key={i} className="flex gap-5 px-7 py-6">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-uniport-mist font-mono text-[0.68rem] font-semibold text-uniport-deep">
                      {String.fromCharCode(97 + i)}
                    </span>
                    <p className="text-[0.96rem] leading-[1.85] text-slate-600">{a}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-mist px-7 py-4">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                  {program.slug === "phd" ? "II" : "III"} · Requirements
                  {program.slug === "phd" ? " for graduation" : ""}
                </span>
              </div>
              <ul className="divide-y divide-slate-100">
                {program.requirements.map((r, i) => (
                  <li key={i} className="flex gap-5 px-7 py-6">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    <p className="text-[0.96rem] leading-[1.85] text-slate-600">{r}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-uniport/30 bg-navy p-8 text-white md:p-10">
              <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-45" />
              <div aria-hidden="true" className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-uniport/25 blur-[70px]" />
              <div className="relative">
                <Eyebrow tone="light">Award on completion</Eyebrow>
                <p className="mt-4 font-display text-[clamp(1.3rem,2.8vw,1.9rem)] leading-tight font-semibold">
                  {program.award}
                </p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-[#a9cde2]">
                  On successful completion of the programme, each candidate is awarded the{" "}
                  {program.award} by the University of Port Harcourt.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Chip tone="ghost">Senate-approved</Chip>
                  <Chip tone="ghost">Open to all disciplines</Chip>
                  <Chip tone="ghost">Instalment payment (t&amp;c)</Chip>
                </div>
              </div>
            </div>

            {/* fee summary */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 bg-mist px-7 py-4">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                  Fees · NGN
                </span>
              </div>
              <dl className="divide-y divide-slate-100">
                {[
                  ["Admission form (non-refundable)", program.fee.form],
                  ["Acceptance fee", program.fee.acceptance],
                  ["School fees / session", program.fee.session],
                ].map(([label, amount]) => (
                  <div key={String(label)} className="flex items-center justify-between gap-4 px-7 py-4">
                    <dt className="text-[0.9rem] text-slate-600">{label as string}</dt>
                    <dd className="font-mono text-[0.92rem] font-semibold text-navy">
                      {naira(amount as number)}
                    </dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4 bg-uniport-mist px-7 py-5">
                  <dt className="text-[0.92rem] font-semibold text-navy">First-year total</dt>
                  <dd className="font-display text-[1.5rem] font-semibold text-uniport-deep">
                    {naira(total)}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 px-7 py-5">
                <p className="text-[0.82rem] text-slate-500">
                  Pay to <span className="font-mono font-semibold text-navy">{SITE.bank.accountNumber}</span> ·{" "}
                  {SITE.bank.name}
                </p>
                <Link href="/tuition" className="ulink text-[0.82rem] font-semibold text-uniport-deep">
                  Estimate total →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cohort numbers */}
      <section className="relative overflow-hidden bg-paper py-16">
        <div className="shell">
          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-mist p-8 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
            {[
              { n: 94, s: "+", l: "PG students at the Centre" },
              { n: 15, s: "", l: "Full-time faculty / instructors" },
              { n: 100, s: "%", l: "Graduate in one year" },
              { n: 90, s: "%", l: "Get promoted after graduating" },
            ].map((x, i) => (
              <div
                key={x.l}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 75}ms` }}
                className={i > 0 ? "lg:border-l lg:border-slate-200 lg:pl-8" : ""}
              >
                <p className="font-display text-[2.4rem] leading-none font-semibold text-uniport-deep">
                  <Counter to={x.n} suffix={x.s} />
                </p>
                <p className="mt-2.5 text-[0.82rem] leading-snug text-slate-500">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Applicant FAQ" title={`Before you apply for the ${program.code}`} />
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7">
              <p className="text-[0.9rem] leading-relaxed text-slate-600">
                Questions about eligibility for the {program.fullName} are answered by the
                Centre's admissions office, Monday to Friday, 8:00am – 4:00pm.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn href="/contact" size="sm">Contact us</Btn>
                <Btn href={SITE.phones[2].href} size="sm" variant="outline" arrow={false}>
                  {SITE.phones[2].value}
                </Btn>
              </div>
            </div>
          </div>
          <div data-reveal>
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* pager + related */}
      <section className="relative overflow-hidden bg-navy py-16 text-white">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-45" />
        <div className="shell relative">
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href={`/programs/${prev.slug}`}
              className="card-hover group rounded-3xl border border-white/12 bg-white/6 p-7 backdrop-blur-md hover:border-uniport/55"
            >
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#7ea6bd]">
                ← Previous
              </span>
              <span className="mt-3 block font-display text-[1.3rem] leading-tight font-semibold">
                {prev.code} · {prev.name}
              </span>
            </Link>
            <Link
              href="/programs/short-courses"
              className="card-hover group rounded-3xl border border-white/12 bg-white/6 p-7 backdrop-blur-md hover:border-uniport/55"
            >
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#7ea6bd]">
                Also on offer
              </span>
              <span className="mt-3 block font-display text-[1.3rem] leading-tight font-semibold">
                {SHORT_COURSES.length} Short Courses
              </span>
              <span className="mt-2 block text-[0.82rem] text-[#a9cde2]">
                Three months each · UniPort certificate
              </span>
            </Link>
            <Link
              href={`/programs/${next.slug}`}
              className="card-hover group rounded-3xl border border-white/12 bg-white/6 p-7 text-right backdrop-blur-md hover:border-uniport/55"
            >
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-[#7ea6bd]">
                Next →
              </span>
              <span className="mt-3 block font-display text-[1.3rem] leading-tight font-semibold">
                {next.code} · {next.name}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
