/**
 * Uploads the sample posts, pricing packages and home page text to your Sanity
 * project, so the Studio is not empty on day one. Safe to run twice: documents
 * are created with fixed ids and replaced.
 *
 *   npm run sanity:seed
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local.
 */
import { createClient } from "next-sanity";
import {
  fallbackPosts,
  fallbackPricing,
  fallbackSettings,
} from "../src/content/cms-fallback";
import { toPortableText } from "../src/sanity/portable-text";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local first.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function main() {
  const transaction = client.transaction();

  for (const post of fallbackPosts) {
    transaction.createOrReplace({
      _id: `post-${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      externalCoverUrl: post.coverUrl,
      author: post.author,
      publishedAt: post.publishedAt,
      body: toPortableText(post.body),
    });
  }

  fallbackPricing.forEach((tier, index) => {
    transaction.createOrReplace({
      _id: `pricing-${tier.name.toLowerCase()}`,
      _type: "pricingTier",
      ...tier,
      order: index + 1,
    });
  });

  transaction.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSettings,
  });

  await transaction.commit();
  console.log(
    `Seeded ${fallbackPosts.length} posts, ${fallbackPricing.length} pricing packages and the home page text into ${projectId}/${dataset}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
