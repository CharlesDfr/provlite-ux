import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The layout shell every home section uses: full-bleed hairline divider on top,
 * one precise content container, generous vertical rhythm.
 */
export function Section({
  id,
  children,
  className,
  tone = "paper",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "paper" | "muted";
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border",
        tone === "muted" && "bg-secondary",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        {children}
      </div>
    </section>
  );
}

/** Editorial section header: label, grand titre, chapô aligné à droite. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <div className="lg:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display mt-5 text-[2.1rem] sm:text-5xl lg:text-[3.35rem]">
          {title}
        </h2>
      </div>
      {lede ? (
        <div className="lg:col-span-5 lg:pt-16">
          <p className="max-w-md text-[15px] leading-7 text-ink-soft">{lede}</p>
        </div>
      ) : null}
    </div>
  );
}

/** Étiquette de discrétion pour une rubrique prévue mais hors version 1. */
export function PhaseTag({ children = "Phase 2" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-bronze-tint px-2 py-0.5 text-[10px] font-medium tracking-[0.14em] text-bronze uppercase">
      {children}
    </span>
  );
}

/** Très légère apparition au scroll. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
