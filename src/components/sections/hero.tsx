"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-reduced-motion";
import { ArrowDown } from "lucide-react";
import { IMAGES, unsplash } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ headline, subline }: { headline: string; subline: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The photo drifts and zooms slightly slower than the page; the text fades out as it leaves.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = headline.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[620px] items-end overflow-hidden bg-black text-white"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src={unsplash(IMAGES.hero.id, 2400)}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          // On tall phone screens, keep the car (lower part of the photo) in frame.
          className="object-cover object-[35%_80%] md:object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30" />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28"
        style={reduce ? undefined : { y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          E92 restomods · built by hand
        </motion.p>

        <h1 className="display mt-4 max-w-4xl text-5xl font-bold sm:text-7xl lg:text-8xl">
          <span className="sr-only">{headline}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.25em]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="overflow-hidden pb-[0.08em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + index * 0.06, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-lg text-white/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        >
          {subline}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease }}
        >
          <Link
            href="#pricing"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg transition-transform hover:scale-[1.03]"
          >
            See build packages
          </Link>
          <Link
            href="#build"
            className="flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold transition-colors hover:border-white hover:bg-white/10"
          >
            How we build <ArrowDown className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
