import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BRAND, DISCLAIMER, IMAGES, NAV, TESTIMONIALS } from "@/content/site";
import type { Post } from "@/sanity/content";

export function Testimonials() {
  return (
    <section className="border-y bg-raised py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Owners</p>
        <h2 className="display mt-3 text-4xl font-bold sm:text-6xl">In their words</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border bg-bg p-7">
                <blockquote className="text-lg leading-relaxed">“{item.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-muted"> · {item.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function formatDate(value: string): string {
  return new Date(`${value.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-raised">
        {post.coverUrl && (
          <Image
            src={post.coverUrl}
            alt={post.coverAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <p className="mt-4 text-sm text-muted">
        {formatDate(post.publishedAt)} · {post.author}
      </p>
      <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-muted">{post.excerpt}</p>
    </Link>
  );
}

export function JournalPreview({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Journal</p>
          <h2 className="display mt-3 text-4xl font-bold sm:text-6xl">From the workshop</h2>
        </div>
        <Link href="/blog" className="flex items-center gap-2 font-semibold hover:text-accent">
          All posts <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.1}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Enquire() {
  return (
    <section id="enquire" className="bg-accent text-accent-fg">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">
        <Reveal>
          <h2 className="display max-w-3xl text-5xl font-bold sm:text-7xl">
            Twelve builds a year. Three slots left.
          </h2>
          <p className="mt-5 max-w-xl text-lg opacity-85">
            Tell us about your car, or the one you want us to find. We reply to
            every enquiry within two working days.
          </p>
          <a
            href={`mailto:${BRAND.email}?subject=Build%20enquiry`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-fg px-7 py-4 text-lg font-semibold text-accent transition-transform hover:scale-[1.03]"
          >
            {BRAND.email} <ArrowRight className="size-5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const photographers = [...new Set(Object.values(IMAGES).map((image) => image.by))];
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 text-sm sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="display text-2xl font-bold">
            {BRAND.short}
            <span className="text-accent">.</span>
          </span>
          <nav className="flex flex-wrap gap-5 font-medium">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="max-w-3xl text-muted">{DISCLAIMER}</p>
        <p className="text-muted">
          Photos from Unsplash by{" "}
          {photographers.map((name, index) => (
            <span key={name}>
              {index > 0 && ", "}
              <a
                href={`https://unsplash.com/@${name}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-fg"
              >
                {name}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </footer>
  );
}
