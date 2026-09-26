"use client";

import { useState } from "react";

import { PROGRAMS, SHORT_COURSES } from "@/lib/content";
import { SITE } from "@/lib/site";

/* ───────────────────── shared field styles ───────────────────── */

const FIELD =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[0.92rem] text-navy outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-uniport focus:ring-4 focus:ring-uniport/12";
const LABEL =
  "mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-500";
const ERR = "border-coral focus:border-coral focus:ring-coral/12";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message: string };

function Banner({ status }: { status: Status }) {
  if (status.kind === "idle") return null;
  const map = {
    loading: "border-uniport/30 bg-uniport-mist text-uniport-deep",
    ok: "border-[#1f9d6b]/30 bg-[#eafaf2] text-[#146c49]",
    error: "border-coral/35 bg-[#fff2ee] text-[#a63a1c]",
  } as const;
  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-5 rounded-xl border px-4 py-3 text-[0.86rem] leading-relaxed ${map[status.kind]}`}
    >
      {status.message}
    </p>
  );
}

/* ═════════════════════════ Newsletter ══════════════════════════ */

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Admission updates");
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ kind: "loading", message: "Subscribing…" });
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interest }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");
      setStatus({
        kind: "ok",
        message: `You're on the list. We'll send ${interest.toLowerCase()} to ${email}.`,
      });
      setEmail("");
    } catch {
      setStatus({
        kind: "error",
        message: "Could not subscribe right now. Email info@cgcds.com.ng instead.",
      });
    }
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[0.9rem] text-white outline-none backdrop-blur-md transition-all duration-300 placeholder:text-[#7ea6bd] focus:border-uniport-bright focus:ring-4 focus:ring-uniport/20"
        />
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="sheen shrink-0 rounded-full bg-uniport px-6 py-3 text-[0.85rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-bright disabled:opacity-60"
        >
          <span className="relative z-[2]">
            {status.kind === "loading" ? "…" : "Notify me"}
          </span>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Admission updates", "News & events", "Short courses"].map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setInterest(o)}
            className={`rounded-full border px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
              interest === o
                ? "border-uniport bg-uniport text-white"
                : "border-white/20 text-[#93bcd2] hover:border-uniport-bright hover:text-white"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {status.kind !== "idle" && status.kind !== "loading" && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-[0.8rem] ${
            status.kind === "ok" ? "text-[#8fe0b8]" : "text-[#ffb9a4]"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}

/* ═════════════════════════ Contact form ════════════════════════ */

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  webUrl: string;
  subject: string;
  message: string;
};

const EMPTY_CONTACT: ContactValues = {
  name: "",
  email: "",
  phone: "",
  webUrl: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [v, setV] = useState<ContactValues>(EMPTY_CONTACT);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  const errors = {
    name: v.name.trim().length < 2 ? "Please tell us your name." : "",
    email: /^\S+@\S+\.\S+$/.test(v.email) ? "" : "A valid email is required.",
    message: v.message.trim().length < 12 ? "Message should be at least 12 characters." : "",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const set = (k: keyof ContactValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid) {
      setStatus({ kind: "error", message: "Please correct the highlighted fields." });
      return;
    }
    setStatus({ kind: "loading", message: "Sending your message to the Centre…" });
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");
      setStatus({
        kind: "ok",
        message: `Thank you, ${v.name.split(" ")[0]}. Your message has been logged with the Centre (ref ${data.reference}). We reply within one working day, Monday to Friday, 8:00am – 4:00pm.`,
      });
      setV(EMPTY_CONTACT);
      setTouched({});
    } catch {
      setStatus({
        kind: "error",
        message:
          "The message could not be delivered. Please call the Centre on +234 806 268 3883 or email info@cgcds.com.ng.",
      });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="c-name">Name *</label>
          <input
            id="c-name"
            value={v.name}
            onChange={set("name")}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Your full name"
            className={`${FIELD} ${touched.name && errors.name ? ERR : ""}`}
          />
          {touched.name && errors.name && (
            <p className="mt-1.5 text-[0.75rem] text-coral">{errors.name}</p>
          )}
        </div>
        <div>
          <label className={LABEL} htmlFor="c-email">Email *</label>
          <input
            id="c-email"
            type="email"
            value={v.email}
            onChange={set("email")}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@email.com"
            className={`${FIELD} ${touched.email && errors.email ? ERR : ""}`}
          />
          {touched.email && errors.email && (
            <p className="mt-1.5 text-[0.75rem] text-coral">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={LABEL} htmlFor="c-phone">Phone number</label>
          <input
            id="c-phone"
            value={v.phone}
            onChange={set("phone")}
            placeholder="+234 …"
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="c-url">Web URL</label>
          <input
            id="c-url"
            value={v.webUrl}
            onChange={set("webUrl")}
            placeholder="Organisation website"
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="c-subject">Subject</label>
          <select id="c-subject" value={v.subject} onChange={set("subject")} className={FIELD}>
            <option value="">Select a topic…</option>
            <option>Admissions & eligibility</option>
            <option>Tuition & payment</option>
            <option>Short courses / NGO cohorts</option>
            <option>Professors & quality of staff</option>
            <option>Research collaboration</option>
            <option>Journals & publications</option>
            <option>Requests & suggestions</option>
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="c-msg">Message *</label>
        <textarea
          id="c-msg"
          rows={6}
          value={v.message}
          onChange={set("message")}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          placeholder="How can the Centre help you?"
          className={`${FIELD} resize-y ${touched.message && errors.message ? ERR : ""}`}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {touched.message && errors.message ? (
            <p className="text-[0.75rem] text-coral">{errors.message}</p>
          ) : (
            <span className="text-[0.72rem] text-slate-400">
              Required fields are marked *
            </span>
          )}
          <span className="font-mono text-[0.68rem] text-slate-400 tabular-nums">
            {v.message.trim().length}
          </span>
        </div>
      </div>

      {/* honeypot — mirrors the "Leave Empty" field on the original form */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="c-hp">Leave Empty</label>
        <input id="c-hp" name="leave_empty" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="sheen group inline-flex items-center gap-2.5 rounded-full bg-uniport px-7 py-3.5 text-[0.9rem] font-semibold text-white shadow-[0_18px_38px_-18px_rgba(42,157,214,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-deep disabled:opacity-60"
        >
          <span className="relative z-[2]">
            {status.kind === "loading" ? "Sending…" : "Send the message"}
          </span>
          <svg viewBox="0 0 20 20" className="relative z-[2] h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-[0.78rem] text-slate-500">
          Or call{" "}
          <a href={SITE.phones[0].href} className="ulink font-semibold text-uniport-deep">
            {SITE.phones[0].value}
          </a>
        </p>
      </div>

      <Banner status={status} />
    </form>
  );
}

/* ═════════════════════ Multi-step application ══════════════════ */

const STEPS = ["Applicant", "Programme", "Research", "Payment", "Review"] as const;

const PROGRAM_OPTIONS = [
  ...PROGRAMS.map((p) => ({
    value: `${p.code} — ${p.fullName}`,
    label: `${p.code} · ${p.name}`,
    detail: p.fullName,
  })),
  ...SHORT_COURSES.map((c) => ({
    value: `Short Course — ${c.title}`,
    label: `Short Course · ${c.title}`,
    detail: "Three months · UniPort certificate",
  })),
];

type AppValues = {
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
};

const EMPTY_APP: AppValues = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  stateOfOrigin: "",
  program: PROGRAM_OPTIONS[0].value,
  studyMode: "Full-time",
  qualification: "",
  institution: "",
  grade: "",
  researchPlan: "",
  statement: "",
  paymentReference: "",
  proofOfPayment: false,
};

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<AppValues>(EMPTY_APP);
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [reference, setReference] = useState<string | null>(null);

  const set =
    <K extends keyof AppValues>(k: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setV((p) => ({ ...p, [k]: e.target.value }));

  const setBool =
    (k: keyof AppValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setV((p) => ({ ...p, [k]: e.target.checked }));

  const isPhd = v.program.startsWith("PhD");
  const isShort = v.program.startsWith("Short Course");

  function stepValid(s: number): boolean {
    if (s === 0)
      return (
        v.fullName.trim().length > 2 &&
        /^\S+@\S+\.\S+$/.test(v.email) &&
        v.phone.trim().length > 6 &&
        v.gender !== "" &&
        v.stateOfOrigin.trim().length > 1
      );
    if (s === 1)
      return v.program !== "" && v.qualification.trim().length > 2 && v.institution.trim().length > 2;
    if (s === 2) return isPhd ? v.researchPlan.trim().length > 40 : v.statement.trim().length > 20;
    if (s === 3) return v.paymentReference.trim().length > 2 && v.proofOfPayment;
    return true;
  }

  async function submit() {
    setStatus({ kind: "loading", message: "Submitting your application to the Centre…" });
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed");
      setReference(data.reference);
      setStatus({
        kind: "ok",
        message:
          "Application received. Keep your reference safe — the Centre's admissions office will contact you on the email and phone number supplied.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Submission failed. Please try again, or deliver your application in person to the CGCDS Building beside the Faculty of Law, Abuja Campus.",
      });
    }
  }

  if (reference) {
    return (
      <div className="rounded-3xl border border-[#1f9d6b]/25 bg-[#f2fbf6] p-8 text-center md:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#1f9d6b] text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 text-[1.7rem] font-semibold text-navy">Application submitted</h3>
        <p className="mt-3 text-slate-600">
          Thank you, {v.fullName.split(" ")[0]}. Your application for{" "}
          <strong className="text-navy">{v.program}</strong> has been logged.
        </p>
        <div className="mx-auto mt-7 inline-block rounded-2xl border border-dashed border-[#1f9d6b]/45 bg-white px-8 py-5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
            Your reference
          </p>
          <p className="mt-2 font-mono text-[1.35rem] font-semibold tracking-tight text-navy">
            {reference}
          </p>
        </div>
        <p className="mx-auto mt-7 max-w-md text-[0.85rem] leading-relaxed text-slate-500">
          Quote this reference in any correspondence with the Centre. Admissions queries:{" "}
          <a href={`mailto:${SITE.emails[0]}`} className="ulink font-semibold text-uniport-deep">
            {SITE.emails[0]}
          </a>{" "}
          · {SITE.phones[2].value}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_70px_-40px_rgba(6,42,68,0.5)]">
      {/* stepper */}
      <div className="border-b border-slate-100 bg-mist px-5 py-5 md:px-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {STEPS.map((label, i) => {
            const state = i === step ? "current" : i < step ? "done" : "todo";
            return (
              <li key={label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                    state === "current"
                      ? "border-uniport bg-uniport text-white shadow-[0_10px_22px_-12px_rgba(42,157,214,1)]"
                      : state === "done"
                        ? "border-uniport/35 bg-white text-uniport-deep hover:border-uniport"
                        : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`h-px w-4 transition-colors duration-500 ${
                      i < step ? "bg-uniport" : "bg-slate-200"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-uniport-bright to-uniport-deep transition-[width] duration-600 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-9">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL} htmlFor="a-name">Full name (as on credentials)</label>
              <input id="a-name" value={v.fullName} onChange={set("fullName")} placeholder="Surname, first name, middle name" className={FIELD} />
            </div>
            <div>
              <label className={LABEL} htmlFor="a-email">Email</label>
              <input id="a-email" type="email" value={v.email} onChange={set("email")} placeholder="you@email.com" className={FIELD} />
            </div>
            <div>
              <label className={LABEL} htmlFor="a-phone">Phone</label>
              <input id="a-phone" value={v.phone} onChange={set("phone")} placeholder="+234 …" className={FIELD} />
            </div>
            <div>
              <label className={LABEL} htmlFor="a-gender">Gender</label>
              <select id="a-gender" value={v.gender} onChange={set("gender")} className={FIELD}>
                <option value="">Select…</option>
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="a-state">State of origin / residence</label>
              <input id="a-state" value={v.stateOfOrigin} onChange={set("stateOfOrigin")} placeholder="e.g. Rivers" className={FIELD} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5">
            <div>
              <span className={LABEL}>Programme applied for</span>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {PROGRAM_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setV((p) => ({ ...p, program: o.value }))}
                    className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                      v.program === o.value
                        ? "border-uniport bg-uniport-mist shadow-[0_14px_30px_-20px_rgba(42,157,214,1)]"
                        : "border-slate-200 bg-white hover:border-uniport/55 hover:bg-uniport-mist/40"
                    }`}
                  >
                    <span className="block text-[0.88rem] font-semibold text-navy">{o.label}</span>
                    <span className="mt-1 block text-[0.74rem] leading-snug text-slate-500">{o.detail}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={LABEL}>Mode of study</span>
              <div className="flex flex-wrap gap-2.5">
                {["Full-time", "Part-time"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setV((p) => ({ ...p, studyMode: m }))}
                    disabled={isShort}
                    className={`rounded-full border px-5 py-2.5 text-[0.83rem] font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                      v.studyMode === m
                        ? "border-navy bg-navy text-white"
                        : "border-slate-200 text-slate-500 hover:border-uniport hover:text-navy"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={LABEL} htmlFor="a-qual">Highest qualification</label>
                <input id="a-qual" value={v.qualification} onChange={set("qualification")} placeholder="B.Sc. / HND / PGD / M.Sc." className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="a-inst">Institution</label>
                <input id="a-inst" value={v.institution} onChange={set("institution")} placeholder="Awarding institution" className={FIELD} />
              </div>
              <div>
                <label className={LABEL} htmlFor="a-grade">Grade / CGPA</label>
                <input id="a-grade" value={v.grade} onChange={set("grade")} placeholder="e.g. 3.20 / 5.00" className={FIELD} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            {isPhd && (
              <div>
                <label className={LABEL} htmlFor="a-plan">
                  Proposed plan of research (required for PhD)
                </label>
                <textarea
                  id="a-plan"
                  rows={7}
                  value={v.researchPlan}
                  onChange={set("researchPlan")}
                  placeholder="Working title, problem statement, research questions, method and expected contribution to knowledge."
                  className={`${FIELD} resize-y`}
                />
                <p className="mt-1.5 text-[0.75rem] text-slate-400">
                  The PhD candidate must submit a proposed plan of research along with the
                  application. {v.researchPlan.trim().length} / 40 characters minimum.
                </p>
              </div>
            )}
            <div>
              <label className={LABEL} htmlFor="a-statement">
                {isPhd ? "Statement of research interest" : "Why this programme?"}
              </label>
              <textarea
                id="a-statement"
                rows={6}
                value={v.statement}
                onChange={set("statement")}
                placeholder="Tell the Centre how gender, conflict and development studies connect to your work or intended career."
                className={`${FIELD} resize-y`}
              />
              <p className="mt-1.5 text-[0.75rem] text-slate-400">
                {v.statement.trim().length} characters
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-uniport/25 bg-uniport-mist p-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-uniport-deep">
                Payment notice
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-navy">
                Intending students are required to pay a non-refundable admission form fee of{" "}
                <strong>NGN 25,000</strong> before proceeding to apply. Online payments are
                currently disabled.
              </p>
              <dl className="mt-4 grid gap-2 text-[0.86rem] sm:grid-cols-[auto_1fr]">
                <dt className="font-semibold text-slate-500">Bank</dt>
                <dd className="text-navy">{SITE.bank.name}</dd>
                <dt className="font-semibold text-slate-500">Account number</dt>
                <dd className="font-mono text-[1rem] font-semibold tracking-tight text-navy">
                  {SITE.bank.accountNumber}
                </dd>
                <dt className="font-semibold text-slate-500">Account name</dt>
                <dd className="text-navy">{SITE.bank.accountName}</dd>
              </dl>
            </div>
            <div>
              <label className={LABEL} htmlFor="a-ref">Deposit / transfer reference</label>
              <input
                id="a-ref"
                value={v.paymentReference}
                onChange={set("paymentReference")}
                placeholder="As printed on your receipt or transfer confirmation"
                className={FIELD}
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition-colors hover:border-uniport/50">
              <input
                type="checkbox"
                checked={v.proofOfPayment}
                onChange={setBool("proofOfPayment")}
                className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[#2a9dd6]"
              />
              <span className="text-[0.86rem] leading-relaxed text-slate-600">
                I will upload proof of payment (scan-copy / screenshot-copy) and I confirm the
                details above are true. The Centre verifies payment against the bank account
                before an application is processed.
              </span>
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
              {[
                ["Applicant", v.fullName],
                ["Email", v.email],
                ["Phone", v.phone],
                ["Gender", v.gender],
                ["State", v.stateOfOrigin],
                ["Programme", v.program],
                ["Mode", isShort ? "Cohort (3 months)" : v.studyMode],
                ["Qualification", `${v.qualification} — ${v.institution} (${v.grade || "n/s"})`],
                ["Payment reference", v.paymentReference],
                ["Proof of payment", v.proofOfPayment ? "Confirmed" : "Not confirmed"],
              ].map(([k, val]) => (
                <div key={k} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate-400">
                    {k}
                  </dt>
                  <dd className="text-[0.9rem] font-medium break-words text-navy">{val || "—"}</dd>
                </div>
              ))}
            </dl>
            {(v.researchPlan || v.statement) && (
              <div className="rounded-2xl bg-mist p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-400">
                  Submitted narrative
                </p>
                {v.researchPlan && (
                  <p className="mt-3 text-[0.88rem] leading-relaxed whitespace-pre-line text-slate-600">
                    {v.researchPlan}
                  </p>
                )}
                {v.statement && (
                  <p className="mt-3 text-[0.88rem] leading-relaxed whitespace-pre-line text-slate-600">
                    {v.statement}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <Banner status={status} />

        <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-[0.83rem] font-semibold text-slate-500 transition-colors hover:border-uniport hover:text-navy disabled:opacity-35"
          >
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => stepValid(step) && setStep((s) => s + 1)}
              disabled={!stepValid(step)}
              className="sheen rounded-full bg-navy px-6 py-3 text-[0.85rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-deep disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span className="relative z-[2]">Continue</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status.kind === "loading"}
              className="sheen rounded-full bg-uniport px-7 py-3 text-[0.87rem] font-semibold text-white shadow-[0_16px_34px_-16px_rgba(42,157,214,1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-uniport-deep disabled:opacity-60"
            >
              <span className="relative z-[2]">
                {status.kind === "loading" ? "Submitting…" : "Submit application"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
