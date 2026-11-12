"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { GALLERY, unsplash } from "@/content/site";

const layout = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-5 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/3] md:aspect-auto",
  "md:col-span-7 aspect-[4/3]",
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-raised py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Gallery</p>
        <h2 className="display mt-3 text-4xl font-bold sm:text-6xl">Recent work</h2>

        <motion.ul
          className="mt-12 grid gap-4 md:grid-cols-12"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "0px 0px -120px 0px" }}
          variants={{ shown: { transition: { staggerChildren: 0.12 } } }}
        >
          {GALLERY.map((photo, index) => (
            <motion.li
              key={photo.caption}
              className={`group relative overflow-hidden rounded-xl ${layout[index % layout.length]}`}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                shown: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <Image
                src={unsplash(photo.id, 1400)}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                {photo.caption}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
