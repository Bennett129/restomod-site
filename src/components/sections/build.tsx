"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { BUILD_STEPS, unsplash } from "@/content/site";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop: the photo stays pinned while the four steps scroll past, and
 * cross-fades to match whichever step is in the middle of the screen.
 * Mobile: each step simply carries its own photo.
 */
export function Build() {
  const [active, setActive] = useState(0);

  return (
    <section id="build" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <p className="eyebrow">The build</p>
      <h2 className="display mt-3 max-w-2xl text-4xl font-bold sm:text-6xl">
        Four stages. Nothing skipped.
      </h2>

      <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[calc(100svh-8rem)] max-h-[640px] overflow-hidden rounded-2xl bg-raised">
            {BUILD_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: index === active ? 1 : 0,
                  scale: index === active ? 1 : 1.06,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={unsplash(step.image.id, 1400)}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
              <span className="display text-2xl font-bold tabular-nums">
                {pad(active + 1)}
                <span className="text-white/50"> / {pad(BUILD_STEPS.length)}</span>
              </span>
              <div className="h-0.5 flex-1 overflow-hidden rounded bg-white/25">
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={false}
                  animate={{ scaleX: (active + 1) / BUILD_STEPS.length }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        <ol>
          {BUILD_STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              className="flex flex-col justify-center py-8 lg:min-h-[70svh] lg:py-0"
              onViewportEnter={() => setActive(index)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
                <Image
                  src={unsplash(step.image.id, 1000)}
                  alt={step.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <span className="display text-xl font-bold text-accent tabular-nums">
                {pad(index + 1)}
              </span>
              <h3 className="display mt-2 text-4xl font-bold sm:text-5xl">{step.title}</h3>
              <p className="mt-4 max-w-md text-lg text-muted">{step.body}</p>
              <p className="mt-5 border-l-2 border-accent pl-3 text-sm font-medium">
                {step.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
