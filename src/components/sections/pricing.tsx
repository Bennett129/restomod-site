"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import type { PricingTier } from "@/content/cms-fallback";
import { Reveal } from "@/components/reveal";

type Mode = "outright" | "finance";

const modes: { id: Mode; label: string }[] = [
  { id: "outright", label: "Buy outright" },
  { id: "finance", label: "Finance monthly" },
];

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export function Pricing({ tiers }: { tiers: PricingTier[] }) {
  const [mode, setMode] = useState<Mode>("outright");

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2 className="display mt-3 text-4xl font-bold sm:text-6xl">Three ways in</h2>
        </div>

        <div
          role="radiogroup"
          aria-label="How would you like to pay?"
          className="flex rounded-full border bg-raised p-1"
        >
          {modes.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={mode === option.id}
              onClick={() => setMode(option.id)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold"
            >
              {mode === option.id && (
                <motion.span
                  layoutId="pricing-mode"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative transition-colors ${
                  mode === option.id ? "text-accent-fg" : "text-muted"
                }`}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 0.1} className="h-full">
            <article
              className={`flex h-full flex-col rounded-2xl border p-7 ${
                tier.featured ? "border-accent bg-raised shadow-xl shadow-accent/10" : "bg-raised"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="display text-3xl font-bold">{tier.name}</h3>
                {tier.featured && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg">
                    Most popular
                  </span>
                )}
              </div>
              {/* Room for two lines, so prices line up across cards whatever the client types. */}
              <p className="mt-1 text-muted lg:min-h-12">{tier.tagline}</p>

              <div className="mt-6 h-[4.5rem] overflow-hidden" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={mode}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="display text-5xl font-bold tabular-nums">
                      {usd(mode === "outright" ? tier.price : tier.monthly)}
                      {mode === "finance" && (
                        <span className="text-xl font-semibold text-muted normal-case"> /mo</span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {mode === "outright"
                        ? "Excluding the donor car"
                        : "Example over 60 months, 10% deposit"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="mt-6 flex-1 space-y-3 border-t pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#enquire"
                className={`mt-8 rounded-full px-5 py-3 text-center font-semibold transition-transform hover:scale-[1.02] ${
                  tier.featured ? "bg-accent text-accent-fg" : "border hover:border-accent"
                }`}
              >
                Enquire about {tier.name}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Finance figures are illustrative examples only, not an offer of credit.
      </p>
    </section>
  );
}
