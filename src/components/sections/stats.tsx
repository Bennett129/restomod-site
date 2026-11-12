"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/components/use-reduced-motion";
import { STATS } from "@/content/site";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  // The final number is in the HTML, so it is correct without JavaScript too.
  return (
    <span className="tabular-nums">
      <span ref={ref}>{value.toLocaleString("en-US")}</span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Key figures" className="border-y bg-raised">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 px-2">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="display text-5xl font-bold sm:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
