export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

/** False until a Sanity project id is set; the site then uses the sample content. */
export const isSanityConfigured = /^[a-z0-9]+$/.test(projectId);
