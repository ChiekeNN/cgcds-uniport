import Link from "next/link";

import { Accordion, Counter, PillarRail } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import {
  ABOUT_IMAGE,
  FAQS,
  HEADLINE_STATS,
  LECTURE_IMAGE,
  MANDATE,
  PILLARS,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us — Philosophy, Vision & Mission",
  description:
    "Welcome to the Centre for Gender, Conflict and Development Studies, Uniport. Our philosophy, vision, mission and the rationale for the Centre's existence.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CGCDS Uniport"
        title="Welcome to the Centre for Gender, Conflict and Development Studies"
        lead="A creation of the Senate of the University of Port Harcourt — wired to make relevant contributions in gender, conflict and development through research, teaching and community service."
        trail={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        image={LECTURE_IMAGE}
      >
        <div className="flex flex-col gap-3 rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Director
          </span>
          <span className="font-display text-[1.3rem] leading-tight font-semibold">
            {SITE.director}
          </span>
          <span className="mt-2 text-[0.8rem] leading-relaxed text-[#a9cde2]">
            {SITE.address.building}
            <br />
            {SITE.address.campus}
          </span>
          <Link
            href="/about/staff"
            className="ulink mt-3 text-[0.8rem] font-semibold text-gold"
          >
            Meet the directorate →
          </Link>
        </div>
      </PageHero>

      {/* intro + figures */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.85rem,4.2vw,3rem)] leading-[1.05] font-semibold text-navy">
              A place of intense energy, creativity &amp; inclusiveness
            </h2>
            <p className="mt-6 text-[1.05rem] leading-[1.85] text-slate-600">
              CGCDS Uniport fosters learning, creativity and inclusiveness in both the male and
              female gender, towards a better society. The Centre exposes the male and female
              population to the knowledge of social, cultural, economic and political
              hindrances to development at the local, national and international levels, in
              order to attain peaceful co-existence for sustainable development.
            </p>
            <p className="mt-5 leading-[1.85] text-slate-600">
              This is achieved by the mobilization and application of relevant skills and
              competencies toward evidence-based policy research in gender and development
              studies — and thus reducing the gap caused by conflict in our daily interactions.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HEADLINE_STATS.slice(0, 6).map((s, i) => (
                <div
                  key={s.label}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                  className="rounded-2xl border border-slate-200 bg-mist p-4"
                >
                  <p className="font-display text-[1.6rem] leading-none font-semibold text-uniport-deep">
                    {s.numeric ? <Counter to={s.numeric} suffix={s.suffix ?? ""} /> : s.value}
                  </p>
                  <p className="mt-2 text-[0.72rem] leading-snug text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href="/about/history">Our history</Btn>
              <Btn href="/programs" variant="outline" arrow={false}>
                See our programmes
              </Btn>
            </div>
          </div>

          <div className="relative">
            <div
              data-reveal="scale"
              className="overflow-hidden rounded-[2rem] bg-navy shadow-[var(--shadow-lift)]"
            >
              <img
                src={ABOUT_IMAGE}
                alt="University of Port Harcourt graduates in academic dress"
                loading="lazy"
                decoding="async"
                className="anim-kenburns h-[24rem] w-full object-cover md:h-[30rem]"
              />
            </div>
            <div
              data-reveal="left"
              className="absolute -bottom-7 right-5 max-w-[17rem] rounded-2xl border border-uniport/20 bg-white p-6 shadow-[var(--shadow-lift)] md:-right-7"
            >
              <CornerTicks />
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                Multidisciplinary
              </p>
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-slate-600">
                Our programmes are open to all disciplines — sciences, social sciences,
                management, engineering and humanities, to mention a few.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* four statements */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="The four statements"
            title="Philosophy · Vision · Mission · Rationale"
            lead="Published by the Centre and reproduced here in full — scroll the rail to move between them."
          />
          <div className="mt-14">
            <PillarRail items={PILLARS} />
          </div>
        </div>
      </section>

      {/* mandate */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Core mandate"
            title="Research, teaching and community service"
            lead="Stemmed on research, thereby providing evidence without creating ambiguity in the minds of such organisations as to what the Centre stands for."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {MANDATE.map((m, i) => (
              <article
                key={m.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="card-hover group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-uniport/10 blur-2xl transition-all duration-600 group-hover:bg-uniport/28"
                />
                <span className="relative font-display text-[3rem] leading-none font-semibold text-uniport/22">
                  0{i + 1}
                </span>
                <h3 className="relative mt-3 text-[1.35rem] font-semibold text-navy">
                  {m.title}
                </h3>
                <p className="relative mt-4 text-[0.92rem] leading-[1.85] text-slate-600">
                  {m.body}
                </p>
                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {m.points.map((p) => (
                    <li key={p}>
                      <Chip>{p}</Chip>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Before you write to us"
              title="The questions the Centre answers most often"
            />
            <div className="mt-8 rounded-3xl border border-uniport/22 bg-white p-7">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                Get in touch
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-slate-600">
                If you have any questions regarding our programs, admission, tuition,
                professors or quality of staff — or have requests or suggestions to make — feel
                free to give us a call or write to the Centre.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href="/contact" size="sm">Contact us</Btn>
                <Btn href="/admission" size="sm" variant="outline" arrow={false}>
                  Apply now
                </Btn>
              </div>
            </div>
          </div>
          <div data-reveal>
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
