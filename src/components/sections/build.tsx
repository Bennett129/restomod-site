"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { BUILD_STEPS, unsplash } from "@/content/site";
import { usePrefersReducedMotion } from "@/components/use-reduced-motion";

const pad = (n: number) => String(n).padStart(2, "0");
const LAST = BUILD_STEPS.length - 1;

/** How long one page takes to slide in. */
const SLIDE_MS = 700;
/**
 * How long scrolling is ignored after a page change. Shorter than the slide,
 * so the next scroll can come as the page settles; Motion picks the slide up
 * from wherever it is, so it never jumps.
 */
const LOCK_MS = 450;
/** Wheel events closer together than this belong to the same scroll gesture. */
const GESTURE_GAP_MS = 180;

/**
 * The four build stages as full-screen pages. While the section fills the
 * screen, one scroll gesture (however big) moves exactly one page, and input
 * is ignored until the slide has finished. Scrolling past the first or last
 * page hands control back to the normal page scroll.
 */
export function Build() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();

  // Handlers read these refs, so they never see a stale value mid-animation.
  const activeRef = useRef(0);
  const busyUntil = useRef(0);
  const lastWheelAt = useRef(0);
  const gestureUsed = useRef(false);

  const goTo = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  /** Scroll the page so the section exactly fills the screen. */
  const align = useCallback(
    (smooth: boolean) => {
      const section = sectionRef.current;
      if (!section) return;
      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top,
        behavior: smooth && !reduce ? "smooth" : "instant",
      });
    },
    [reduce],
  );

  /**
   * Decide what a scroll in `direction` should do. Returns true if the
   * section took it (the caller then blocks the page from scrolling).
   */
  const handleIntent = useCallback(
    (direction: 1 | -1): boolean => {
      const section = sectionRef.current;
      if (!section) return false;
      const top = section.getBoundingClientRect().top;
      const viewport = window.innerHeight;

      // Only act while the section is (nearly) filling the screen.
      if (Math.abs(top) > viewport * 0.4) return false;

      // Mid-slide: swallow the input so it cannot disturb the animation.
      if (performance.now() < busyUntil.current) return true;

      const aligned = Math.abs(top) < 12;
      const next = activeRef.current + direction;

      if (!aligned) {
        // Leaving past the first or last page: let the page carry on.
        const leaving =
          (direction > 0 && top < 0 && activeRef.current === LAST) ||
          (direction < 0 && top > 0 && activeRef.current === 0);
        if (leaving) return false;
        // Arriving: start from page 1 when coming down, page 4 when coming
        // back up, then settle the section onto the screen.
        if (direction > 0 && top > 0) goTo(0);
        if (direction < 0 && top < 0) goTo(LAST);
        align(true);
        busyUntil.current = performance.now() + LOCK_MS;
        return true;
      }

      // Already on the first or last page: scroll on out of the section.
      if (next < 0 || next > LAST) return false;

      align(false);
      goTo(next);
      busyUntil.current = performance.now() + LOCK_MS;
      return true;
    },
    [align, goTo],
  );

  useEffect(() => {
    // Mouse wheel and trackpad. A trackpad flick fires a long burst of events,
    // so only the first event of each gesture can move a page.
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 2) return;
      const now = performance.now();
      if (now - lastWheelAt.current > GESTURE_GAP_MS) gestureUsed.current = false;
      lastWheelAt.current = now;

      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      const inside = Math.abs(top) <= window.innerHeight * 0.4;

      if (inside && gestureUsed.current) {
        event.preventDefault();
        return;
      }
      if (handleIntent(event.deltaY > 0 ? 1 : -1)) {
        event.preventDefault();
        gestureUsed.current = true;
      }
    };

    // Touch: decide once per swipe, after the finger has moved a little.
    let startY = 0;
    let decided = false;
    let captured = false;
    const onTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
      decided = false;
      captured = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!decided) {
        const delta = startY - event.touches[0].clientY;
        if (Math.abs(delta) < 10) return;
        decided = true;
        captured = handleIntent(delta > 0 ? 1 : -1);
      }
      if (captured && event.cancelable) event.preventDefault();
    };

    // Keyboard scrolling keys.
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, button, [contenteditable]")) return;
      const down = ["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey);
      const up = ["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey);
      if (!down && !up) return;
      if (handleIntent(down ? 1 : -1)) event.preventDefault();
    };

    // When the section is off screen, reset it so it is entered from the
    // right end: page 1 from above, page 4 when scrolling back up from below.
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top >= window.innerHeight && activeRef.current !== 0) goTo(0);
      else if (rect.bottom <= 0 && activeRef.current !== LAST) goTo(LAST);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleIntent, goTo]);

  const slide = { duration: reduce ? 0.3 : SLIDE_MS / 1000, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <section
      id="build"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="The build, in four stages"
      // Cancels the page's scroll-padding so the "The build" link lands exactly on the section.
      className="relative h-svh min-h-[560px] -scroll-mt-20 overflow-hidden bg-black text-white"
    >
      {BUILD_STEPS.map((step, index) => {
        const isActive = index === active;
        // Pages above the current one sit off the top, the rest off the bottom.
        const offset = index < active ? "-100%" : index > active ? "100%" : "0%";
        return (
          <motion.article
            key={step.title}
            className="absolute inset-0"
            initial={false}
            // Reduced motion: every page sits in place and they cross-fade.
            // y must be reset too, or pages that started off screen stay there.
            animate={
              reduce
                ? { y: "0%", opacity: isActive ? 1 : 0 }
                : { y: offset, opacity: 1 }
            }
            transition={slide}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${BUILD_STEPS.length}: ${step.title}`}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            <Image
              src={unsplash(step.image.id, 2000)}
              alt={step.image.alt}
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 lg:bg-gradient-to-r lg:from-black/85 lg:via-black/40 lg:to-transparent" />

            <motion.div
              className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-24 sm:px-6 lg:justify-center lg:pb-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, y: isActive || reduce ? 0 : 24 }}
              transition={{ duration: 0.6, delay: isActive ? SLIDE_MS / 2000 : 0 }}
            >
              <span className="display text-2xl font-bold text-accent tabular-nums">
                {pad(index + 1)}
              </span>
              <h3 className="display mt-2 text-5xl font-bold sm:text-7xl">{step.title}</h3>
              <p className="mt-4 max-w-md text-lg text-white/80">{step.body}</p>
              <p className="mt-5 max-w-md border-l-2 border-accent pl-3 text-sm font-medium">
                {step.detail}
              </p>
            </motion.div>
          </motion.article>
        );
      })}

      {/* Fixed frame around the pages: title, stage list and progress. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-between px-4 pt-24 pb-8 sm:px-6">
          <div>
            <p className="eyebrow">The build</p>
            <h2 className="display mt-2 text-2xl font-bold sm:text-3xl">
              Four stages. Nothing skipped.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="display text-xl font-bold tabular-nums">
              {pad(active + 1)}
              <span className="text-white/50"> / {pad(BUILD_STEPS.length)}</span>
            </span>
            <div className="h-0.5 flex-1 overflow-hidden rounded bg-white/25">
              <motion.div
                className="h-full origin-left bg-accent"
                initial={false}
                animate={{ scaleX: (active + 1) / BUILD_STEPS.length }}
                transition={slide}
              />
            </div>
          </div>
        </div>

        <nav
          aria-label="Build stages"
          className="pointer-events-auto absolute top-1/2 right-4 flex -translate-y-1/2 flex-col gap-3 sm:right-6"
        >
          {BUILD_STEPS.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => {
                if (performance.now() < busyUntil.current || index === activeRef.current) return;
                align(false);
                goTo(index);
                busyUntil.current = performance.now() + LOCK_MS;
              }}
              aria-label={`Stage ${index + 1}: ${step.title}`}
              aria-current={index === active ? "step" : undefined}
              className="group flex items-center justify-end gap-3 p-1"
            >
              <span className="hidden text-xs font-semibold tracking-widest text-white/0 uppercase transition-colors group-hover:text-white/80 lg:block">
                {step.title}
              </span>
              <span
                className={`block h-8 w-1 rounded-full transition-colors duration-500 ${
                  index === active ? "bg-accent" : "bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
