import { Timeline } from "@/components/motion";
import { Btn, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { HISTORY_PARAGRAPHS, TIMELINE } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our History — from CENTECs to CGCDS",
  description:
    "How the Centre for Gender, Conflict and Development Studies came into being: the 2013 merger, the 2015 Centre for Conflict and Gender Studies, and the March 2021 de-emergence by University authority.",
};

const LINEAGE = [
  { code: "CENTECs", name: "Centres for Ethnic Conflict Studies", head: "Prof. Mark O. Anikpo" },
  { code: "PJCGDWS", name: "Patience Jonathan Centre for Gender and Women Development Studies", head: "Prof. Elizabeth Okeke" },
  { code: "CCGS", name: "Centre for Conflict and Gender Studies (2015)", head: "Prof. Fidelis Allen" },
  { code: "CGCDS", name: "Centre for Gender, Conflict and Development Studies (2021)", head: "Prof. Heoma Nsirim-Worlu — pioneer Director" },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our History"
        title="Thirteen years of merging, de-merging and repositioning"
        lead="This Centre is a creation of the Senate of the University of Port Harcourt. Every reorganisation it has passed through was for one reason — repositioning it to meet the perceived vision of the Unique University in the comity of universities."
        trail={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our History" },
        ]}
        image="https://images.pexels.com/photos/15490405/pexels-photo-15490405.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      />

      {/* lineage */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Institutional lineage"
            title="Four names, one continuous mandate"
            lead="The authority's reason for de-emerging the Centre is that study areas should be able to be visible so as to attract international and national support."
          />

          <ol className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {LINEAGE.map((l, i) => {
              const current = i === LINEAGE.length - 1;
              return (
                <li
                  key={l.code}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                  className={`card-hover relative overflow-hidden rounded-3xl border p-7 ${
                    current
                      ? "border-uniport/45 bg-navy text-white shadow-[var(--shadow-glow)]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {current && (
                    <span
                      aria-hidden="true"
                      className="bg-blueprint-dark absolute inset-0 opacity-50"
                    />
                  )}
                  <span className="relative">
                    <span
                      className={`font-mono text-[0.58rem] uppercase tracking-[0.18em] ${
                        current ? "text-uniport-bright" : "text-uniport-deep"
                      }`}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`mt-3 block font-display text-[1.9rem] leading-none font-semibold ${
                        current ? "text-white" : "text-navy"
                      }`}
                    >
                      {l.code}
                    </span>
                    <span
                      className={`mt-3 block text-[0.85rem] leading-relaxed ${
                        current ? "text-[#bcd8e8]" : "text-slate-600"
                      }`}
                    >
                      {l.name}
                    </span>
                    <span
                      className={`mt-4 block border-t pt-4 text-[0.78rem] ${
                        current ? "border-white/15 text-gold" : "border-slate-100 text-slate-500"
                      }`}
                    >
                      {l.head}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* the record, in full */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>The record</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.06] font-semibold text-navy">
              As published by the Centre
            </h2>
            <div className="relative mt-7 rounded-3xl border border-gold/40 bg-[#fffaf0] p-7">
              <CornerTicks />
              <p className="font-display text-[1.15rem] leading-[1.55] font-medium text-navy italic">
                “The reason giving for the merging and de-merging which this Centre had passed
                through is just for repositioning it to meet the perceived vision of the Unique
                University in the comity of universities.”
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/about/staff" size="sm">Directorate</Btn>
              <Btn href="/about/gallery" size="sm" variant="outline" arrow={false}>
                See the archive
              </Btn>
            </div>
          </div>

          <div className="space-y-7">
            {HISTORY_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}
                className={`text-[1.03rem] leading-[1.95] text-slate-600 ${
                  i === 0
                    ? "first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.82] first-letter:font-semibold first-letter:text-uniport-deep"
                    : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="relative overflow-hidden bg-paper py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Milestones"
            title="The Centre, year by year"
            lead="From the 2013 merger through the 2021 de-emergence to the present directorate and research programme."
            align="center"
          />
          <div className="mt-16">
            <Timeline items={TIMELINE} />
          </div>
        </div>
      </section>
    </>
  );
}
