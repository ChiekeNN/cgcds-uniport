import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  body: jsonb("body").notNull().$type<ArticleBlock[]>(),
  category: text("category").notNull().default("News"),
  coverUrl: text("cover_url"),
  author: text("author").notNull().default("CGCDS Uniport"),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  featured: boolean("featured").notNull().default(false),
  commentCount: integer("comment_count").notNull().default(0),
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  title: text("title").notNull().default(""),
  group: text("group").notNull().default("Leadership"),
  email: text("email"),
  phone: text("phone"),
  bio: text("bio").notNull().default(""),
  expertise: jsonb("expertise").notNull().$type<string[]>(),
  tenure: text("tenure"),
  photoUrl: text("photo_url"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  webUrl: text("web_url").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  gender: text("gender").notNull().default(""),
  stateOfOrigin: text("state_of_origin").notNull().default(""),
  program: text("program").notNull(),
  studyMode: text("study_mode").notNull().default("Full-time"),
  qualification: text("qualification").notNull().default(""),
  institution: text("institution").notNull().default(""),
  grade: text("grade").notNull().default(""),
  researchPlan: text("research_plan").notNull().default(""),
  statement: text("statement").notNull().default(""),
  paymentReference: text("payment_reference").notNull().default(""),
  proofOfPayment: boolean("proof_of_payment").notNull().default(false),
  status: text("status").notNull().default("submitted"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const journals = pgTable("journals", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  volume: text("volume").notNull().default(""),
  issue: text("issue").notNull().default(""),
  year: integer("year").notNull().default(2026),
  theme: text("theme").notNull().default(""),
  editors: text("editors").notNull().default(""),
  issn: text("issn").notNull().default(""),
  summary: text("summary").notNull().default(""),
  papers: jsonb("papers").notNull().$type<
    { title: string; authors: string; pages: string }[]
  >(),
  status: text("status").notNull().default("published"),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  album: text("album").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  credit: text("credit").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  venue: text("venue").notNull().default(""),
  category: text("category").notNull().default("Event"),
  description: text("description").notNull().default(""),
  coverUrl: text("cover_url"),
  cadence: text("cadence").notNull().default("One-off"),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  interest: text("interest").notNull().default("Admission updates"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
