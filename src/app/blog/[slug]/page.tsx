import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer, formatDate } from "@/components/sections/static-sections";
import { getPost, getPosts } from "@/sanity/content";

type Props = PageProps<"/blog/[slug]">;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverUrl ? { images: [post.coverUrl] } : undefined,
  };
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-lg leading-relaxed">{children}</p>,
    h2: ({ children }) => (
      <h2 className="display mt-12 text-3xl font-bold sm:text-4xl">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 text-2xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-lg marker:text-accent">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg marker:text-accent">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-accent underline underline-offset-4"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function PostPage({ params }: Props) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-24 sm:px-6">
        <Suspense fallback={<p className="text-muted">Loading post…</p>}>
          <Article params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

async function Article({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> Journal
      </Link>
      <h1 className="display mt-6 text-4xl font-bold text-balance sm:text-6xl">{post.title}</h1>
      <p className="mt-4 text-muted">
        {formatDate(post.publishedAt)} · {post.author}
      </p>

      {post.coverUrl && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-raised">
          <Image
            src={post.coverUrl}
            alt={post.coverAlt}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-4">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}
