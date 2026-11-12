import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer, PostCard } from "@/components/sections/static-sections";
import { getPosts } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Build stories and engineering notes from the workshop.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-32 pb-24 sm:px-6">
        <p className="eyebrow">Journal</p>
        <h1 className="display mt-3 text-5xl font-bold sm:text-7xl">From the workshop</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Build stories and engineering notes, written by the people doing the work.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-muted">No posts yet.</p>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
