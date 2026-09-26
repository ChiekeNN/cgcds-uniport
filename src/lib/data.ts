import { and, desc, eq, isNull, or, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  applications,
  articles,
  events,
  galleryItems,
  inquiries,
  journals,
  staff,
  subscribers,
} from "@/db/schema";
import {
  DIRECTOR_COVER,
  DIRECTOR_PORTRAIT,
  GALLERY,
  SEED_ARTICLES,
  SEED_EVENTS,
  SEED_JOURNALS,
  STAFF,
} from "@/lib/content";

/* ────────────────────────────────────────────────────────────────
   Idempotent bootstrap: create tables then seed when empty.
   Everything degrades gracefully to in-memory content if the
   database is unreachable, so the site never renders blank.
   ──────────────────────────────────────────────────────────────── */

const DDL = `
CREATE TABLE IF NOT EXISTS articles (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body jsonb NOT NULL,
  category text NOT NULL DEFAULT 'News',
  cover_url text,
  author text NOT NULL DEFAULT 'CGCDS Uniport',
  published_at timestamptz NOT NULL DEFAULT now(),
  featured boolean NOT NULL DEFAULT false,
  comment_count integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS staff (
  id serial PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  title text NOT NULL DEFAULT '',
  "group" text NOT NULL DEFAULT 'Leadership',
  email text,
  phone text,
  bio text NOT NULL DEFAULT '',
  expertise jsonb NOT NULL,
  tenure text,
  photo_url text,
  sort_order integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS inquiries (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  web_url text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS applications (
  id serial PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  gender text NOT NULL DEFAULT '',
  state_of_origin text NOT NULL DEFAULT '',
  program text NOT NULL,
  study_mode text NOT NULL DEFAULT 'Full-time',
  qualification text NOT NULL DEFAULT '',
  institution text NOT NULL DEFAULT '',
  grade text NOT NULL DEFAULT '',
  research_plan text NOT NULL DEFAULT '',
  statement text NOT NULL DEFAULT '',
  payment_reference text NOT NULL DEFAULT '',
  proof_of_payment boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS journals (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  volume text NOT NULL DEFAULT '',
  issue text NOT NULL DEFAULT '',
  year integer NOT NULL DEFAULT 2026,
  theme text NOT NULL DEFAULT '',
  editors text NOT NULL DEFAULT '',
  issn text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  papers jsonb NOT NULL,
  status text NOT NULL DEFAULT 'published',
  published_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS gallery_items (
  id serial PRIMARY KEY,
  album text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  credit text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS events (
  id serial PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  starts_at timestamptz NOT NULL,
  venue text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Event',
  description text NOT NULL DEFAULT '',
  cover_url text,
  cadence text NOT NULL DEFAULT 'One-off'
);
CREATE TABLE IF NOT EXISTS subscribers (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  interest text NOT NULL DEFAULT 'Admission updates',
  created_at timestamptz NOT NULL DEFAULT now()
);
`;

let readyPromise: Promise<boolean> | null = null;

/** Stock photography that was previously used as a stand-in for the Director.
 *  Her own portrait must replace it wherever it still lingers in a database. */
const LEGACY_DIRECTOR_COVER =
  "https://images.pexels.com/photos/5905898/pexels-photo-5905898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400";

/** Repairs the Director's imagery in databases seeded before her official
 *  photographs were added. Runs only on empty/placeholder values, so a picture
 *  the directorate sets by hand is never overwritten. */
async function alignDirectorImagery(): Promise<void> {
  await db
    .update(articles)
    .set({ coverUrl: DIRECTOR_COVER })
    .where(
      and(
        eq(articles.slug, "prof-owapriba-p-abu-becomes-director"),
        or(isNull(articles.coverUrl), eq(articles.coverUrl, LEGACY_DIRECTOR_COVER)),
      ),
    );

  await db
    .update(staff)
    .set({ photoUrl: DIRECTOR_PORTRAIT })
    .where(and(eq(staff.role, "Director"), isNull(staff.photoUrl)));
}

