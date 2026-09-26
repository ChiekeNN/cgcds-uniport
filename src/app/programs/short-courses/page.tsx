import { Counter } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { SHORT_COURSE_FACTS, SHORT_COURSES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Short Courses — Certificate Training",
  description:
    "Eight three-month certificate short courses from CGCDS Uniport: Gender Inequality and Justice, Digital Peace Building, United Nations and Nationality, Human Rights, DDR, Conflict Sensitivity and Mediation, Gender and Conflict Prevention, and Gender and Peace Supportive Operations.",
};

const SUITABILITY = [
  {
    group: "Corporate organisations",
    body: "Cohort delivery for staff teams — gender mainstreaming, conflict sensitivity and mediation capability built inside your organisation.",
  },
  {
    group: "NGOs & civil society",
    body: "Practitioner training on DDR, peace supportive operations and conflict prevention for programme staff and field officers.",
  },
  {
    group: "Private students",
    body: "Individual applicants can pay tuition in three small instalments and study alongside a full-time job.",
  },
  {
    group: "Public sector & agencies",
    body: "Human rights, citizenship and nationality modules for policy officers, justice-sector staff and security agencies.",
  },
];

export default function ShortCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Short Courses"
        title="Eight certificate courses, three months each"
        lead="A University of Port Harcourt Certificate is given at the end of each course. Our short courses are ideal for corporate organisations and NGOs — tuition is affordable and can be paid in three small instalments for private students."
        trail={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/programs" },
          { label: "Short Courses" },
        ]}
        image="https://images.pexels.com/photos/36791504/pexels-photo-36791504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Courses on offer
          </span>
          <p className="mt-2 font-display text-[2.6rem] leading-none font-semibold">
            <Counter to={SHORT_COURSES.length} />
          </p>
          <p className="mt-2 text-[0.8rem] text-[#a9cde2]">
            3 months each · UniPort certificate
          </p>
        </div>
      </PageHero>

      {/* facts strip */}
      <section className="relative overflow-hidden bg-uniport py-10 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-uniport-deep via-uniport to-uniport-bright"
        />
        <div className="shell relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SHORT_COURSE_FACTS.map((f, i) => (
            <div
              key={f.label}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 75}ms` }}
              className={i > 0 ? "lg:border-l lg:border-white/25 lg:pl-7" : ""}
            >
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-white/70">
                {f.label}
              </p>
              <p className="mt-2 text-[1.02rem] leading-snug font-semibold">{f.value}</p>
              <p className="mt-1 text-[0.78rem] text-white/75">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* course catalogue */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our short courses"
              title="The catalogue"
              lead="Each course runs for three months and closes with a University of Port Harcourt certificate. Click any course to apply, or book a cohort for your organisation."
            />
            <Btn href="/admission" className="shrink-0">
              Click here to apply
            </Btn>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {SHORT_COURSES.map((c, i) => (
              <article
                key={c.code}
                data-reveal={i % 2 === 0 ? "left" : "right"}
                style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
                className="card-hover group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-uniport-bright via-uniport to-uniport-deep transition-transform duration-600 group-hover:scale-x-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-uniport/8 blur-2xl transition-all duration-600 group-hover:bg-uniport/22"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-display text-[2.6rem] leading-none font-semibold text-uniport/18 transition-colors duration-500 group-hover:text-uniport/35">
                    {c.code.replace("SC ", "")}
                  </span>
                  <span className="rounded-full border border-uniport/25 bg-uniport-mist px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-uniport-deep">
                    {c.code} · Short course
                  </span>
                </div>

                <h3 className="relative mt-4 text-[1.3rem] leading-tight font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                  {c.title}
                </h3>
                <p className="relative mt-3.5 flex-1 text-[0.92rem] leading-[1.8] text-slate-600">
                  {c.blurb}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {c.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-mist px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.13em] text-slate-500 transition-colors duration-300 group-hover:bg-uniport-mist group-hover:text-uniport-deep"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="relative mt-7 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-slate-400">
                    3 months · certificate
                  </span>
                  <a
                    href="/admission"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[0.8rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport"
                  >
                    Apply now
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* who they're for */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Who they're for"
              title="Built for practitioners, not only for academics"
              lead="Our short courses are ideal for corporate organisations and NGOs. Tuition for a short course is affordable, and can be paid for in three small instalments — private students only."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>Cohort booking</Chip>
              <Chip>In-house delivery</Chip>
              <Chip tone="gold">3 instalments</Chip>
            </div>
          </div>

          <div className="space-y-4">
            {SUITABILITY.map((s, i) => (
              <article
                key={s.group}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="card-hover group flex gap-6 rounded-3xl border border-slate-200 bg-white p-7"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy to-uniport-deep font-display text-[1.1rem] font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <h3 className="text-[1.1rem] leading-snug font-semibold text-navy">
                    {s.group}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-[1.8] text-slate-600">{s.body}</p>
                </span>
              </article>
            ))}

            <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-[#fffaf0] p-8">
              <CornerTicks />
              <Eyebrow>Booking a cohort</Eyebrow>
              <p className="mt-4 text-[0.95rem] leading-[1.85] text-slate-600">
                To book a cohort for your organisation, or to request an in-house delivery of
                any of the eight courses, write to{" "}
                <a href={`mailto:${SITE.emails[0]}`} className="ulink font-semibold text-uniport-deep">
                  {SITE.emails[0]}
                </a>{" "}
                with the course title, the number of participants and your preferred start
                month. The Training &amp; Community Service office responds within one working
                day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href="/contact" size="sm">Enquire about a cohort</Btn>
                <Btn href="/admission" size="sm" variant="outline" arrow={false}>
                  Apply as a private student
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
