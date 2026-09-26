import { TuitionCalculator } from "@/components/interactive";
import { Accordion } from "@/components/motion";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { FAQS, PROGRAMS, TUITION_LEAD, TUITION_NOTES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tuition — Fees for PGD, M.Sc. & PhD",
  description:
    "Tuition fees breakdown for PGD, M.Sc. and PhD at CGCDS Uniport: admission form NGN 25,000, acceptance fee NGN 50,000, and school fees per session of NGN 350,000 / 400,000 / 500,000.",
};

const naira = (n: number) => `NGN ${n.toLocaleString("en-NG")}`;

const PAYMENT_STEPS = [
  {
    n: "01",
    t: "Pay the admission form fee",
    b: "Intending students are required to pay a non-refundable admission form fee of NGN 25,000 before proceeding to apply into our programmes.",
  },
  {
    n: "02",
    t: "Pay to the Centre's bank account",
    b: `Online payments are currently disabled. Pay ${naira(SITE.bank.amount)} to ${SITE.bank.accountNumber} — ${SITE.bank.name}, account name “${SITE.bank.accountName}”.`,
  },
  {
    n: "03",
    t: "Upload proof of payment",
    b: "You will be required to upload proof of payment (scan-copy / screenshot-copy) on the application portal before submitting your application.",
  },
  {
    n: "04",
    t: "Pay acceptance and session fees",
    b: "On admission, pay the acceptance fee of NGN 50,000 and the school fees for the session. Instalment payment is allowed (terms & conditions apply).",
  },
];

export default function TuitionPage() {
  return (
    <>
      <PageHero
        eyebrow="Tuition"
        title={TUITION_LEAD}
        lead="Tuition fees breakdown for PGD, M.Sc. and PhD — every figure published by the Centre, with an estimator so you can plan before you pay."
        trail={[
          { label: "Home", href: "/" },
          { label: "Tuition" },
        ]}
        image="https://images.pexels.com/photos/6496555/pexels-photo-6496555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Admission form
          </span>
          <p className="mt-2 font-display text-[2.2rem] leading-none font-semibold">
            {naira(SITE.bank.amount)}
          </p>
          <p className="mt-2.5 text-[0.78rem] text-[#a9cde2]">Non-refundable · pay first</p>
        </div>
      </PageHero>

      {/* the table + estimator */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Our tuition fees"
              title="For PGD, M.Sc. and PhD"
              lead="Fees are shown in three parts so you know exactly what is payable at each stage of admission."
            />

            <div
              data-reveal="scale"
              className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-lift)]"
            >
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Tuition fees for the PGD, M.Sc. and PhD programmes
                </caption>
                <thead>
                  <tr className="bg-navy text-white">
                    <th scope="col" className="px-6 py-5 font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                      Program
                    </th>
                    <th scope="col" className="px-4 py-5 font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                      Admission form
                    </th>
                    <th scope="col" className="px-4 py-5 font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                      Acceptance fee
                    </th>
                    <th scope="col" className="px-6 py-5 text-right font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                      School fees / session
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PROGRAMS.map((p) => {
                    const first = p.fee.form + p.fee.acceptance + p.fee.session;
                    return (
                      <tr
                        key={p.slug}
                        className="group border-b border-slate-100 transition-colors duration-300 last:border-0 hover:bg-uniport-mist/60"
                      >
                        <th scope="row" className="px-6 py-6">
                          <a
                            href={`/programs/${p.slug}`}
                            className="block text-[1.15rem] font-semibold text-navy transition-colors group-hover:text-uniport-deep"
                          >
                            {p.code}
                          </a>
                          <span className="mt-1 block text-[0.76rem] text-slate-500">
                            {p.name}
                          </span>
                          <span className="mt-2 inline-block rounded-full bg-mist px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-slate-500">
                            First year total {naira(first)}
                          </span>
                        </th>
                        <td className="px-4 py-6 font-mono text-[0.92rem] text-slate-600">
                          {naira(p.fee.form)}
                        </td>
                        <td className="px-4 py-6 font-mono text-[0.92rem] text-slate-600">
                          {naira(p.fee.acceptance)}
                        </td>
                        <td className="px-6 py-6 text-right font-display text-[1.4rem] font-semibold text-navy">
                          {naira(p.fee.session)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="mt-8 space-y-3.5">
              {TUITION_NOTES.map((n, i) => (
                <li
                  key={n}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="flex items-start gap-3.5 text-[0.93rem] leading-relaxed text-slate-600"
                >
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-uniport/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-uniport" />
                  </span>
                  {n}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>Instalment allowed (t&amp;c)</Chip>
              <Chip tone="gold">Short courses · 3 instalments</Chip>
              <Chip>Online payment disabled</Chip>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-navy text-white shadow-[var(--shadow-lift)]">
              <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-50" />
              <div className="relative">
                <TuitionCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* payment route */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Payment notice"
            title="How to pay, in four steps"
            lead="Online payments are currently disabled. Every payment goes through the Centre's designated bank account and is verified before an application is processed."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PAYMENT_STEPS.map((s, i) => (
              <article
                key={s.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
                className="card-hover group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-uniport/10 blur-2xl transition-all duration-600 group-hover:bg-uniport/28"
                />
                <span className="relative font-display text-[2.4rem] leading-none font-semibold text-uniport/22">
                  {s.n}
                </span>
                <h3 className="relative mt-3 text-[1.06rem] leading-snug font-semibold text-navy">
                  {s.t}
                </h3>
                <p className="relative mt-3 text-[0.86rem] leading-[1.8] text-slate-600">
                  {s.b}
                </p>
              </article>
            ))}
          </div>

          <div
            data-reveal
            className="relative mt-8 grid gap-8 rounded-[2rem] border border-uniport/25 bg-white p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center md:p-11"
          >
            <div>
              <CornerTicks />
              <Eyebrow>Bank details</Eyebrow>
              <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-slate-400">
                    Bank
                  </dt>
                  <dd className="mt-2 text-[1.02rem] font-semibold text-navy">
                    {SITE.bank.name}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-slate-400">
                    Account number
                  </dt>
                  <dd className="mt-2 font-mono text-[1.5rem] font-semibold tracking-tight text-uniport-deep">
                    {SITE.bank.accountNumber}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-slate-400">
                    Account name
                  </dt>
                  <dd className="mt-2 text-[0.92rem] leading-snug font-medium text-navy">
                    {SITE.bank.accountName}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 max-w-3xl text-[0.86rem] leading-relaxed text-slate-500">
                {SITE.bank.note}: {naira(SITE.bank.amount)}. Always quote your full name and
                intended programme when making the transfer, and keep the receipt — you will
                upload a scan-copy or screenshot-copy on the application portal.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Btn href="/admission">Proceed to admission portal</Btn>
              <Btn href="/contact" variant="outline" arrow={false}>
                Payment enquiries
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Fee questions" title="What applicants ask about money" />
            <p className="mt-6 text-[0.95rem] leading-[1.85] text-slate-600">
              Our tuition fee is affordable, and our standard is world class. If your question
              is not answered here, the Centre's admissions office responds Monday to Friday,
              8:00am – 4:00pm.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn href="/contact" size="sm">Contact us</Btn>
              <Btn href={SITE.handbookUrl} size="sm" variant="outline" arrow={false}>
                Student handbook
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