async function seed(): Promise<void> {
  const [articleCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(articles);
  if (!articleCount || articleCount.n === 0) {
    await db.insert(articles).values(
      SEED_ARTICLES.map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        body: a.body,
        category: a.category,
        author: a.author,
        publishedAt: new Date(a.publishedAt),
        featured: a.featured,
        commentCount: a.commentCount,
        coverUrl: a.coverUrl,
      })),
    );
  }

  const [staffCount] = await db.select({ n: sql<number>`count(*)::int` }).from(staff);
  if (!staffCount || staffCount.n === 0) {
    await db.insert(staff).values(
      STAFF.map((s) => ({
        name: s.name,
        role: s.role,
        title: s.title,
        group: s.group,
        email: s.email,
        phone: s.phone,
        bio: s.bio,
        expertise: s.expertise,
        tenure: s.tenure,
        photoUrl: s.photoUrl,
        sortOrder: s.sortOrder,
      })),
    );
  }

  const [journalCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(journals);
  if (!journalCount || journalCount.n === 0) {
    await db.insert(journals).values(
      SEED_JOURNALS.map((j) => ({
        slug: j.slug,
        title: j.title,
        volume: j.volume,
        issue: j.issue,
        year: j.year,
        theme: j.theme,
        editors: j.editors,
        issn: j.issn,
        summary: j.summary,
        papers: j.papers,
        status: j.status,
        publishedAt: new Date(j.publishedAt),
      })),
    );
  }

  const [galleryCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(galleryItems);
  if (!galleryCount || galleryCount.n === 0) {
    await db.insert(galleryItems).values(
      GALLERY.map((g, i) => ({
        album: g.album,
        title: g.title,
        url: g.url,
        credit: g.credit,
        sortOrder: i,
      })),
    );
  }

  const [eventCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(events);
  if (!eventCount || eventCount.n === 0) {
    await db.insert(events).values(
      SEED_EVENTS.map((e) => ({
        slug: e.slug,
        title: e.title,
        startsAt: new Date(e.startsAt),
        venue: e.venue,
        category: e.category,
        cadence: e.cadence,
        description: e.description,
        coverUrl: e.coverUrl,
      })),
    );
  }

  await alignDirectorImagery().catch(() => {
    /* a content repair must never stop the site from serving */
  });
}

/** Creates tables and seeds content the first time it is needed. */
export function ensureReady(): Promise<boolean> {
  if (!readyPromise) {
    readyPromise = (async () => {
      try {
        // Run one statement at a time (works on every driver).
        for (const stmt of DDL.split(";")) {
          const trimmed = stmt.trim();
          if (trimmed) await db.execute(sql.raw(trimmed));
        }
        await seed();
        return true;
      } catch {
        readyPromise = null;
        return false;
      }
    })();
  }
  return readyPromise;
}

/* ────────────────────────────── Reads ─────────────────────────── */

export type ArticleRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: import("@/db/schema").ArticleBlock[];
  category: string;
  coverUrl: string | null;
  author: string;
  publishedAt: Date;
  featured: boolean;
  commentCount: number;
};

export async function getArticles(): Promise<ArticleRow[]> {
  if (await ensureReady()) {
    try {
      const rows = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.publishedAt));
      if (rows.length) return rows as ArticleRow[];
    } catch {
      /* fall through to static seed */
    }
  }
  return SEED_ARTICLES.map((a, i) => ({
    id: i + 1,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    body: a.body,
    category: a.category,
    coverUrl: a.coverUrl,
    author: a.author,
    publishedAt: new Date(a.publishedAt),
    featured: a.featured,
    commentCount: a.commentCount,
  }));
}

