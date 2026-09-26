import { ContactForm } from "@/components/forms";
import { Btn, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us — Get in Touch with the Centre",
  description:
    "Contact the Centre for Gender, Conflict and Development Studies, University of Port Harcourt. Beside the Faculty of Law, Abuja Campus, Choba. Phone, email, staffed hours and enquiry form.",
};

const DEPARTMENTS = [
  {
    office: "Admissions & Application Portal",
    detail: "Admission forms, proof of payment, eligibility and programme choice.",
    contact: SITE.phones[2].value,
    href: SITE.phones[2].href,
  },
  {
    office: "Office of the Director",
    detail: "Partnerships, conference invitations, research collaboration and official correspondence.",
    contact: SITE.emails[1],
    href: `mailto:${SITE.emails[1]}`,
  },
  {
    office: "Training & Community Service",
    detail: "Short-course cohort bookings, in-house delivery for corporate organisations and NGOs.",
    contact: SITE.emails[0],
    href: `mailto:${SITE.emails[0]}?subject=Short%20course%20cohort%20booking`,
  },
  {
    office: "Research & Publications",
    detail: "Journal submissions, requests for full texts, and the campus climate survey.",
    contact: SITE.emails[0],
    href: `mailto:${SITE.emails[0]}?subject=Journal%20submission`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with the Centre"
        lead="If you have any questions regarding our programs, admission, tuition, professors or quality of staff — or have requests or suggestions to make — feel free to give us a call or fill out the form below."
        trail={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        image="https://images.pexels.com/photos/38111334/pexels-photo-38111334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Staffed hours
          </span>
          {SITE.hours.map((h) => (
            <p key={h.day} className="mt-2.5 flex justify-between gap-4 text-[0.84rem]">
              <span className="text-[#a9cde2]">{h.day}</span>
              <span className="font-medium text-white">{h.time}</span>
            </p>
          ))}
        </div>
      </PageHero>

      {/* contact rails */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-3">
            <div
              data-reveal
              className="card-hover relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-uniport/10 blur-2xl"
              />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-navy to-uniport-deep text-white">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M10 10.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
                  <path d="M10 18s6.2-5.1 6.2-9.4A6.2 6.2 0 0 0 3.8 8.6C3.8 12.9 10 18 10 18Z" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="relative mt-5 text-[1.15rem] font-semibold text-navy">
                Our location
              </h3>
              <address className="relative mt-3 text-[0.92rem] leading-[1.85] text-slate-600 not-italic">
                Centre for Gender, Conflict and Development Studies — CGCDS Uniport Building
                <br />
                Beside Faculty of Law,
                <br />
                Abuja Campus,
                <br />
                University of Port Harcourt, Choba.
                <br />
                Along East West Road
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="ulink relative mt-5 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-uniport-deep"
              >
                Open in Google Maps
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 14 14 6M14 6H8m6 0v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "90ms" }}
              className="card-hover relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/12 blur-2xl"
              />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-uniport to-uniport-bright text-white">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M4 3.5h3l1.5 4-2 1.4a10 10 0 0 0 4.6 4.6l1.4-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C8.4 17 3 11.6 2.5 5.1A1.5 1.5 0 0 1 4 3.5Z" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="relative mt-5 text-[1.15rem] font-semibold text-navy">
                Contact us
              </h3>
              <dl className="relative mt-4 space-y-4">
                {SITE.phones.map((p) => (
                  <div key={p.label}>
                    <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate-400">
                      {p.label} phone
                    </dt>
                    <dd>
                      <a
                        href={p.href}
                        className="ulink text-[0.98rem] font-semibold text-navy hover:text-uniport-deep"
                      >
                        {p.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-4">
                  <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate-400">
                    Email
                  </dt>
                  {SITE.emails.map((e) => (
                    <dd key={e}>
                      <a
                        href={`mailto:${e}`}
                        className="ulink block text-[0.92rem] text-slate-600 hover:text-uniport-deep"
                      >
                        {e}
                      </a>
                    </dd>
                  ))}
                </div>
              </dl>
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
              className="card-hover relative overflow-hidden rounded-3xl border border-uniport/25 bg-navy p-8 text-white"
            >
              <span aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-50" />
              <span
                aria-hidden="true"
                className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-uniport/30 blur-[70px]"
              />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/10 text-uniport-bright">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="10" cy="10" r="7.5" /><path d="M10 6v4.2l2.8 1.7" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="relative mt-5 text-[1.15rem] font-semibold">Staffed hours</h3>
              <dl className="relative mt-4 space-y-3">
                {SITE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0">
                    <dt className="text-[0.88rem] text-[#a9cde2]">{h.day}</dt>
                    <dd className="text-[0.9rem] font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="relative mt-5 text-[0.84rem] leading-relaxed text-[#a9cde2]">
                Director: <span className="font-semibold text-white">{SITE.director}</span>
              </p>
              <div className="relative mt-6">
                <Btn href="/admission" size="sm" variant="light" arrow={false}>
                  Apply now
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* the form */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell the Centre what you need"
              lead="Every enquiry is logged and routed to the right office. Required fields are marked with an asterisk."
            />

            <div className="mt-8 space-y-3">
              {DEPARTMENTS.map((d, i) => (
                <a
                  key={d.office}
                  href={d.href}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-uniport/50"
                >
                  <span className="block text-[0.95rem] font-semibold text-navy group-hover:text-uniport-deep">
                    {d.office}
                  </span>
                  <span className="mt-1.5 block text-[0.83rem] leading-relaxed text-slate-500">
                    {d.detail}
                  </span>
                  <span className="mt-2.5 block font-mono text-[0.68rem] text-uniport-deep">
                    {d.contact}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div data-reveal className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[var(--shadow-lift)] md:p-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <Eyebrow>Enquiry form</Eyebrow>
                <h3 className="mt-3 text-[1.4rem] font-semibold text-navy">
                  Ready to get started on your goals?
                </h3>
              </div>
              <Btn href="/admission" size="sm" arrow={false}>
                Apply now
              </Btn>
            </div>
            <ContactForm />
            <div className="relative mt-8 rounded-2xl bg-mist p-5">
              <CornerTicks />
              <p className="text-[0.8rem] leading-relaxed text-slate-500">
                By sending this form your message is stored in the Centre's enquiry log so the
                right office can respond. Nothing is shared with third parties. If your matter
                is urgent, call {SITE.phones[0].value} during staffed hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
