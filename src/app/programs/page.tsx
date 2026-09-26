import Link from "next/link";

import { Counter } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { PROGRAMS, PROGRAM_METHOD_NOTE } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Programs — PGD, M.Sc. & PhD",
  description:
    "CGCDS Uniport offers three postgraduate programmes in Gender, Conflict and Development Studies: Post Graduate Diploma (PGD), Master of Science (M.Sc.) and Doctorate Degree (PhD), plus eight certificate short courses.",
};

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="We offer the following postgraduate programmes"
        lead="Three quality postgraduate programmes open to all disciplines — sciences, social sciences, management, engineering and humanities, to mention a few — plus a portfolio of certificate short courses."
        trail={[
          { label: "Home", href: "/" },
          { label: "Our Programs" },
        ]}
        image="https://images.pexels.com/photos/37410978/pexels-photo-37410978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            At a glance
          </span>
          <div className="mt-4 grid grid-cols-3 gap-5">
            {[
              { v: "3", l: "Programmes" },
              { v: "15", l: "Faculty" },
              { v: "6:1", l: "Ratio" },
            ].map((x) => (
              <div key={x.l}>
                <p className="font-display text-[1.6rem] leading-none font-semibold">
                  {x.v === "3" ? <Counter to={3} /> : x.v}
                </p>
                <p className="mt-1.5 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#9dc6dc]">
                  {x.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* programme dossiers */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="The three programmes"
            title="Choose the level that fits your first degree"
            lead="Each dossier below carries the Centre's published qualification for admission, duration, requirements and award."
          />

          {PROGRAMS.map((p, i) => (
            <article
              key={p.slug}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <div className={`relative min-h-[18rem] overflow-hidden bg-navy ${i % 2 ? "lg:order-2" : ""}`}>
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
                />
                <span
                  className="absolute inset-0 opacity-72 mix-blend-multiply"
                  style={{ background: `linear-gradient(155deg, ${p.accent}e0, #062a44f5)` }}
                />
                <span className="absolute inset-0 flex flex-col justify-between p-8">
                  <span className="flex items-start justify-between">
                    <span className="font-display text-[4.5rem] leading-none font-semibold text-white/22">
                      0{i + 1}
                    </span>
                    <span className="rounded-full border border-white/30 bg-white/12 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white backdrop-blur">
                      {p.code}
                    </span>
                  </span>
                  <span>
                    <span className="block font-display text-[1.9rem] leading-tight font-semibold text-white">
                      {p.name}
                    </span>
                    <span className="mt-3 block border-l-2 border-gold/70 pl-4 text-[0.85rem] leading-snug text-white/85 italic">
                      “{p.quote.text}”
                      <span className="mt-1.5 block font-mono text-[0.55rem] uppercase tracking-[0.16em] not-italic text-white/60">
                        — {p.quote.cite}
                      </span>
                    </span>
                  </span>
                </span>
              </div>

              <div className="p-8 md:p-11">
                <h2 className="text-[clamp(1.4rem,2.6vw,1.95rem)] leading-tight font-semibold text-navy">
                  {p.fullName}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-[1.85] text-slate-600">{p.summary}</p>

                <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-mist p-5">
                    <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                      Duration · full time
                    </dt>
                    <dd className="mt-2 text-[0.88rem] leading-snug font-medium text-navy">
                      {p.duration.fullTime}
                    </dd>
                    {p.duration.partTime !== "Not offered" && (
                      <>
                        <dt className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                          Part time
                        </dt>
                        <dd className="mt-1.5 text-[0.88rem] leading-snug font-medium text-navy">
                          {p.duration.partTime}
                        </dd>
                      </>
                    )}
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-mist p-5">
                    <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                      Award
                    </dt>
                    <dd className="mt-2 text-[0.88rem] leading-snug font-medium text-navy">
                      {p.award}
                    </dd>
                    <dt className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                      School fees / session
                    </dt>
                    <dd className="mt-1.5 font-display text-[1.35rem] leading-none font-semibold text-navy">
                      {naira(p.fee.session)}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-7 space-y-2.5">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-uniport" />
                      {o}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Btn href={`/programs/${p.slug}`} size="sm">
                    Full admission requirements
                  </Btn>
                  <Btn href="/admission" size="sm" variant="outline" arrow={false}>
                    Apply for {p.code}
                  </Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* method of application + short courses */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -top-28 right-1/4 h-[24rem] w-[24rem] rounded-full bg-uniport/20 blur-[130px]"
        />
        <div className="shell relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl border border-white/14 bg-white/7 p-8 backdrop-blur-xl md:p-10">
            <CornerTicks />
            <Eyebrow tone="light">Method of application</Eyebrow>
            <p className="mt-5 text-[1rem] leading-[1.85] text-[#c2dcea]">
              {PROGRAM_METHOD_NOTE}
            </p>
            <ol className="mt-7 space-y-4">
              {[
                "Pay the non-refundable admission form fee of NGN 25,000 to Fidelity Bank, PLC — account 5210017988.",
                "Open the admission portal and upload a scan-copy or screenshot-copy of your proof of payment.",
                "Complete the application, then submit. PhD candidates must in addition submit a proposed plan of research.",
                "Await the Centre's response; PhD admission is also based on interview performance.",
              ].map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-uniport-bright/45 font-mono text-[0.62rem] text-uniport-bright">
                    {i + 1}
                  </span>
                  <span className="text-[0.9rem] leading-relaxed text-[#a9cde2]">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/admission">Proceed to admission portal</Btn>
              <Btn href="/tuition" variant="light" arrow={false}>
                Tuition breakdown
              </Btn>
            </div>
          </div>

          <div>
            <Eyebrow tone="light">We also offer short courses</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.08] font-semibold">
              Eight certificate courses, three months each
            </h2>
            <p className="mt-5 text-[0.98rem] leading-[1.85] text-[#a9cde2]">
              A University of Port Harcourt Certificate is given at the end of each course. Our
              short courses are ideal for corporate organisations and NGOs. Tuition is
              affordable and can be paid in three small instalments — private students only.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Gender Inequality and Justice",
                "Digital Peace Building",
                "United Nations and Nationality",
                "Human Rights, Citizenship and Development",
                "Disarmament, Demobilization & Reintegration",
                "Conflict Sensitivity and Mediation",
                "Gender and Conflict Prevention",
                "Gender and Peace Supportive Operations",
              ].map((c) => (
                <Link
                  key={c}
                  href="/programs/short-courses"
                  className="rounded-full border border-white/20 px-4 py-2 text-[0.8rem] font-medium text-[#cfe6f2] transition-all duration-300 hover:-translate-y-0.5 hover:border-uniport-bright hover:bg-uniport/22 hover:text-white"
                >
                  {c}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/programs/short-courses" variant="light">
                See our short courses
              </Btn>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip tone="ghost">3 months each</Chip>
              <Chip tone="ghost">UniPort certificate</Chip>
              <Chip tone="ghost">3 instalments</Chip>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