export async function getArticleBySlug(slug: string) {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getCategories(): Promise<string[]> {
  const all = await getArticles();
  return Array.from(new Set(all.map((a) => a.category))).sort();
}

export async function getStaff() {
  if (await ensureReady()) {
    try {
      const rows = await db.select().from(staff).orderBy(staff.sortOrder);
      if (rows.length) return rows;
    } catch {
      /* fall through */
    }
  }
  return STAFF.map((s, i) => ({
    id: i + 1,
    name: s.name,
    role: s.role,
    title: s.title,
    group: s.group,
    email: s.email,
    phone: s.phone,
    bio: s.bio,
    expertise: s.expertise,
    tenure: s.tenure,
    photoUrl: s.photoUrl,
    sortOrder: s.sortOrder,
  }));
}

export async function getJournals() {
  if (await ensureReady()) {
    try {
      const rows = await db.select().from(journals).orderBy(desc(journals.year));
      if (rows.length) return rows;
    } catch {
      /* fall through */
    }
  }
  return SEED_JOURNALS.map((j, i) => ({
    id: i + 1,
    slug: j.slug,
    title: j.title,
    volume: j.volume,
    issue: j.issue,
    year: j.year,
    theme: j.theme,
    editors: j.editors,
    issn: j.issn,
    summary: j.summary,
    papers: j.papers,
    status: j.status,
    publishedAt: new Date(j.publishedAt),
  }));
}

export async function getGallery() {
  if (await ensureReady()) {
    try {
      const rows = await db
        .select()
        .from(galleryItems)
        .orderBy(galleryItems.sortOrder);
      if (rows.length) return rows;
    } catch {
      /* fall through */
    }
  }
  return GALLERY.map((g, i) => ({
    id: i + 1,
    album: g.album,
    title: g.title,
    url: g.url,
    credit: g.credit,
    sortOrder: i,
  }));
}

export async function getEvents() {
  if (await ensureReady()) {
    try {
      const rows = await db.select().from(events).orderBy(events.startsAt);
      if (rows.length) return rows;
    } catch {
      /* fall through */
    }
  }
  return SEED_EVENTS.map((e, i) => ({
    id: i + 1,
    slug: e.slug,
    title: e.title,
    startsAt: new Date(e.startsAt),
    venue: e.venue,
    category: e.category,
    description: e.description,
    coverUrl: e.coverUrl,
    cadence: e.cadence,
  }));
}

/* ────────────────────────────── Writes ────────────────────────── */

export async function createInquiry(input: {
  name: string;
  email: string;
  phone?: string;
  webUrl?: string;
  subject?: string;
  message: string;
}) {
  await ensureReady();
  const [row] = await db
    .insert(inquiries)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone ?? "",
      webUrl: input.webUrl ?? "",
      subject: input.subject ?? "",
      message: input.message,
    })
    .returning();
  return row;
}

export function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `CGCDS/${new Date().getFullYear()}/${stamp}${rand}`;
}

export async function createApplication(input: {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  stateOfOrigin: string;
  program: string;
  studyMode: string;
  qualification: string;
  institution: string;
  grade: string;
  researchPlan: string;
  statement: string;
  paymentReference: string;
  proofOfPayment: boolean;
}) {
  await ensureReady();
  const reference = makeReference();
  const [row] = await db
    .insert(applications)
    .values({ reference, ...input })
    .returning();
  return row;
}

export async function createSubscriber(email: string, interest: string) {
  await ensureReady();
  const existing = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email.toLowerCase()))
    .limit(1);
  if (existing.length) return existing[0];
  const [row] = await db
    .insert(subscribers)
    .values({ email: email.toLowerCase(), interest })
    .returning();
  return row;
}

/* ─────────────────────── Admin dashboard reads ───────────────── */

export async function getInquiries() {
  await ensureReady();
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getApplications() {
  await ensureReady();
  return db.select().from(applications).orderBy(desc(applications.createdAt));
}

export async function getSubscriberCount() {
  await ensureReady();
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(subscribers);
  return row?.n ?? 0;
}
