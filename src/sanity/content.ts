import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import {
  fallbackPosts,
  fallbackPricing,
  fallbackSettings,
  type PricingTier,
  type SiteSettings,
} from "@/content/cms-fallback";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";
import { toPortableText } from "./portable-text";

/** Every Sanity read is tagged with this, and the webhook clears it. */
export const SANITY_TAG = "sanity";

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  coverUrl: string | null;
  coverAlt: string;
  body: PortableTextBlock[];
};

function client() {
  return createClient({ projectId, dataset, apiVersion, useCdn: false });
}

const samplePosts: Post[] = fallbackPosts.map((post) => ({
  ...post,
  coverAlt: "",
  body: toPortableText(post.body),
}));

const postFields = `
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  author,
  "coverUrl": coalesce(coverImage.asset->url, externalCoverUrl),
  "coverAlt": coalesce(coverImage.alt, ""),
  body
`;

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");

  if (!isSanityConfigured) return samplePosts;
  return client().fetch<Post[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }`,
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPricing(): Promise<PricingTier[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");

  if (!isSanityConfigured) return fallbackPricing;
  const tiers = await client().fetch<PricingTier[]>(
    `*[_type == "pricingTier"] | order(order asc) {
      name,
      "tagline": coalesce(tagline, ""),
      price,
      monthly,
      "features": coalesce(features, []),
      "featured": coalesce(featured, false)
    }`,
  );
  // An empty new project still shows a complete page.
  return tiers.length > 0 ? tiers : fallbackPricing;
}

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");

  if (!isSanityConfigured) return fallbackSettings;
  const settings = await client().fetch<Partial<SiteSettings> | null>(
    `*[_type == "siteSettings"][0] { heroHeadline, heroSubline }`,
  );
  return {
    heroHeadline: settings?.heroHeadline || fallbackSettings.heroHeadline,
    heroSubline: settings?.heroSubline || fallbackSettings.heroSubline,
  };
}
