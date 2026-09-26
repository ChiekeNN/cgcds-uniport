import { StaffDirectory, type StaffItem } from "@/components/interactive";
import { Btn, Chip, CornerTicks, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { DIRECTORATE_OFFICES, HEADLINE_STATS } from "@/lib/content";
import { getStaff } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Staff — Directorate & Faculty",
  description:
    "The directorate, past directors and offices of the Centre for Gender, Conflict and Development Studies, University of Port Harcourt.",
};

export default async function StaffPage() {
  const rows = await getStaff();
  const people: StaffItem[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    title: r.title,
    group: r.group,
    email: r.email,
    phone: r.phone,
    bio: r.bio,
    expertise: (r.expertise as string[]) ?? [],
    tenure: r.tenure,
  }));

  return (
    <>
      <PageHero
        eyebrow="Our Staff"
        title="A multidisciplinary team of experts"
        lead="Fifteen full-time faculty and instructors sustaining a 6:1 student-to-faculty ratio, led by the Office of the Director and supported by the Centre's directorate."
        trail={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Staff" },
        ]}
        image="https://images.pexels.com/photos/3321802/pexels-photo-3321802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Office of the Director
          </span>
          <p className="mt-2 font-display text-[1.25rem] leading-tight font-semibold">
            {SITE.director}
          </p>
          <div className="mt-4 space-y-1 text-[0.8rem] text-[#a9cde2]">
            <a href={`mailto:${SITE.emails[1]}`} className="ulink block hover:text-white">
              {SITE.emails[1]}
            </a>
            <a href={SITE.phones[0].href} className="ulink block hover:text-white">
              {SITE.phones[0].value}
            </a>
          </div>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-paper py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Staff directory"
            title="Leadership, past directors and legacy heads"
            lead="Filter by group or search by name, role and area of expertise. Select a profile to read the full entry."
          />
          <div className="mt-12">
            <StaffDirectory people={people} />
          </div>
        </div>
      </section>

      {/* directorate offices */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Directorate & faculties"
            title="The offices that carry the mandate"
            lead="Each office owns a slice of the Centre's core mandate of research, teaching and community service."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {DIRECTORATE_OFFICES.map((o, i) => (
              <article
                key={o.office}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 4) * 75}ms` }}
                className="card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-uniport-bright to-uniport-deep transition-transform duration-600 group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport">
                  Office {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.02rem] leading-snug font-semibold text-navy">
                  {o.office}
                </h3>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-slate-500">{o.remit}</p>
              </article>
            ))}
          </div>

          <div
            data-reveal
            className="relative mt-10 grid gap-6 rounded-3xl border border-uniport/22 bg-white p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center md:p-10"
          >
            <div>
              <CornerTicks />
              <Eyebrow>Note on the directory</Eyebrow>
              <p className="mt-4 max-w-3xl text-[0.95rem] leading-[1.85] text-slate-600">
                Individual faculty profiles beyond the directorate are maintained in the
                Centre's printed Staff Directory and the Student Brochure / Handbook. For the
                current list of the fifteen full-time faculty and instructors — or to reach a
                specific professor — write to{" "}
                <a href={`mailto:${SITE.emails[0]}`} className="ulink font-semibold text-uniport-deep">
                  {SITE.emails[0]}
                </a>{" "}
                or call {SITE.phones[0].value}. The Centre routes every enquiry to the right
                office.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 lg:flex-col lg:items-end">
              {HEADLINE_STATS.filter((s) => ["15", "6:1"].includes(s.value)).map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-mist px-6 py-4 text-center lg:w-56"
                >
                  <p className="font-display text-[2rem] leading-none font-semibold text-uniport-deep">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[0.76rem] leading-snug text-slate-500">{s.label}</p>
                </div>
              ))}
              <Btn href={SITE.handbookUrl} size="sm" variant="outline" arrow={false}>
                Student handbook
              </Btn>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Research & Publications", "Training & Community Service", "Postgraduate Coordination", "Admissions"].map(
              (t) => (
                <Chip key={t}>{t}</Chip>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
