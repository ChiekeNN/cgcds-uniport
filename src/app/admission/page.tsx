import { ApplicationForm } from "@/components/forms";
import { Accordion } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { FAQS, PROGRAMS, SHORT_COURSES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admission Form Payment & Application",
  description:
    "Pay the NGN 25,000 non-refundable admission form fee to Fidelity Bank 5210017988, then complete the CGCDS Uniport online application for the PGD, M.Sc., PhD or a short course.",
};

const naira = (n: number) => `NGN ${n.toLocaleString("en-NG")}`;

const CHECKLIST = [
  "Pay the non-refundable admission form fee of NGN 25,000 to the Centre's Fidelity Bank account.",
  "Keep your deposit slip, transfer receipt or a screenshot of the transaction.",
  "Have your credentials ready: degree certificate or statement of result, and NYSC discharge certificate where applicable.",
  "Know your CGPA on the University of Port Harcourt 5-point scale, or your equivalent grade.",
  "PhD candidates: prepare a proposed plan of research to submit alongside the application.",
  "Complete every step of the form below — the Centre verifies payment before processing.",
];

export default function AdmissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Admission Form Payment"
        title="2025/2026 postgraduate admission is ongoing"
        lead="Applications are hereby invited from suitably qualified candidates for admission into the Post Graduate Diploma (PGD), Master of Science Degree (M.Sc.), Doctor of Philosophy Degree, and the Centre's certificate short courses."
        trail={[
          { label: "Home", href: "/" },
          { label: "Admission Form Payment" },
        ]}
        image="https://images.pexels.com/photos/10604063/pexels-photo-10604063.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-gold/40 bg-gold/12 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-gold">
            Admission form fee
          </span>
          <p className="mt-2 font-display text-[2.3rem] leading-none font-semibold text-white">
            {naira(SITE.bank.amount)}
          </p>
          <p className="mt-2.5 text-[0.78rem] text-[#ffe6b0]">
            Non-refundable · pay before applying
          </p>
        </div>
      </PageHero>

      {/* payment notice */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Payment notice"
              title="Online payments are currently disabled"
              lead="Intending students are required to pay a non-refundable admission form fee of NGN 25,000 before proceeding to apply into our programmes. All payments go through the Centre's designated bank account."
            />

            <div
              data-reveal="scale"
              className="relative mt-10 overflow-hidden rounded-[2rem] border border-uniport/28 bg-navy p-8 text-white md:p-10"
            >
              <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-50" />
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-uniport/30 blur-[80px]"
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-uniport-bright">
                      Pay to
                    </p>
                    <p className="mt-3 font-display text-[clamp(2rem,5vw,3.1rem)] leading-none font-semibold tracking-tight">
                      {SITE.bank.accountNumber}
                    </p>
                  </div>
                  <Chip tone="ghost">{SITE.bank.name}</Chip>
                </div>

                <dl className="mt-8 space-y-4 border-t border-white/12 pt-7">
                  {[
                    ["Account name", SITE.bank.accountName],
                    ["Amount", naira(SITE.bank.amount)],
                    ["Nature of fee", SITE.bank.note],
                  ].map(([k, v]) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#7ea6bd]">
                        {k}
                      </dt>
                      <dd className="text-[0.95rem] leading-snug text-white">{v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-7 rounded-2xl border border-gold/35 bg-gold/10 p-5 text-[0.88rem] leading-relaxed text-[#ffe6b0]">
                  You will be required to upload proof of payment (scan-copy / screenshot-copy)
                  on the application portal before submitting your application.
                </p>
              </div>
            </div>

            <div className="relative mt-8 rounded-3xl border border-slate-200 bg-mist p-7">
              <CornerTicks />
              <Eyebrow>Before you start</Eyebrow>
              <ul className="mt-5 space-y-3">
                {CHECKLIST.map((c, i) => (
                  <li
                    key={c}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                    className="flex items-start gap-3.5 text-[0.92rem] leading-relaxed text-slate-600"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-uniport/45 bg-white">
                      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-uniport-deep" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="m3 8.5 3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* eligibility quick reference */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-9">
              <Eyebrow>Eligibility at a glance</Eyebrow>
              <h3 className="mt-4 text-[1.5rem] leading-tight font-semibold text-navy">
                Which programme can you apply for?
              </h3>
              <div className="mt-7 space-y-4">
                {PROGRAMS.map((p) => (
                  <a
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className="group block rounded-2xl border border-slate-200 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-uniport/50 hover:bg-uniport-mist/50"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-display text-[1.35rem] font-semibold text-navy group-hover:text-uniport-deep">
                        {p.code}
                      </span>
                      <span className="font-mono text-[0.72rem] text-slate-500">
                        {naira(p.fee.session)} / session
                      </span>
                    </span>
                    <span className="mt-2.5 block text-[0.85rem] leading-relaxed text-slate-600">
                      {p.admission[0]}
                    </span>
                    <span className="mt-3 block font-mono text-[0.56rem] uppercase tracking-[0.15em] text-uniport-deep">
                      Duration · {p.duration.fullTime}
                    </span>
                  </a>
                ))}
                <a
                  href="/programs/short-courses"
                  className="group block rounded-2xl border border-gold/40 bg-[#fffaf0] p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-[1.35rem] font-semibold text-navy">
                      Short course
                    </span>
                    <span className="font-mono text-[0.72rem] text-slate-500">3 months</span>
                  </span>
                  <span className="mt-2.5 block text-[0.85rem] leading-relaxed text-slate-600">
                    No first-degree class requirement. Open to corporate organisations, NGOs and
                    private students — {SHORT_COURSES.length} courses on offer.
                  </span>
                  <span className="mt-3 block font-mono text-[0.56rem] uppercase tracking-[0.15em] text-[#8a6410]">
                    Tuition payable in 3 instalments (private students)
                  </span>
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                <Btn href="/programs" size="sm" variant="outline">
                  Full requirements
                </Btn>
                <Btn href={SITE.handbookUrl} size="sm" variant="outline" arrow={false}>
                  Student handbook
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the application form */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-uniport/45 to-transparent"
        />
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Proceed to admission portal"
              title="Complete your application"
              lead="Five short steps. Nothing is submitted until you reach the review step and confirm."
            />
            <ol className="mt-9 space-y-4">
              {[
                ["Applicant", "Name, email, phone, gender and state."],
                ["Programme", "Choose from PGD, M.Sc., PhD or a short course, then set your mode and credentials."],
                ["Research", "Your proposed plan of research (PhD) and a short statement."],
                ["Payment", "Your bank reference and confirmation that proof of payment will be uploaded."],
                ["Review", "Check everything, then submit and keep your reference."],
              ].map(([t, b], i) => (
                <li
                  key={t}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="flex gap-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-uniport/40 bg-white font-mono text-[0.66rem] font-semibold text-uniport-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[0.98rem] font-semibold text-navy">{t}</span>
                    <span className="mt-1 block text-[0.85rem] leading-relaxed text-slate-600">
                      {b}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-9 rounded-3xl border border-uniport/22 bg-white p-6">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-deep">
                Need help applying?
              </p>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-slate-600">
                The Centre's admissions office is staffed Monday to Friday, 8:00am – 4:00pm.
              </p>
              <div className="mt-4 space-y-1.5 text-[0.86rem]">
                <a href={SITE.phones[2].href} className="ulink block font-semibold text-navy">
                  {SITE.phones[2].value}
                </a>
                <a href={`mailto:${SITE.emails[0]}`} className="ulink block text-slate-600">
                  {SITE.emails[0]}
                </a>
              </div>
              <div className="mt-5">
                <Btn href="/contact" size="sm" variant="outline" arrow={false}>
                  Contact admissions
                </Btn>
              </div>
            </div>
          </div>

          <div data-reveal>
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Applicant FAQ" title="Questions before you pay" />
            <p className="mt-6 text-[0.95rem] leading-[1.85] text-slate-600">
              Fees, instalments, study modes and eligibility — all answered from the Centre's
              published requirements.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn href="/tuition" size="sm">Tuition breakdown</Btn>
              <Btn href="/programs" size="sm" variant="outline" arrow={false}>
                Our programmes
              </Btn>
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
