import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ArticleBlock } from "@/db/schema";
import { Btn, Chip, Eyebrow, SectionHeading } from "@/components/ui";
import { getArticleBySlug, getArticles } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt.toISOString(),
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
    },
  };
}

function Blocks({ body }: { body: ArticleBlock[] }) {
  return (
    <div className="space-y-7">
      {body.map((b, i) => {
        switch (b.type) {
          case "h":
            return (
              <h2
                key={i}
                data-reveal
                className="pt-3 text-[clamp(1.35rem,2.6vw,1.85rem)] leading-tight font-semibold text-navy"
              >
                {b.text}
              </h2>
            );
          case "quote":
            return (
              <figure
                key={i}
                data-reveal="scale"
                className="relative my-10 overflow-hidden rounded-3xl border border-gold/40 bg-[#fffaf0] px-8 py-10 md:px-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-8 -left-4 font-display text-[9rem] leading-none font-semibold text-gold/18"
                >
                  “
                </span>
                <blockquote className="relative font-display text-[clamp(1.25rem,2.8vw,1.8rem)] leading-[1.4] font-medium text-navy italic">
                  {b.text}
                </blockquote>
                {b.cite && (
                  <figcaption className="relative mt-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                    — {b.cite}
                  </figcaption>
                )}
              </figure>
            );
          case "list":
            return (
              <ul key={i} className="space-y-3.5">
                {b.items.map((it) => (
                  <li
                    key={it}
                    data-reveal
                    className="flex items-start gap-4 text-[1.01rem] leading-[1.85] text-slate-600"
                  >
                    <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-uniport" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={i}
                data-reveal
                className="rounded-3xl border border-uniport/28 bg-uniport-mist p-7 md:p-8"
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-uniport-deep">
                  {b.title}
                </p>
                <p className="mt-3 text-[0.98rem] leading-[1.85] text-navy">{b.text}</p>
              </aside>
            );
          default:
            return (
              <p
                key={i}
                data-reveal
                className="text-[1.06rem] leading-[1.95] text-slate-600"
              >
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = await getArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  const related = all.filter((_, i) => i !== idx).slice(0, 3);
  const date = new Date(article.publishedAt);

  return (
    <>
      {/* masthead */}
      <header className="grain relative isolate overflow-hidden bg-abyss pt-32 pb-0 text-white md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {article.coverUrl && (
            <img
              src={article.coverUrl}
              alt=""
              className="anim-kenburns h-full w-full object-cover object-[50%_10%] opacity-30"
              loading="eager"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/88 to-abyss" />
        </div>
        <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 -z-10 opacity-40" />

        <div className="shell relative">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-[#8fb6cc]"
          >
            <Link href="/" className="ulink hover:text-uniport-bright">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/news" className="ulink hover:text-uniport-bright">News</Link>
            <span aria-hidden="true">/</span>
            <span className="text-uniport-bright">{article.category}</span>
          </nav>

          <div className="mt-8 max-w-4xl pb-16 md:pb-20">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-uniport px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white">
                {article.category}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#8fb6cc]">
                {date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#8fb6cc]">
                · {article.author}
              </span>
            </div>
            <h1
              data-reveal="mask"
              className="mt-6 text-[clamp(2rem,5.4vw,3.9rem)] leading-[1.02] font-semibold"
            >
              {article.title}
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
              className="mt-6 max-w-3xl text-[1.1rem] leading-[1.8] text-[#bcd8e8]"
            >
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* cover bleed */}
        {article.coverUrl && (
          <div className="shell relative">
            <div
              data-reveal="scale"
              className="relative -mb-16 overflow-hidden rounded-t-[2rem] border-x border-t border-white/10 md:-mb-20"
            >
              <img
                src={article.coverUrl}
                alt={article.title}
                className="h-[18rem] w-full object-cover object-[50%_8%] md:h-[26rem]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        )}
      </header>

      {/* body */}
      <article className="bg-paper pb-20 pt-28 md:pt-36">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-3xl">
            <Blocks body={article.body as ArticleBlock[]} />

            <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 pt-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-navy to-uniport-deep font-display text-[1rem] font-semibold text-white">
                  CG
                </span>
                <span>
                  <span className="block text-[0.95rem] font-semibold text-navy">
                    {article.author}
                  </span>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.15em] text-slate-400">
                    {SITE.short}
                  </span>
                </span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-slate-400">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v6a2.5 2.5 0 0 1-2.5 2.5H8l-4 3.5v-3.5H5.5A2.5 2.5 0 0 1 3 11.5v-6Z" strokeLinejoin="round" />
                </svg>
                {article.commentCount}{" "}
                {article.commentCount === 1 ? "comment" : "comments"}
              </span>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-mist p-7">
              <Eyebrow>Discuss this story</Eyebrow>
              <p className="mt-3.5 text-[0.92rem] leading-relaxed text-slate-600">
                Comments on Centre news are moderated by the directorate. Send your response,
                correction or question to{" "}
                <a
                  href={`mailto:${SITE.emails[0]}?subject=${encodeURIComponent(`Re: ${article.title}`)}`}
                  className="ulink font-semibold text-uniport-deep"
                >
                  {SITE.emails[0]}
                </a>{" "}
                quoting the story title, or use the contact form.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Btn href="/contact" size="sm">Send a response</Btn>
                <Btn href="/news" size="sm" variant="outline" arrow={false}>
                  Back to news
                </Btn>
              </div>
            </div>
          </div>

          {/* rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-uniport-deep">
                Share
              </p>
              <div className="mt-4 grid gap-2">
                {[
                  {
                    label: "Copy link",
                    href: `https://cgcds.com.ng/news/${article.slug}/`,
                  },
                  {
                    label: "Share on X",
                    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://cgcds.com.ng/news/${article.slug}/`)}`,
                  },
                  {
                    label: "Share on Facebook",
                    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://cgcds.com.ng/news/${article.slug}/`)}`,
                  },
                  {
                    label: "Share on LinkedIn",
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://cgcds.com.ng/news/${article.slug}/`)}`,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-[0.83rem] font-medium text-slate-600 transition-all duration-300 hover:border-uniport hover:bg-uniport-mist hover:text-uniport-deep"
                  >
                    {s.label}
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M6 14 14 6M14 6H8m6 0v6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-uniport/25 bg-navy p-6 text-white">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
                Admission is ongoing
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[#c2dcea]">
                2025/2026 postgraduate admission forms are on sale for the PGD, M.Sc. and PhD
                programmes.
              </p>
              <Link
                href="/admission"
                className="mt-5 block rounded-full bg-uniport py-2.5 text-center text-[0.84rem] font-semibold text-white transition-colors hover:bg-uniport-bright"
              >
                Apply now
              </Link>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-mist p-6">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-slate-400">
                Tags
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                <Chip>{article.category}</Chip>
                <Chip>Gender</Chip>
                <Chip>Conflict</Chip>
                <Chip>Development</Chip>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* related */}
      <section className="relative overflow-hidden bg-mist py-20 md:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Keep reading" title="More from the Centre" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
                className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-navy">
                  {r.coverUrl && (
                    <img
                      src={r.coverUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[50%_14%] transition-transform duration-[900ms] group-hover:scale-108"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-white/92 px-3 py-1 font-mono text-[0.54rem] uppercase tracking-[0.15em] text-uniport-deep backdrop-blur">
                    {r.category}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-slate-400">
                    {new Date(r.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="mt-3 line-clamp-3 flex-1 text-[1.05rem] leading-snug font-semibold text-navy transition-colors duration-300 group-hover:text-uniport-deep">
                    {r.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
