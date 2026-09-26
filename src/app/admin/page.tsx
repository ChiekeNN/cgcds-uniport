import Link from "next/link";

import { Btn, Chip, Eyebrow } from "@/components/ui";
import {
  getApplications,
  getArticles,
  getInquiries,
  getStaff,
  getSubscriberCount,
} from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Centre Dashboard",
  description:
    "Internal dashboard for the Centre for Gender, Conflict and Development Studies: enquiries, applications and subscribers.",
  robots: { index: false, follow: false },
};

type Search = Promise<{ tab?: string }>;

function when(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage({ searchParams }: { searchParams: Search }) {
  const { tab } = await searchParams;
  const active = tab === "applications" ? "applications" : "enquiries";

  let inquiries: Awaited<ReturnType<typeof getInquiries>> = [];
  let applications: Awaited<ReturnType<typeof getApplications>> = [];
  let subscribers = 0;
  let articles = 0;
  let staffCount = 0;
  let failed = false;

  try {
    const [i, a, s, art, st] = await Promise.all([
      getInquiries(),
      getApplications(),
      getSubscriberCount(),
      getArticles(),
      getStaff(),
    ]);
    inquiries = i;
    applications = a;
    subscribers = s;
    articles = art.length;
    staffCount = st.length;
  } catch {
    failed = true;
  }

  const cards = [
    { label: "Enquiries received", value: inquiries.length, tone: "blue" as const },
    { label: "Applications submitted", value: applications.length, tone: "gold" as const },
    { label: "Newsletter subscribers", value: subscribers, tone: "blue" as const },
    { label: "Published stories", value: articles, tone: "blue" as const },
    { label: "Staff profiles", value: staffCount, tone: "blue" as const },
  ];

  return (
    <>
      <header className="grain relative isolate overflow-hidden bg-abyss pt-32 pb-14 text-white md:pt-36">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 -z-10 opacity-50" />
        <div
          aria-hidden="true"
          className="absolute -top-28 right-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-uniport/20 blur-[130px]"
        />
        <div className="shell relative">
          <Eyebrow tone="light">Internal · not indexed</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] font-semibold">
            Centre dashboard
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-[#a9cde2]">
            Every enquiry submitted through the contact form and every application submitted
            through the admission portal is written to the Centre's PostgreSQL database. This
            view is the directorate's live record.
          </p>

          <div className="mt-9 flex flex-wrap gap-2">
            {(
              [
                ["enquiries", `Enquiries · ${inquiries.length}`],
                ["applications", `Applications · ${applications.length}`],
              ] as const
            ).map(([key, label]) => (
              <Link
                key={key}
                href={`/admin${key === "enquiries" ? "" : "?tab=applications"}`}
                className={`rounded-full border px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] transition-all duration-300 ${
                  active === key
                    ? "border-uniport bg-uniport text-white"
                    : "border-white/20 text-[#9dc6dc] hover:border-uniport-bright hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-mist py-14 md:py-16">
        <div className="shell">
          {failed && (
            <div className="mb-8 rounded-3xl border border-coral/35 bg-[#fff2ee] p-6">
              <p className="font-semibold text-[#a63a1c]">Database unavailable</p>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-[#a63a1c]/80">
                The Centre's database could not be reached, so live records are not shown. The
                public site continues to render from its built-in content fallback.
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map((c, i) => (
              <div
                key={c.label}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 65}ms` }}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-slate-400">
                  {c.label}
                </p>
                <p
                  className={`mt-3 font-display text-[2.6rem] leading-none font-semibold ${
                    c.tone === "gold" ? "text-[#a97c0d]" : "text-uniport-deep"
                  }`}
                >
                  {String(c.value).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          {active === "enquiries" ? (
            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-7 py-5">
                <div>
                  <h2 className="text-[1.25rem] font-semibold text-navy">Enquiry log</h2>
                  <p className="mt-1 text-[0.82rem] text-slate-500">
                    Newest first · submitted through /contact
                  </p>
                </div>
                <Chip>{inquiries.length} records</Chip>
              </div>

              {inquiries.length === 0 ? (
                <Empty
                  title="No enquiries yet"
                  body="Messages sent through the contact form will appear here with name, email, subject and full text."
                  href="/contact"
                  cta="Test the contact form"
                />
              ) : (
                <ul className="divide-y divide-slate-100">
                  {inquiries.map((q) => (
                    <li key={q.id} className="grid gap-4 px-7 py-6 lg:grid-cols-[16rem_minmax(0,1fr)_auto] lg:items-start">
                      <div>
                        <p className="text-[0.98rem] font-semibold text-navy">{q.name}</p>
                        <a href={`mailto:${q.email}`} className="ulink mt-1 block text-[0.8rem] text-uniport-deep">
                          {q.email}
                        </a>
                        {q.phone && (
                          <p className="mt-0.5 text-[0.8rem] text-slate-500">{q.phone}</p>
                        )}
                        {q.webUrl && (
                          <p className="mt-0.5 truncate text-[0.76rem] text-slate-400">{q.webUrl}</p>
                        )}
                      </div>
                      <div>
                        {q.subject && (
                          <p className="mb-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-uniport-deep">
                            {q.subject}
                          </p>
                        )}
                        <p className="text-[0.9rem] leading-[1.8] whitespace-pre-line text-slate-600">
                          {q.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                        <span className="rounded-full bg-uniport-mist px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-uniport-deep">
                          {q.status}
                        </span>
                        <span className="font-mono text-[0.62rem] text-slate-400">
                          {when(q.createdAt)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-7 py-5">
                <div>
                  <h2 className="text-[1.25rem] font-semibold text-navy">Application register</h2>
                  <p className="mt-1 text-[0.82rem] text-slate-500">
                    Newest first · submitted through /admission
                  </p>
                </div>
                <Chip tone="gold">{applications.length} records</Chip>
              </div>

              {applications.length === 0 ? (
                <Empty
                  title="No applications yet"
                  body="Completed five-step applications will appear here with reference number, programme, credentials and payment reference."
                  href="/admission"
                  cta="Test the application form"
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[54rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-100 bg-mist">
                        {["Reference", "Applicant", "Programme", "Mode", "Payment ref.", "Status", "Received"].map(
                          (h) => (
                            <th
                              key={h}
                              scope="col"
                              className="px-5 py-3.5 font-mono text-[0.55rem] uppercase tracking-[0.15em] text-slate-400"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((a) => (
                        <tr key={a.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-uniport-mist/45">
                          <td className="px-5 py-4 font-mono text-[0.74rem] font-semibold whitespace-nowrap text-navy">
                            {a.reference}
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-[0.9rem] font-semibold text-navy">{a.fullName}</p>
                            <p className="mt-0.5 text-[0.76rem] text-slate-500">{a.email}</p>
                            <p className="text-[0.76rem] text-slate-400">
                              {a.phone} · {a.stateOfOrigin}
                            </p>
                          </td>
                          <td className="max-w-[18rem] px-5 py-4">
                            <p className="text-[0.85rem] leading-snug text-slate-600">{a.program}</p>
                            <p className="mt-1 text-[0.75rem] text-slate-400">
                              {a.qualification} — {a.institution} {a.grade && `(${a.grade})`}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-[0.82rem] whitespace-nowrap text-slate-600">
                            {a.studyMode}
                          </td>
                          <td className="px-5 py-4 font-mono text-[0.76rem] whitespace-nowrap text-slate-600">
                            {a.paymentReference}
                            <span className="mt-1 block text-[0.68rem] text-[#146c49]">
                              proof {a.proofOfPayment ? "confirmed" : "pending"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded-full bg-uniport-mist px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-uniport-deep">
                              {a.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-[0.66rem] whitespace-nowrap text-slate-400">
                            {when(a.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:flex-row md:items-center">
            <div>
              <Eyebrow>Verification note</Eyebrow>
              <p className="mt-4 max-w-2xl text-[0.92rem] leading-[1.85] text-slate-600">
                Applications are processed only after the Centre verifies the payment reference
                against account {SITE.bank.accountNumber} at {SITE.bank.name}. Proof of payment
                is uploaded by the applicant on the admission portal before submission.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Btn href="/admission" size="sm">Admission portal</Btn>
              <Btn href="/" size="sm" variant="outline" arrow={false}>
                Back to site
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Empty({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="px-7 py-16 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-dashed border-uniport/45 text-uniport">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 6.5h16v11H4z" /><path d="m4 7 8 5.5L20 7" strokeLinecap="round" />
        </svg>
      </span>
      <p className="mt-5 text-[1.1rem] font-semibold text-navy">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-[0.88rem] leading-relaxed text-slate-500">
        {body}
      </p>
      <div className="mt-6 flex justify-center">
        <Btn href={href} size="sm" arrow={false}>
          {cta}
        </Btn>
      </div>
    </div>
  );
}
