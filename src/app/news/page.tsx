import { NewsExplorer, type NewsItem } from "@/components/interactive";
import { Btn, Chip, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { getArticles, getCategories, getEvents } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News — Upcoming & Recent Happenings",
  description:
    "News from the Centre for Gender, Conflict and Development Studies, University of Port Harcourt: admission notices, public lectures, international conferences, leadership changes and advocacy commemorations.",
};

export default async function NewsPage() {
  const [articles, categories, events] = await Promise.all([
    getArticles(),
    getCategories(),
    getEvents(),
  ]);

  const items: NewsItem[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    coverUrl: a.coverUrl,
    author: a.author,
    publishedAt: a.publishedAt.toISOString(),
    commentCount: a.commentCount,
    featured: a.featured,
  }));

  const upcoming = events.slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="CGCDS Uniport News"
        title="Upcoming and recent happenings at the Centre"
        lead="Admission notices, public lectures, international conferences, directorate changes and the Centre's advocacy commemorations — filterable by category and searchable by keyword."
        trail={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
        image="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Published stories
          </span>
          <p className="mt-2 font-display text-[2.4rem] leading-none font-semibold">
            {items.length}
          </p>
          <p className="mt-2 text-[0.8rem] text-[#a9cde2]">
            across {categories.length} categories
          </p>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div className="shell">
          <NewsExplorer items={items} />
        </div>
      </section>

      {/* events diary */}
      <section
        id="events"
        className="relative scroll-mt-24 overflow-hidden bg-mist py-20 md:py-24"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Diary"
            title="What the Centre has coming up"
            lead="Recurring observances the Centre marks each year alongside its flagship international conference."
          />

          <ol className="mt-12 grid gap-4 lg:grid-cols-2">
            {upcoming.map((e, i) => {
              const d = new Date(e.startsAt);
              return (
                <li
                  key={e.slug}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
                  className="card-hover group flex gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-7"
                >
                  <div className="shrink-0 rounded-2xl border border-uniport/25 bg-uniport-mist px-4 py-3 text-center">
                    <p className="font-display text-[1.85rem] leading-none font-semibold text-uniport-deep">
                      {d.toLocaleDateString("en-GB", { day: "2-digit" })}
                    </p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-slate-500">
                      {d.toLocaleDateString("en-GB", { month: "short" })} {d.getFullYear()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip>{e.category}</Chip>
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-slate-400">
                        {e.cadence}
                      </span>
                    </div>
                    <h3 className="mt-3 text-[1.12rem] leading-snug font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                      {e.title}
                    </h3>
                    <p className="mt-2.5 text-[0.87rem] leading-[1.8] text-slate-600">
                      {e.description}
                    </p>
                    <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-slate-400">
                      {e.venue}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-uniport/22 bg-white p-8 md:flex-row md:items-center md:p-10">
            <div>
              <Eyebrow>Never miss an admission window</Eyebrow>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-slate-600">
                Admission forms go on sale once a session and the Centre publishes the notice
                here first. Subscribe in the footer, or write to{" "}
                <a
                  href={`mailto:${SITE.emails[0]}`}
                  className="ulink font-semibold text-uniport-deep"
                >
                  {SITE.emails[0]}
                </a>{" "}
                to be added to the mailing list for admission updates.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Btn href="/admission">Apply now</Btn>
              <Btn href="/about/gallery" variant="outline" arrow={false}>
                Event gallery
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
