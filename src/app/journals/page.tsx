import { JournalBrowser, type JournalItem } from "@/components/interactive";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { JOURNAL_SCOPE } from "@/lib/content";
import { getJournals } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journals — Research & Publications",
  description:
    "Journal of Gender, Conflict and Development Studies published by CGCDS Uniport: issues, themes, contents and the call for papers administered by the Centre's Research & Publications unit.",
};

const REVIEW_STAGES = [
  { t: "Submission", b: "Send your manuscript and a 200-word abstract to the Research & Publications unit." },
  { t: "Desk screening", b: "The editorial board checks fit with the Centre's scope and originality of contribution." },
  { t: "Peer review", b: "Two reviewers drawn from the Centre's multidisciplinary team of experts." },
  { t: "Revision & copy-editing", b: "Authors respond to review; the unit handles copy-editing and layout." },
  { t: "Publication", b: "Accepted papers appear in the next issue, with conference and lecture papers grouped thematically." },
];

export default async function JournalsPage() {
  const rows = await getJournals();
  const issues: JournalItem[] = rows.map((j) => ({
    slug: j.slug,
    title: j.title,
    volume: j.volume,
    issue: j.issue,
    year: j.year,
    theme: j.theme,
    editors: j.editors,
    summary: j.summary,
    status: j.status,
    papers: (j.papers as JournalItem["papers"]) ?? [],
  }));

  return (
    <>
      <PageHero
        eyebrow="Journals"
        title="Journal of Gender, Conflict and Development Studies"
        lead="The Centre's research output — conference proceedings, public lecture papers, fieldwork reports and postgraduate seminar work, published by issue and grouped thematically."
        trail={[
          { label: "Home", href: "/" },
          { label: "Journals" },
        ]}
        image="https://images.pexels.com/photos/15448072/pexels-photo-15448072.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Issues catalogued
          </span>
          <p className="mt-2 font-display text-[2.4rem] leading-none font-semibold">
            {issues.length}
          </p>
          <p className="mt-2 text-[0.8rem] text-[#a9cde2]">
            {issues.reduce((n, j) => n + j.papers.length, 0)} papers listed
          </p>
        </div>
      </PageHero>

      {/* archive */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="The archive"
              title="Issues, themes and contents"
              lead="Select an issue to open its contents. Full texts are administered by the Centre's Research & Publications unit."
            />
            <div className="flex flex-wrap gap-2">
              <Chip>Peer reviewed</Chip>
              <Chip tone="gold">Call for papers open</Chip>
            </div>
          </div>

          <div className="mt-12">
            <JournalBrowser issues={issues} />
          </div>
        </div>
      </section>

      {/* scope + review */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Scope"
              title="What the journal publishes"
              lead="The location of gender matters and issues is an index to measure development — the journal's scope follows that premise."
            />
            <ul className="mt-9 space-y-3">
              {JOURNAL_SCOPE.map((s, i) => (
                <li
                  key={s}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 65}ms` }}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-uniport/45"
                >
                  <span className="font-mono text-[0.62rem] text-uniport">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.94rem] leading-snug font-medium text-navy">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Editorial process" title="From submission to publication" />
            <ol className="mt-9 space-y-0">
              {REVIEW_STAGES.map((s, i) => (
                <li
                  key={s.t}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {i < REVIEW_STAGES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-11 left-[1.35rem] h-[calc(100%-2.2rem)] w-px bg-gradient-to-b from-uniport/45 to-uniport/10"
                    />
                  )}
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-uniport/40 bg-white font-mono text-[0.68rem] font-semibold text-uniport-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-2xl border border-slate-200 bg-white p-6">
                    <span className="block text-[1.02rem] font-semibold text-navy">{s.t}</span>
                    <span className="mt-2 block text-[0.88rem] leading-[1.8] text-slate-600">
                      {s.b}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 overflow-hidden rounded-3xl border border-gold/40 bg-[#fffaf0] p-8">
              <CornerTicks />
              <Eyebrow>Submit a paper</Eyebrow>
              <p className="mt-4 text-[0.95rem] leading-[1.85] text-slate-600">
                The Centre welcomes manuscripts from scholars, practitioners and postgraduate
                students working anywhere in the journal's scope. Send your manuscript, a
                200-word abstract and a short author note to{" "}
                <a
                  href={`mailto:${SITE.emails[0]}?subject=Journal%20submission`}
                  className="ulink font-semibold text-uniport-deep"
                >
                  {SITE.emails[0]}
                </a>{" "}
                or request a full text of any paper listed above.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href={`mailto:${SITE.emails[0]}`} size="sm" arrow={false}>
                  Email the unit
                </Btn>
                <Btn href="/about/staff" size="sm" variant="outline" arrow={false}>
                  Editorial board
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* research agenda */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 opacity-45" />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-uniport/20 blur-[130px]"
        />
        <div className="shell relative">
          <SectionHeading
            tone="light"
            eyebrow="Research agenda"
            title="What the Centre is investigating now"
            lead="The core mandate is stemmed on research, thereby providing evidence without creating ambiguity as to what the Centre stands for."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "National campus climate baseline survey",
                b: "A baseline survey on sexual harassment in Nigerian public tertiary institutions, launched at the 2026 International Women's Day public lecture.",
                tag: "Fieldwork · 2026",
              },
              {
                t: "Gender and environmental development",
                b: "Gendered impacts of environmental change on livelihoods, and women's participation in environmental governance and clean-energy transitions.",
                tag: "Conference series",
              },
              {
                t: "Power relations and conflict reduction",
                b: "Evidence-based policy research that reduces the gap caused by conflict in daily interactions and supports gender mainstreaming.",
                tag: "Policy research",
              },
            ].map((r, i) => (
              <article
                key={r.t}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
                className="card-hover group relative overflow-hidden rounded-3xl border border-white/12 bg-white/6 p-7 backdrop-blur-md hover:border-uniport/55"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-14 -right-14 h-36 w-36 rounded-full bg-uniport/20 blur-2xl transition-all duration-600 group-hover:bg-gold/25"
                />
                <span className="relative font-mono text-[0.56rem] uppercase tracking-[0.18em] text-gold">
                  {r.tag}
                </span>
                <h3 className="relative mt-3 text-[1.15rem] leading-snug font-semibold">
                  {r.t}
                </h3>
                <p className="relative mt-3 text-[0.88rem] leading-[1.8] text-[#a9cde2]">
                  {r.b}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/news" variant="light">Research in the news</Btn>
            <Btn href="/contact" variant="light" arrow={false}>
              Propose a collaboration
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
