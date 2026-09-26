import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header, { type SearchEntry } from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import { ReadingProgress } from "@/components/motion";
import { PROGRAMS, SEED_ARTICLES, SHORT_COURSES, TIMELINE } from "@/lib/content";
import { NAV, SITE } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default:
      "CGCDS Uniport — Centre for Gender, Conflict and Development Studies | University of Port Harcourt",
    template: "%s · CGCDS Uniport",
  },
  description:
    "Centre for Gender, Conflict and Development Studies, University of Port Harcourt. Postgraduate programmes (PGD, M.Sc., PhD), eight certificate short courses, evidence-based gender research, teaching and community service.",
  keywords: [
    "CGCDS",
    "Uniport",
    "University of Port Harcourt",
    "Gender Studies",
    "Conflict and Development Studies",
    "PGD Gender",
    "MSc Gender and Development",
    "PhD Gender Studies Nigeria",
    "Short courses peacebuilding",
    "Choba",
  ],
  openGraph: {
    title: "CGCDS Uniport — Centre for Gender, Conflict and Development Studies",
    description:
      "A place of intense energy, creativity & inclusiveness. Postgraduate study, research and community service in gender, conflict and development.",
    url: SITE.domain,
    siteName: SITE.short,
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "CGCDS Uniport",
    description:
      "Centre for Gender, Conflict and Development Studies, University of Port Harcourt.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='23' fill='%23062a44'/%3E%3Cpath d='M31 17.5a7.5 7.5 0 1 0 0 13' fill='none' stroke='%232a9dd6' stroke-width='3.4' stroke-linecap='round'/%3E%3Ccircle cx='20' cy='24' r='3.6' fill='%23ffc94a'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#062a44",
  width: "device-width",
  initialScale: 1,
};

/** Site-wide search index for the ⌘K palette. */
function buildIndex(): SearchEntry[] {
  const index: SearchEntry[] = [];

  for (const item of NAV) {
    index.push({ title: item.label, href: item.href, kind: "Page" });
    for (const child of item.children ?? []) {
      index.push({
        title: child.label,
        href: child.href,
        kind: "Page",
        blurb: child.blurb,
      });
    }
  }

  index.push(
    { title: "Admission Form Payment", href: "/admission", kind: "Apply", blurb: "Pay NGN 25,000 and submit your application" },
    { title: "Tuition & Fees", href: "/tuition", kind: "Fees", blurb: "PGD · M.Sc · PhD fee breakdown and estimator" },
    { title: "Events & Diary", href: "/news#events", kind: "Events", blurb: "Public lectures, conferences and advocacy" },
    { title: "Centre Dashboard", href: "/admin", kind: "Admin", blurb: "Enquiries, applications and subscribers" },
  );

  for (const p of PROGRAMS) {
    index.push({
      title: `${p.code} — ${p.name}`,
      href: `/programs/${p.slug}`,
      kind: "Programme",
      blurb: p.fullName,
    });
  }

  for (const c of SHORT_COURSES) {
    index.push({
      title: c.title,
      href: "/programs/short-courses",
      kind: "Short course",
      blurb: c.blurb,
    });
  }

  for (const a of SEED_ARTICLES) {
    index.push({
      title: a.title,
      href: `/news/${a.slug}`,
      kind: a.category,
      blurb: a.excerpt,
    });
  }

  for (const t of TIMELINE) {
    index.push({
      title: `${t.year} — ${t.title}`,
      href: "/about/history",
      kind: "History",
      blurb: t.tag,
    });
  }

  // de-duplicate by href + title
  const seen = new Set<string>();
  return index.filter((e) => {
    const k = `${e.href}|${e.title}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..700&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-slate-ink antialiased">
        <ScrollReveal />
        <ReadingProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-uniport focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header index={buildIndex()} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
