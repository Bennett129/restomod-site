"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ } from "@/content/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <p className="eyebrow">Questions</p>
      <h2 className="display mt-3 text-4xl font-bold sm:text-6xl">Before you ask</h2>

      <div className="mt-10 divide-y border-y">
        {FAQ.map((item, index) => {
          const expanded = open === index;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`faq-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold"
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: expanded ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-accent"
                  >
                    <Plus className="size-5" aria-hidden />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
