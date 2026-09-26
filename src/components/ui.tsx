import Link from "next/link";
import type { ReactNode } from "react";

/* ───────────────────────── Brand mark ───────────────────────── */

export function Brand({
  tone = "dark",
  compact = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const word = tone === "dark" ? "#062a44" : "#ffffff";
  const sub = tone === "dark" ? "#4d6b80" : "#a9cde2";
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
          <defs>
            <linearGradient id="cg-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#37b4ee" />
              <stop offset="55%" stopColor="#2a9dd6" />
              <stop offset="100%" stopColor="#062a44" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="none" stroke="url(#cg-ring)" strokeWidth="2.4" />
          <path
            d="M24 4a20 20 0 0 1 0 40z"
            fill="url(#cg-ring)"
            opacity="0.18"
          />
          <path
            d="M31 17.5a7.5 7.5 0 1 0 0 13"
            fill="none"
            stroke="url(#cg-ring)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="20" cy="24" r="3.1" fill="#ffc94a" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.06rem] font-semibold tracking-tight"
            style={{ color: word }}
          >
            CGCDS
            <span className="ml-1.5 text-uniport">Uniport</span>
          </span>
          <span
            className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.17em]"
            style={{ color: sub }}
          >
            Gender · Conflict · Development
          </span>
        </span>
      )}
    </span>
  );
}

/* ───────────────────────── Typography ───────────────────────── */

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 ${
        tone === "dark" ? "text-uniport-deep" : "text-uniport-bright"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-8 ${tone === "dark" ? "bg-uniport/60" : "bg-uniport-bright/60"}`}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  reveal = "",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  reveal?: "" | "left" | "right" | "scale" | "mask";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        data-reveal={reveal || undefined}
        className={`mt-4 text-[clamp(1.85rem,4.4vw,3.1rem)] font-semibold leading-[1.06] ${
          isLight ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "90ms" }}
          className={`mt-5 text-[1.02rem] leading-relaxed ${
            isLight ? "text-[#bcd8e8]" : "text-slate-600"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Rule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div
      aria-hidden="true"
      className={`hairline ${tone === "light" ? "opacity-60" : ""}`}
    />
  );
}

/* ────────────────────────── Buttons ─────────────────────────── */

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  arrow?: boolean;
};

const BASE =
  "sheen group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-all duration-300 will-change-transform";
const SIZES = {
  sm: "px-4 py-2 text-[0.8rem]",
  md: "px-6 py-3 text-[0.875rem]",
  lg: "px-8 py-4 text-[0.95rem]",
};
const VARIANTS = {
  solid:
    "bg-uniport text-white shadow-[0_16px_34px_-16px_rgba(42,157,214,0.9)] hover:bg-uniport-deep hover:shadow-[0_20px_44px_-16px_rgba(28,139,190,0.95)] hover:-translate-y-0.5",
  outline:
    "border border-uniport/45 text-navy hover:border-uniport hover:bg-uniport-mist hover:-translate-y-0.5",
  ghost: "text-navy hover:text-uniport-deep",
  light:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-white/70 hover:bg-white/20 hover:-translate-y-0.5",
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative z-[2]">{children}</span>
      {arrow !== false && (
        <svg
          viewBox="0 0 20 20"
          className="relative z-[2] h-4 w-4 transition-transform duration-400 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 10h13M11 4.5l5.5 5.5L11 15.5" />
        </svg>
      )}
    </>
  );
}

export function Btn({
  href,
  children,
  variant = "solid",
  size = "md",
  className = "",
  external,
  arrow,
}: BtnProps) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

/* ─────────────────────────── Chips ──────────────────────────── */

export function Chip({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "gold" | "navy" | "ghost";
  className?: string;
}) {
  const tones = {
    blue: "bg-uniport-mist text-uniport-deep border-uniport/25",
    gold: "bg-[#fff6e0] text-[#8a6410] border-[#ffc94a]/45",
    navy: "bg-navy text-white border-navy",
    ghost: "bg-white/10 text-white border-white/25",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.63rem] uppercase tracking-[0.15em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ─────────────────────── Section wrapper ────────────────────── */

export function Section({
  children,
  className = "",
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "mist" | "dark";
}) {
  const tones = {
    light: "bg-paper",
    mist: "bg-mist",
    dark: "bg-navy text-white",
  };
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 md:py-28 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/* ────────────────────── Breadcrumb trail ────────────────────── */

export function Breadcrumbs({
  trail,
  tone = "light",
}: {
  trail: { label: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-[#9fc6dc]" : "text-slate-500"
      }`}
    >
      {trail.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-45">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className={`ulink transition-colors ${
                tone === "dark" ? "hover:text-uniport-bright" : "hover:text-uniport-deep"
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={tone === "dark" ? "text-white" : "text-navy"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ───────────────────── Page hero (inner pages) ──────────────── */

export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  trail: { label: string; href?: string }[];
  image?: string;
  children?: ReactNode;
}) {
  return (
    <header className="grain relative isolate overflow-hidden bg-navy pt-32 pb-16 text-white md:pt-40 md:pb-24">
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <img
            src={image}
            alt=""
            className="anim-kenburns h-full w-full object-cover opacity-25"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/92 to-uniport-deep/70" />
        </div>
      )}
      <div
        aria-hidden="true"
        className="bg-blueprint-dark absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-uniport/25 blur-[110px]"
      />
      <div className="shell relative">
        <Breadcrumbs trail={trail} tone="dark" />
        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1
              data-reveal="mask"
              className="mt-5 text-[clamp(2.2rem,6vw,4.1rem)] font-semibold leading-[0.98]"
            >
              {title}
            </h1>
            {lead && (
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "120ms" }}
                className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[#c2dcea]"
              >
                {lead}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}

/* ───────────────────── Decorative corner ───────────────────── */

export function CornerTicks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 h-5 w-5 border-t border-l border-uniport/40"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-4 h-5 w-5 border-r border-b border-uniport/40"
      />
    </>
  );
}
